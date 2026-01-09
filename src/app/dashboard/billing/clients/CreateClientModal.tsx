'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './CreateClientModal.module.css';

interface CreateClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

export default function CreateClientModal({ isOpen, onClose, onSubmit }: CreateClientModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        tipoDocumento: 'NIT',
        identificacion: '',
        dv: '', // Dígito de verificación para NIT
        nombre: '',
        nombreComercial: '',
        email: '',
        telefono: '',
        celular: '',
        direccion: '',
        ciudad: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulamos delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Formatear NIT completo si es necesario
        const fullNit = formData.tipoDocumento === 'NIT' && formData.dv
            ? `${formData.identificacion}-${formData.dv}`
            : formData.identificacion;

        const newClient = {
            ...formData,
            id: Math.random().toString(36).substr(2, 9),
            nit: fullNit,
            fechaRegistro: new Date().toISOString().split('T')[0]
        };

        if (onSubmit) {
            onSubmit(newClient);
        }

        setIsLoading(false);
        onClose();
        // Reset form
        setFormData({
            tipoDocumento: 'NIT',
            identificacion: '',
            dv: '',
            nombre: '',
            nombreComercial: '',
            email: '',
            telefono: '',
            celular: '',
            direccion: '',
            ciudad: ''
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Nuevo Cliente</h2>
                    <p className={styles.description}>Registra la información del cliente para facturación</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Fila 1: Identificación */}
                    <div className={styles.row}>
                        <div className={styles.third}>
                            <div className={styles.selectGroup}>
                                <label className={styles.label}>Tipo Doc.</label>
                                <select
                                    className={styles.select}
                                    value={formData.tipoDocumento}
                                    onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                                >
                                    <option value="NIT">NIT</option>
                                    <option value="CC">Cédula (CC)</option>
                                    <option value="CE">Cédula Ext. (CE)</option>
                                    <option value="PAS">Pasaporte</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.half}>
                            <Input
                                label="Número de Identificación"
                                placeholder="Sin puntos ni guiones"
                                value={formData.identificacion}
                                onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
                                fullWidth
                                required
                            />
                        </div>
                        {formData.tipoDocumento === 'NIT' && (
                            <div style={{ flex: '0.2' }}>
                                <Input
                                    label="DV"
                                    placeholder="0"
                                    value={formData.dv}
                                    onChange={(e) => setFormData({ ...formData, dv: e.target.value })}
                                    fullWidth
                                    maxLength={1}
                                />
                            </div>
                        )}
                    </div>

                    {/* Fila 2: Nombres */}
                    <div className={styles.row}>
                        <div className={styles.half}>
                            <Input
                                label="Razón Social / Nombre Completo"
                                placeholder="Nombre legal para facturación"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                fullWidth
                                required
                            />
                        </div>
                        <div className={styles.half}>
                            <Input
                                label="Nombre Comercial (Opcional)"
                                placeholder="Nombre de la marca o tienda"
                                value={formData.nombreComercial}
                                onChange={(e) => setFormData({ ...formData, nombreComercial: e.target.value })}
                                fullWidth
                            />
                        </div>
                    </div>

                    {/* Fila 3: Contacto */}
                    <div className={styles.row}>
                        <div className={styles.half}>
                            <Input
                                label="Correo Electrónico"
                                type="email"
                                placeholder="facturacion@empresa.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                fullWidth
                                required
                            />
                        </div>
                        <div className={styles.third}>
                            <Input
                                label="Celular"
                                placeholder="300 123 4567"
                                value={formData.celular}
                                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.twoThirds}>
                            <Input
                                label="Dirección Física"
                                placeholder="Calle 123 # 45 - 67"
                                value={formData.direccion}
                                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                fullWidth
                            />
                        </div>
                        <div className={styles.third}>
                            <Input
                                label="Teléfono Fijo"
                                placeholder="601 234 5678"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Guardando...' : 'Crear Cliente'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
