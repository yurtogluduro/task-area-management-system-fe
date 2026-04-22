import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AreaType } from './constants/enums';

const TaskAreaPopUp = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        taskName: '',
        areaType: Object.keys(AreaType)[0],
        description: '',
        startDate: '',
        endDate: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.taskName || !formData.startDate || !formData.endDate) {
            alert("Lütfen zorunlu alanları (*) doldurun.");
            return;
        }
        onSubmit(formData);
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2147483647,
            backdropFilter: 'blur(4px)'
        },
        modal: {
            backgroundColor: 'white',
            width: '450px',
            borderRadius: '12px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        },
        header: {
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '16px 24px',
            fontSize: '1.2rem',
            fontWeight: '600'
        },
        body: {
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        label: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151'
        },
        input: {
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            outline: 'none'
        },
        row: {
            display: 'flex',
            gap: '12px'
        },
        footer: {
            padding: '16px 24px',
            backgroundColor: '#f9fafb',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            borderTop: '1px solid #e5e7eb'
        },
        btnCancel: {
            padding: '10px 18px',
            background: 'none',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
        },
        btnSave: {
            padding: '10px 18px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
    };

    return createPortal(
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div>Yeni Görev Bölgesi Oluştur</div>
                </div>

                <div style={styles.body}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Görev Adı *</label>
                        <input
                            name="taskName"
                            style={styles.input}
                            placeholder="Örn: Sahil Gözetleme"
                            onChange={handleChange}
                        />
                    </div>

                    <div style={styles.row}>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                            <label style={styles.label}>Alan Tipi</label>
                            <select name="areaType" style={styles.input} onChange={handleChange} value={formData.areaType}>
                                {Object.keys(AreaType).map((key) => (
                                    <option key={key} value={key}>
                                        {AreaType[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                            <label style={styles.label}>Başlangıç *</label>
                            <input name="startDate" type="datetime-local" style={styles.input} onChange={handleChange} />
                        </div>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                            <label style={styles.label}>Bitiş *</label>
                            <input name="endDate" type="datetime-local" style={styles.input} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Açıklama / Notlar</label>
                        <textarea
                            name="description"
                            rows="3"
                            style={{ ...styles.input, resize: 'none' }}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>

                <div style={styles.footer}>
                    <button style={styles.btnCancel} onClick={onClose}>İptal</button>
                    <button style={styles.btnSave} onClick={handleSave}>Görev Alanını Kaydet</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default TaskAreaPopUp;