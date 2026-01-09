'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        // Aquí iría la lógica real de logout (borrar tokens, etc.)
        console.log('Cerrando sesión...');
        router.push('/login');
    };

    return (
        <header className={styles.navbar}>
            {/* Click outside overlay (solo visible cuando el menú está abierto) */}
            {isMenuOpen && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 90 }}
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <div
                className={styles.userProfile}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className={styles.userInfo}>
                    <span className={styles.userName}>Nelson Developer</span>
                    <span className={styles.userRole}>Administrador</span>
                </div>
                <div className={styles.avatar}>
                    ND
                </div>
            </div>

            {/* Menú Desplegable */}
            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem} onClick={() => console.log('Mis Datos')}>
                        Mis Datos
                    </button>
                    <button className={styles.dropdownItem} onClick={() => console.log('Mis Paquetes')}>
                        Mis Paquetes
                    </button>
                    <div className={styles.dropdownDivider} />
                    <button className={styles.dropdownItem} onClick={() => console.log('Soporte')}>
                        Soporte
                    </button>
                    <div className={styles.dropdownDivider} />
                    <button
                        className={`${styles.dropdownItem} ${styles.logout}`}
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </header>
    );
}
