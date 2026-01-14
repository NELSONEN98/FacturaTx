'use client';

import { useState, FormEvent } from 'react';
import styles from './HelpModal.module.css';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface HelpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
}

export default function HelpModal({ open, onOpenChange, title, description }: HelpModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        issue: ''
    });

    if (!open) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de envío
        console.log('Enviando ayuda:', formData);
        onOpenChange(false);
    };

    return (
        <div className={styles.overlay} onClick={(e) => {
            // Cerrar si se hace clic en el fondo oscuro
            if (e.target === e.currentTarget) onOpenChange(false);
        }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>¿Necesitas asistencia?</h2>
                    <p className={styles.description}>Solicíta ayuda, un ejecutivo te asistira en el menor tiempo posible

                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="NIT"
                        placeholder="Tu NIT"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <Input
                        label="Teléfono"
                        placeholder="Tu teléfono"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <Textarea
                        label="Motivo de consulta"
                        placeholder="Información adicional"
                        value={formData.issue}
                        onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                        required
                        rows={4}
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
                            Enviar Solicitud
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}