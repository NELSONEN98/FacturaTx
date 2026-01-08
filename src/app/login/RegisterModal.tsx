'use client';

import { useState, FormEvent } from 'react';
import styles from './RegisterModal.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface RegisterModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    if (!open) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Aquí iría la lógica de registro real
        console.log('Registrando usuario:', formData);

        // Simular éxito y cerrar
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        onOpenChange(false);
    };

    return (
        <div className={styles.overlay} onClick={(e) => {
            if (e.target === e.currentTarget) onOpenChange(false);
        }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Crear una cuenta</h2>
                    <p className={styles.description}>Únete a Factura Tech en segundos</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Nombre completo"
                        placeholder="Juan Pérez"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />

                    <Input
                        label="Correo electrónico"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={6}
                    />

                    <Input
                        label="Confirmar contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        minLength={6}
                    />

                    <div className={styles.footer}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Registrarse
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
