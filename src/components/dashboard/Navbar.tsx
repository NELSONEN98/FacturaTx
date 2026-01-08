import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>Nelson Developer</span>
                    <span className={styles.userRole}>Administrador</span>
                </div>
                <div className={styles.avatar}>
                    ND {/* Iniciales */}
                </div>
            </div>
        </header>
    );
}
