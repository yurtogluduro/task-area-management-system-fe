import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import * as Cesium from "cesium";
import "cesium/Source/Widgets/widgets.css";
import taskAreaService from './service/task-area-service';
import unitService from './service/unit-service';

import { AreaType } from './constants/enums';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODUwZGFlOC1hZTY2LTQ3NGMtOTYyZi00YzIzYTEzNWU0MTEiLCJpZCI6NDE5OTAwLCJpYXQiOjE3NzY1MDk4ODd9.pCjHVbb_dq_cBa6qsAiQzTph9669PKnKZUwmTlrgPHY';


const CesiumMap = forwardRef(({ onSelect, onHandleTasks, onSelectUnitArea }, ref) => {
    const cesiumContainer = useRef(null);
    const viewerRef = useRef(null);

    const activePointsRef = useRef([]);

    useImperativeHandle(ref, () => ({
        addNewEntity(newRecord) {
            if (viewerRef.current && newRecord) {
                const existing = viewerRef.current.entities.getById(newRecord.id.toString());
                if (existing) return;
                drawTaskOnMap(viewerRef.current, newRecord)
                console.log("Yeni entity haritaya eklendi.");
            }
        },
        handleFocusTask(task) {
            console.log("useImperativeHandle ", task);
            if (viewerRef.current && task) {
                const entity = viewerRef.current.entities.getById(task.id.toString());
                if (entity) {
                    viewerRef.current.flyTo(entity, {
                        duration: 2,
                        offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
                    });
                    viewerRef.current.selectedEntity = entity;
                }
            }
        }
    }), []);

    const drawUnitPaths = (unit, viewer) => {
        if (!unit.unitPositions || unit.unitPositions.length < 2) {
            console.warn("Çizim için en az 2 koordinat gereklidir.");
            return null;
        }

        const positionsArray = unit.unitPositions.flatMap(c => [c.lng, c.lat]);

        const pathEntity = viewer.entities.add({
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(positionsArray),
                width: 4,
                material: Cesium.Color.YELLOW,
                clampToGround: true,
            }
        });

        return pathEntity;
    };

    const drawTaskOnMap = (viewer, task) => {
        if (!task.coordinates || task.coordinates.length < 3) return;

        const degreeArray = task.coordinates
            .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
            .flatMap(coord => [
                Number(coord.longitude),
                Number(coord.latitude)
            ]);

        try {
            viewer.entities.add({
                id: task.id.toString(),
                name: 'Görev Alanı Bilgisi',
                areaName: task.taskName,
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(degreeArray),
                    material: Cesium.Color.BLUE.withAlpha(0.4),
                    outline: true,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
                description: `
        <table class="cesium-infoBox-descriptionTable">
            <tbody>
                <tr>
                    <th>Görev Alan Adı : </th>
                    <td>${task.taskName}</td>
                </tr>
                <tr>
                    <th>Görev Tipi     :</th>
                    <td>${AreaType[task.areaType]}</td>
                </tr>
                <tr>
                    <th>Açıklama       :</th>
                    <td>${task.description || 'Açıklama yok.'}</td>
                </tr>
            </tbody>
        </table>
    `
            });


        } catch (e) {
            console.error("çizilirken hata:", e);
        }
    };


    useEffect(() => {
        if (cesiumContainer.current && !viewerRef.current) {
            const viewer = new Cesium.Viewer(cesiumContainer.current, {
                selectionIndicator: false,
                infoBox: true,
            });
            viewerRef.current = viewer;

            focusOnTurkey(viewer);

            const onMapReady = async () => {
                removeListener();

                try {
                    const tasks = await taskAreaService.getAllTasks();
                    if (tasks && tasks.length > 0) {
                        tasks.forEach(task => drawTaskOnMap(viewer, task));
                        console.log("cesium task gönderdi . ", tasks)
                        onHandleTasks({
                            taskListInfo: tasks
                        });
                    }
                    const units = await unitService.getAllUnits();
                    if (units && units.length > 0) {
                        units.forEach(unit => drawUnitPaths(unit, viewer));
                        console.log("cesium unitleri aldı  ", units)

                    }
                } catch (error) {
                    console.error("Veri hatası:", error);
                }
            };

            const removeListener = viewer.scene.postRender.addEventListener(onMapReady);
            const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

            handler.setInputAction((click) => {
                const pickedObject = viewer.scene.pick(click.position);
                const cartesian = viewer.camera.pickEllipsoid(click.position);

                if (Cesium.defined(pickedObject) && pickedObject.id) {

                    activePointsRef.current.push(cartesian);

                    viewer.entities.add({
                        position: cartesian,
                        point: { pixelSize: 8, color: Cesium.Color.RED, disableDepthTestDistance: Number.POSITIVE_INFINITY }
                    });
                    const entity = pickedObject.id;
                    viewer.selectedEntity = entity;
                    const finalPoints = [...activePointsRef.current];

                    onSelectUnitArea({
                        coords: [finalPoints[finalPoints.length - 1]]
                    });

                } else {
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
});

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