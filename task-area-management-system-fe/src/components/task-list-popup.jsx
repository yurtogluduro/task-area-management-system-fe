import React, { useState } from 'react';
import { AreaType } from '../constants/enums';

const TaskListPopUp = ({ tasks, onClose, onFocusTask }) => {
    const [filters, setFilters] = useState({
        taskName: '',
        areaType: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const [searchResults, setSearchResults] = useState(tasks);

    const handleSearch = () => {
        console.log("filters : ", filters)
        const filtered = tasks.filter(task => {
            const matchName = filters.taskName == '' || task.taskName?.toLowerCase().includes(filters.taskName.toLowerCase());
            const matchType = filters.areaType == '' || task.areaType === filters.areaType ? true : false;

            let matchesStartDate = true;
            if (filters.startDate) {
                const start = new Date(filters.startDate);
                start.setHours(0, 0, 0, 0);
                const taskStartDate = new Date(task.startDate).getTime();
                matchesStartDate = taskStartDate >= start;
            }

            let matchesEndDate = true;
            if (filters.endDate) {
                const end = new Date(filters.endDate);
                end.setHours(23, 59, 59, 999);
                const taskEndDate = new Date(task.endDate).getTime();
                matchesEndDate = taskEndDate <= end;
            }

            return matchName && matchType && matchesStartDate && matchesEndDate;
        });
        setSearchResults(filtered);
    };

    const handleClear = () => {
        setFilters({ taskName: '', areaType: '', startDate: '', endDate: '' });
        setSearchResults(tasks);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <h3 style={{ margin: 0 }}>Görev Alanı Listesi</h3>
                    <button onClick={onClose} style={styles.closeButton}>&times;</button>
                </div>

                <div style={styles.filterSection}>
                    <div style={styles.filterInputsRow}>

                        <input
                            type="text"
                            placeholder="Alan Adı"
                            value={filters.taskName}
                            onChange={(e) => setFilters({ ...filters, taskName: e.target.value })}
                            style={styles.input}
                        />
                        <select
                            value={filters.areaType}
                            onChange={(e) => setFilters({ ...filters, areaType: e.target.value })}
                            style={styles.select}
                        >
                            <option value="">Görev Tipi</option>
                            {Object.entries(AreaType).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="date"
                            title="Başlangıç Tarihi"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="date"
                            title="Bitiş Tarihi"
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.filterActionsRow}>
                        <button onClick={handleSearch} style={styles.searchBtn}>Sorgula</button>
                        <button onClick={handleClear} style={styles.clearBtn}>Temizle</button>
                    </div>

                </div>

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Görev Alan Adı</th>
                                <th style={styles.th}>Görev Tipi</th>
                                <th style={styles.th}>Açıklama</th>
                                <th style={styles.th}>Görev Başlangıç Tarihi</th>
                                <th style={styles.th}>Görev Bitiş Tarihi</th>
                                <th style={styles.th}>Konum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults != null && searchResults.length > 0 ? (
                                searchResults.map((task) => (
                                    <tr key={task.id} style={styles.tr}>
                                        <td style={styles.td}>{task.taskName}</td>
                                        <td style={styles.td}>{AreaType[task.areaType] || task.areaType}</td>
                                        <td style={styles.td}>{task.description}</td>
                                        <td style={styles.td}>{new Date(task.startDate).toLocaleDateString('tr-TR')}</td>
                                        <td style={styles.td}>{new Date(task.endDate).toLocaleDateString('tr-TR')}</td>
                                        <td style={styles.td}>
                                            <button
                                                onClick={() => onFocusTask(task)}
                                                style={styles.focusBtn}
                                            >
                                                📍 Git
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        Sonuç bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2000,
    },
    container: {
        width: '100%',
        maxWidth: '1400px',
        minWidth: '800px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        overflow: 'hidden',
    },
    header: {
        padding: '15px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
    },
    closeButton: {
        border: 'none',
        background: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#999'
    },
    filterSection: {
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        gap: '10px',
        borderBottom: '1px solid #eee'
    },
    inputGroup: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px'
    },
    tableHeaderBand: {
        backgroundColor: '#34495e', // Tabloya özel koyu bir bant
        padding: '10px 20px',
        borderBottom: '3px solid #2c3e50',
    },
    tableTitleText: {
        color: '#ffffff',
        margin: 0,
        fontSize: '14px',
        letterSpacing: '1px',
        fontWeight: 'bold',
    },
    tableWrapper: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        overflowX: 'auto',
        backgroundColor: '#ffffff',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '2px solid #2c3e50',
    },
    th: {
        backgroundColor: '#ecf0f1',
        color: '#2c3e50',
        padding: '15px 12px',
        fontSize: '13px',
        fontWeight: '800',
        textAlign: 'center',
        border: '1px solid #7f8c8d',
        textTransform: 'uppercase',
    },
    td: {
        padding: '12px',
        fontSize: '14px',
        color: '#333',
        border: '1px solid #bdc3c7',
        textAlign: 'center',
    },
    tr: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #bdc3c7',
    },
    focusBtn: {
        backgroundColor: '#ebf5ff',
        color: '#1890ff',
        border: '1px solid #1890ff',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        fontSize: '12px'
    },


    filterInputsRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
    },

    filterActionsRow: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '12px',
        paddingTop: '10px',
        borderTop: '1px dashed #eee',
    },

    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minWidth: '150px',
        flex: 1,
    },

    select: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        minWidth: '150px',
    },

    searchBtn: {
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '10px 25px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background 0.2s',
    },

    clearBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '10px 25px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background 0.2s',
    }
};


export default TaskListPopUp;