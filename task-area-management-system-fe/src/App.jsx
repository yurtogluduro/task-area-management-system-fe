import React, { useState, useCallback } from 'react';
import CesiumMap from './CesiumMap';
import InfoPanel from './InfoPanel';
import TaskAreaPopup from './TaskAreaPopUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import taskAreaService from './service/taskAreaService';

function App() {
    const [activeCoordinates, setActiveCoordinates] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const isButtonDisabled = activeCoordinates === null;

    const handleRegionSelect = useCallback((regionData) => {
        setActiveCoordinates(regionData?.coords);
    }, []);

    const handleFinalSubmit = async (formData) => {
        const newTask = {
            ...formData,
            coordinates: activeCoordinates.map((c, i) => ({
                latitude: c.x,
                longitude: c.y,
                altitude: c.z,
                orderIndex: i
            }))
        };

        console.log("New task :", newTask);
        try {
            const result = await taskAreaService.createTaskArea(newTask);
            if (result) {
                toast.success("Görev alanı başarıyla kaydedildi!");
                setIsPopupOpen(false);
                setActiveCoordinates([]);
                setTasks([...tasks, newTask]);
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

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            {console.log("Seçili Bölge Durumu:", activeCoordinates)}
            {console.log("isPopupOpen:", isPopupOpen)}
            <button
                disabled={isButtonDisabled}

                onClick={handleMakeTaskArea}
                style={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
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
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <CesiumMap onSelect={handleRegionSelect} />
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
        </div>
    );
}

export default App;