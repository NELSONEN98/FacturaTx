'use client';

import { SignUp } from '@clerk/nextjs';
import styles from './RegisterModal.module.css';

interface RegisterModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
    if (!open) return null;

    return (
        <div className={styles.overlay} onClick={(e) => {
            if (e.target === e.currentTarget) onOpenChange(false);
        }}>
            <div className={styles.modal} style={{ padding: '0', overflow: 'hidden', maxWidth: '500px' }}>
                <SignUp
                    routing="hash"
                    appearance={{
                        variables: {
                            colorPrimary: '#BE1129',
                            colorText: '#1A1D21',
                        },
                        elements: {
                            card: {
                                boxShadow: 'none',
                                border: 'none',
                                width: '100%',
                            },
                            rootBox: {
                                width: '100%',
                            },
                        }
                    }}
                />
            </div>
        </div>
    );
}
