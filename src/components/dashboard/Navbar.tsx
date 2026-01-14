'use client';

import { UserButton, SignInButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user } = useUser();

    return (
        <header className={styles.navbar}>
            <SignedIn>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Optional: Show name next to the button if desired, mirroring previous design */}
                    <div className={styles.userInfo} style={{ marginRight: '0.5rem', textAlign: 'right' }}>
                        <span className={styles.userName}>
                            {user?.fullName || user?.firstName || 'Usuario'}
                        </span>
                        <span className={styles.userRole}>
                            {/* Role can be fetched from metadata if stored there, for now static or hidden */}
                        </span>
                    </div>
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="Mis datos"
                                href="/dashboard/perfil"
                                labelIcon={<span>👤</span>}
                            />
                            <UserButton.Link
                                label="Comunicados"
                                href="/dashboard/comunicados"
                                labelIcon={<span>📢</span>}
                            />
                            <UserButton.Link
                                label="Mis paquetes"
                                href="/dashboard/paquetes"
                                labelIcon={<span>📦</span>}
                            />
                            <UserButton.Link
                                label="Tutoriales"
                                href="/dashboard/tutoriales"
                                labelIcon={<span>🎓</span>}
                            />
                            <UserButton.Link
                                label="Soporte"
                                href="/dashboard/soporte"
                                labelIcon={<span>🛠️</span>}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </div>
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <button className={styles.dropdownItem} style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem' }}>
                        Iniciar Sesión
                    </button>
                </SignInButton>
            </SignedOut>
        </header>
    );
}
