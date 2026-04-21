const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.contentWrapper}>

                <div style={styles.logoSection}>
                    <div style={styles.logoIcon}>🛰️</div>
                    <h1 style={styles.title}>GÖREV ALANI YÖNETİM VE TAKİP SİSTEMİ </h1>
                </div>

                <nav style={styles.navSection}>
                    <div style={styles.statusIndicator}>
                        <span style={styles.statusDot}></span>
                        Sistem Çevrimiçi
                    </div>
                    <div style={styles.divider}></div>
                    <div style={styles.userInfo}>
                        <div style={styles.userAvatar}>A</div>
                        <span>Admin Panel</span>
                    </div>
                </nav>

            </div>
        </header>
    );
};

const styles = {
    header: {
        height: '60px',
        backgroundColor: '#074f96',
        color: 'white',
        display: 'flex',
        justifyContent: 'left', // İçerik kapsayıcısını yatayda ortalar
        alignItems: 'left',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        width: '100%',
    },
    contentWrapper: {
        width: '100%',
        maxWidth: '1400px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
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