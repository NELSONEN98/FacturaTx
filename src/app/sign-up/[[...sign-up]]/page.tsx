import { SignUp } from "@clerk/nextjs";
import Image from 'next/image';
import styles from "../../login/[[...login]]/page.module.css";

export default function Page() {
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

                <SignUp
                    path="/sign-up"
                    signInUrl="/login"
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
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}
