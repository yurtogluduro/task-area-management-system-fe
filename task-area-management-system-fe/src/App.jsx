import React, { useState, useRef, useCallback } from 'react';
import CesiumMap from './CesiumMap';
import TaskAreaPopup from './TaskAreaPopUp';
import TaskListPopUp from './components/task-list-popup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import taskAreaService from './service/taskAreaService';
import * as Cesium from 'cesium';
import Header from './components/Header';

function App() {
    const [activeCoordinates, setActiveCoordinates] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTaskListPopupOpen, setIsTaskListPopupOpen] = useState(false);

    const isButtonDisabled = activeCoordinates === null;
    const cesiumRef = useRef();
    const handleRegionSelect = useCallback((regionData) => {
        setActiveCoordinates(regionData?.coords);
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
        if (activeCoordinates.length >= 3) {
            setIsPopupOpen(true);
        } else {
            toast.warn("Lütfen önce harita üzerinde bir alan çizin!");
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
            <button
                disabled={isButtonDisabled}

                onClick={handleMakeTaskArea}
                style={{
                    position: "absolute",
                    bottom: 70,
                    left: "40%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    border: "none",

                    backgroundColor: !activeCoordinates ? "#bdc3c7" : "#3498db",
                    color: !activeCoordinates ? "#7f8c8d" : "white",
                    cursor: !activeCoordinates ? "not-allowed" : "pointer",

                    transition: "all 0.3s ease"
                }}
            >
                {!activeCoordinates ? "Lütfen Haritadan Alan Seçin" : "Seçili Alanı Görev Bölgesi Yap"}
            </button>
            <button

                onClick={openTaskAreaList}
                style={{
                    position: "absolute",
                    bottom: 70,
                    left: "60%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    border: "none",

                    backgroundColor: "#3498db",
                    color: "white",
                    cursor: "pointer",

                    transition: "all 0.3s ease"
                }}
            >
                {"Görev Bölgesi Listesi"}
            </button>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <CesiumMap ref={cesiumRef} onSelect={handleRegionSelect} onHandleTasks={handleTaskList} />
            </div>
            <TaskAreaPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleFinalSubmit}
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
        </div>
    );
}

export default App;