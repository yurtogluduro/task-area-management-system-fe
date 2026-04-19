import React, { useState, useCallback } from 'react';
import CesiumMap from './CesiumMap';
import InfoPanel from './InfoPanel';

function App() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [clearKey, setClearKey] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const isButtonDisabled = selectedRegion === null;

    const handleRegionSelect = useCallback((regionData) => {
        setSelectedRegion(regionData);
    }, []);

    const saveTask = (taskDetails) => {
        const newTask = {
            ...taskDetails,
            coords: selectedRegion.coords,
            id: Date.now()
        };
        setTasks([...tasks, newTask]);
        setSelectedRegion(null);
        alert("Görev Bölgesi Başarıyla Tanımlandı!");
    };

    const handlePinSelect = (data) => {
        setSelectedRegion(data);
    };

    const handleClear = () => {
        setClearKey(Date.now());
        setSelectedRegion(null);
    };

    const showInfoPanel = () => {
        setIsFormVisible(true);
    };

    return (
        <div style={{ display: 'flex', width: '75vw', height: '100vh' }}>
            {console.log("Seçili Bölge Durumu:", selectedRegion)}
            <button
                disabled={isButtonDisabled}

                onClick={() => setIsFormVisible(true)}
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

                    // Duruma göre renk değişimi (Kullanıcı deneyimi için)
                    backgroundColor: !selectedRegion ? "#bdc3c7" : "#3498db",
                    color: !selectedRegion ? "#7f8c8d" : "white",
                    cursor: !selectedRegion ? "not-allowed" : "pointer",

                    transition: "all 0.3s ease" // Geçiş efekti
                }}
            >
                {!selectedRegion ? "Lütfen Haritadan Alan Seçin" : "Seçili Alanı Görev Bölgesi Yap"}
            </button>
            {/* Harita Alanı */}
            <div style={{ flex: 1, position: 'relative' }}>
                <CesiumMap onSelect={handleRegionSelect} />
            </div>

            {/* Sağ Panel */}
            <div style={{ width: '400px', borderLeft: '1px solid #ccc', overflowY: 'auto' }}>
                <InfoPanel
                    selectedRegion={handleRegionSelect}
                    isFormVisible={isFormVisible}
                    onSaveTask={saveTask}
                    tasks={tasks}
                />
            </div>
        </div>
    );
}

export default App;