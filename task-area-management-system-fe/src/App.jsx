import React, { useState, useRef, useCallback } from 'react';
import CesiumMap from './cesium-map';
import TaskAreaPopup from './task-area-form-component';
import TaskListPopUp from './components/task-list-popup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import taskAreaService from './service/task-area-service';
import unitService from './service/unit-service';

import * as Cesium from 'cesium';
import Header from './components/header';
import UnitFormComponent from './components/unit-form-component';


function App() {
    const [activeCoordinates, setActiveCoordinates] = useState(null);
    const [activeUnitCoordinates, setActiveUnitCoordinates] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUnitFormOpen, setIsUnitFormOpen] = useState(false);
    const [displayUnitFormButton, setDisplayUnitFormButton] = useState(false);
    const [isTaskListPopupOpen, setIsTaskListPopupOpen] = useState(false);

    const cesiumRef = useRef();
    const handleRegionSelect = useCallback((regionData) => {
        setActiveCoordinates(regionData?.coords);
    }, []);

    const onSelectUnitArea = useCallback((regionData) => {
        setDisplayUnitFormButton(true);
        setActiveUnitCoordinates(regionData?.coords)
    }, []);

    const handleTaskList = useCallback((tasks) => {
        setTasks(tasks?.taskListInfo);
        console.log("handleTaskList running : ", tasks)
    }, []);

    const prepareCoordinatesDegree = (cartesianPositions) => {
        return cartesianPositions.map((cartesian, index) => {
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

            return {
                longitude: Cesium.Math.toDegrees(cartographic.longitude),
                latitude: Cesium.Math.toDegrees(cartographic.latitude),
                orderIndex: index
            };
        });
    };

    const prepareCoordinatesDegreeUnit = (cartesianPositions) => {
        return cartesianPositions.map((cartesian) => {
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

            return {
                lng: Cesium.Math.toDegrees(cartographic.longitude),
                lat: Cesium.Math.toDegrees(cartographic.latitude)
            };
        });
    };

    const saveUnit = async (formData) => {
        console.log("saveUnit : ", formData);
        const unit = {
            ...formData,
            unitPositions: prepareCoordinatesDegreeUnit(activeUnitCoordinates)
        };
        try {
            const result = await unitService.createUnit(unit);
            if (result) {
                toast.success("Birim başarıyla kaydedildi!");
                setDisplayUnitFormButton(false);
                setIsUnitFormOpen(false);
            }

        } catch (error) {
            console.error("Servis hatası:", error);
        }

    };

    const handleFinalSubmit = async (formData) => {
        const newTask = {
            ...formData,
            coordinates: prepareCoordinatesDegree(activeCoordinates)
        };

        console.log("New task :", newTask);
        try {
            const result = await taskAreaService.createTaskArea(newTask);
            if (result) {
                toast.success("Görev alanı başarıyla kaydedildi!");
                setIsPopupOpen(false);
                setActiveCoordinates([]);
                newTask.id = result.id;
                setTasks([...tasks, result]);
                if (result && cesiumRef.current) {
                    cesiumRef.current.addNewEntity(result);
                }
            }
        } catch (error) {
            console.error("Servis hatası:", error);
        }
    };

    const handleMakeTaskArea = () => {
        if (activeCoordinates && activeCoordinates.length >= 3) {
            setIsPopupOpen(true);
        } else {
            toast.warn("Lütfen önce harita üzerinde bir alan çizin!");
        }
    };

    const openUnitForm = () => {
        if (displayUnitFormButton) {
            setIsUnitFormOpen(true);
        } else {
            toast.warn("Lütfen harita üzerinden bir Görev Alanı seçiniz.");
        }
    };

    const handleGoToTask = (task) => {
        setIsTaskListPopupOpen(false);
        if (cesiumRef.current) {
            cesiumRef.current.handleFocusTask(task);
        } else {
            console.warn("Harita henüz hazır değil!");
        }
    };

    const openTaskAreaList = () => {
        setIsTaskListPopupOpen(true);
    };

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <Header />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <CesiumMap ref={cesiumRef} onSelectUnitArea={onSelectUnitArea} onSelect={handleRegionSelect} onHandleTasks={handleTaskList} />
            </div>
            <TaskAreaPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleFinalSubmit}
            />
            <UnitFormComponent
                isOpen={isUnitFormOpen}
                onClose={() => setIsUnitFormOpen(false)}
                onSubmit={saveUnit}
            />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {isTaskListPopupOpen && (
                <TaskListPopUp
                    tasks={tasks}
                    onClose={() => setIsTaskListPopupOpen(false)}
                    onFocusTask={handleGoToTask}
                />
            )}
            <div style={styles.bottomBar}>
                <button style={styles.menuItem} onClick={handleMakeTaskArea}
                >
                    <span style={styles.label}>Görev Bölgesi Oluştur</span>
                </button>

                <button style={styles.menuItem} onClick={openTaskAreaList} >
                    <span style={styles.label}>Görev Bölgeleri</span>
                </button>

                <button style={styles.menuItem} onClick={openUnitForm}>
                    <span style={styles.label}>Birlik Oluştur</span>
                </button>
            </div>
        </div>
    );
}

const styles = {
    bottomBar: {
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',

        width: 'auto',
        minWidth: '300px',
        backgroundColor: 'rgba(44, 62, 80, 0.95)',
        backdropFilter: 'blur(10px)',

        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',

        padding: '10px 25px',
        borderRadius: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        zIndex: 1100,
        border: '1px solid rgba(255,255,255,0.1)',
    },

    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '5px 15px',
        transition: 'transform 0.2s',
        gap: '4px'
    },

    icon: {
        fontSize: '20px',
    },

    label: {
        fontSize: '11px',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    }
};

export default App;