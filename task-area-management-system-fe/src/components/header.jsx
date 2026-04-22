const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.contentWrapper}>
                <div style={styles.logoSection}>
                    <h1 style={styles.title}>GÖREV ALANI YÖNETİM VE TAKİP SİSTEMİ</h1>
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        height: '50px',
        backgroundColor: '#126dc8',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    contentWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'center',
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    navSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    statusIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px'
    },
    statusDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#2ecc71',
        borderRadius: '50%',
    },
    divider: {
        width: '1px',
        height: '25px',
        backgroundColor: '#3e4f5f'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    userAvatar: {
        width: '32px',
        height: '32px',
        backgroundColor: '#3498db',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 'bold'
    }
};

export default Header;