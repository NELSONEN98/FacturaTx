'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SignIn, SignUpButton } from '@clerk/nextjs';
import styles from './page.module.css';
import HelpModal from './HelpModal';

export default function LoginPage() {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            {/* Mantenemos tus formas decorativas de fondo */}
            <div className={styles.backgroundShapes}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
                <div className={styles.shape3}></div>
            </div>

            <div className={styles.loginCard}>
                <div className={styles.logoSection} style={{ marginBottom: '1rem' }}>
                    <Image
                        src="/images/logo-login.png"
                        alt="Logo Factura Tech"
                        width={180}
                        height={60}
                        priority
                        className={styles.logo}
                    />
                </div>

                {/* 
                    Optimizamos la integración:
                    1. Forzamos a que el rootBox ocupe el 100% y centre el contenido.
                    2. Eliminamos cualquier rastro de la 'tarjeta' propia de Clerk para que use la tuya.
                */}
                <SignIn
                    path="/login"
                    appearance={{
                        variables: {
                            colorPrimary: '#BE1129',
                            colorText: '#1A1D21',
                            colorBackground: 'transparent',
                            borderRadius: '0.5rem',
                        },
                        elements: {
                            rootBox: {
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                            card: {
                                boxShadow: 'none',
                                background: 'transparent',
                                border: 'none',
                                width: '100%',
                                padding: '0',
                                margin: '0',
                            },
                            navbar: {
                                display: 'none',
                            },
                            header: {
                                display: 'none',
                            },
                            main: {
                                width: '100%',
                                boxShadow: 'none',
                                border: 'none',
                                background: 'transparent',
                            },
                            cardBox: {
                                boxShadow: 'none',
                                border: 'none',
                                background: 'transparent',
                            },
                            headerTitle: {
                                display: 'none',
                            },
                            headerSubtitle: {
                                display: 'none',
                            },
                            formButtonPrimary: {
                                width: '100%',
                                fontSize: '1rem',
                                height: '2.75rem',
                                textTransform: 'none',
                                backgroundColor: '#BE1129',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#A00F22',
                                }
                            },
                            footer: {
                                display: 'none',
                            },
                            footerAction: {
                                display: 'none',
                            },
                            formFieldInput: {
                                height: '2.75rem',
                                border: '1px solid #E2E8F0',
                                '&:focus': {
                                    border: '1px solid #BE1129',
                                }
                            },
                            dividerLine: {
                                background: '#E2E8F0',
                            },
                            dividerText: {
                                color: '#718096',
                            }
                        }
                    }}
                />


                <div className={styles.footer} style={{ border: 'none', marginTop: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        ¿No tienes cuenta?{' '}
                        <a href="/sign-up" className={styles.registerLink} style={{ textDecoration: 'none' }}>
                            Regístrate aquí
                        </a>
                    </p>
                    <p style={{ fontSize: '0.85rem' }}>
                        ¿Necesitas asistencia?
                    </p>
                    <button
                        className={styles.registerLink}
                        onClick={() => setIsHelpModalOpen(true)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontSize: '0.85rem' }}
                    >
                        Solicitar ayuda
                    </button>
                </div>
            </div>

            {/* Modales */}
            <HelpModal
                open={isHelpModalOpen}
                onOpenChange={setIsHelpModalOpen}
            />
        </div>
    );
}
