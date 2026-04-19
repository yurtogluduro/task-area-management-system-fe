import React, { useState } from 'react';


function InfoPanel({ selectedRegion, onSaveTask, tasks, isFormVisible }) {
    const [taskName, setTaskName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    console.log("Paneldeki Durum:", isFormVisible);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveTask({ name: taskName, start: startDate, end: endDate });
        setTaskName("");
        setStartDate("");
        setEndDate("");
    };

    return (
        <div style={{ padding: "20px" }}>
            {console.log('isFormVisible ' + isFormVisible)}
            {isFormVisible ? (
                <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
                    <h3>Yeni Görev Bölgesi Tanımla</h3>
                    <p>Alan: {selectedRegion.area}</p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Görev Adı:</label><br />
                            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Başlangıç:</label><br />
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Bitiş:</label><br />
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required style={{ width: "100%" }} />
                        </div>
                        <button type="submit" style={{ width: "100%", padding: "10px", background: "#2ecc71", color: "white", border: "none", borderRadius: "5px" }}>
                            Görev Bölgesini Kaydet
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>Tanımlı Görevler ({tasks.length})</h3>
                    {tasks.map(task => (
                        <div key={task.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
                            <strong>{task.name}</strong><br />
                            <small>📅 {task.start} / {task.end}</small>
                        </div>
                    ))}
                    {tasks.length === 0 && <p>Henüz tanımlı bir görev yok. Haritaya sağ tıklayarak alan belirleyin.</p>}
                </div>
            )}
        </div>
    );
}

export default InfoPanel;