import React, { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import "cesium/Source/Widgets/widgets.css";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODUwZGFlOC1hZTY2LTQ3NGMtOTYyZi00YzIzYTEzNWU0MTEiLCJpZCI6NDE5OTAwLCJpYXQiOjE3NzY1MDk4ODd9.pCjHVbb_dq_cBa6qsAiQzTph9669PKnKZUwmTlrgPHY';

function CesiumMap({ onSelect, clearTrigger }) {
    const cesiumContainer = useRef(null);
    const viewerRef = useRef(null);

    const activePointsRef = useRef([]);

    useEffect(() => {
        if (viewerRef.current && clearTrigger > 0) {
            console.log("clearTrigger running");
            viewerRef.current.entities.removeAll();
            viewerRef.current.scene.primitives.removeAll();
            activePointsRef.current = [];
        }
    }, [clearTrigger]);

    useEffect(() => {
        if (cesiumContainer.current && !viewerRef.current) {
            const viewer = new Cesium.Viewer(cesiumContainer.current, {
                selectionIndicator: false,
                infoBox: false,
            });
            viewerRef.current = viewer;

            focusOnTurkey(viewer);

            const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

            handler.setInputAction((click) => {
                const cartesian = viewer.camera.pickEllipsoid(click.position);
                if (Cesium.defined(cartesian)) {
                    activePointsRef.current.push(cartesian);

                    viewer.entities.add({
                        position: cartesian,
                        point: { pixelSize: 8, color: Cesium.Color.RED, disableDepthTestDistance: Number.POSITIVE_INFINITY }
                    });

                    if (activePointsRef.current.length === 3) {
                        viewer.entities.add({
                            polygon: {
                                hierarchy: new Cesium.CallbackProperty(() => {
                                    return new Cesium.PolygonHierarchy(activePointsRef.current);
                                }, false),
                                material: Cesium.Color.YELLOW.withAlpha(0.4),
                                outline: true,
                                outlineColor: Cesium.Color.BLACK,
                            }
                        });
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            handler.setInputAction(() => {
                if (activePointsRef.current.length >= 3) {
                    const finalPoints = [...activePointsRef.current];

                    const entities = viewer.entities.values;
                    for (let i = entities.length - 1; i >= 0; i--) {
                        const entity = entities[i];
                        if (entity.polygon && entity.polygon.hierarchy instanceof Cesium.CallbackProperty) {
                            viewer.entities.remove(entity);
                        }
                    }

                    viewer.entities.add({
                        polygon: {
                            hierarchy: new Cesium.PolygonHierarchy(finalPoints),
                            material: Cesium.Color.YELLOW.withAlpha(0.4),
                            outline: true,
                            outlineColor: Cesium.Color.BLACK,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });

                    onSelect({
                        coords: finalPoints
                    });

                    activePointsRef.current = [];
                }
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [onSelect]);

    return <div ref={cesiumContainer} style={{ width: "100%", height: "100vh" }} />;
}

const focusOnTurkey = (viewer) => {
    if (!viewer) return;

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(35.2433, 38.9637, 2500000.0),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        },
        duration: 2
    });
};

export default CesiumMap;