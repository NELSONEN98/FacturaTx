'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import styles from './CreateItemModal.module.css';

interface CreateItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

export default function CreateItemModal({ isOpen, onClose, onSubmit }: CreateItemModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        identificador: '',
        precio: '',
        unidad: 'Unidad',
        moneda: 'COP',
        descripcion: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulamos delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Nuevo Item:', formData);

        if (onSubmit) {
            onSubmit({
                ...formData,
                id: Math.random().toString(36).substr(2, 9), // ID temporal
                precio: Number(formData.precio)
            });
        }

        setIsLoading(false);
        onClose();
        // Reset form
        setFormData({
            nombre: '',
            identificador: '',
            precio: '',
            unidad: 'Unidad',
            moneda: 'COP',
            descripcion: ''
        });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Nuevo Item</h2>
                    <p className={styles.description}>Ingresa los detalles del producto o servicio</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.half}>
                            <Input
                                label="Identificador (Código)"
                                placeholder="Ej: PROD-001"
                                value={formData.identificador}
                                onChange={(e) => setFormData({ ...formData, identificador: e.target.value })}
                                fullWidth
                                required
                            />
                        </div>
                        <div className={styles.half}>
                            <Input
                                label="Nombre del Item"
                                placeholder="Ej: Consultoría"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                fullWidth
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.half}>
                            <Input
                                label="Precio Unitario"
                                type="number"
                                placeholder="0.00"
                                value={formData.precio}
                                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                fullWidth
                                required
                            />
                        </div>
                        <div className={styles.half}>
                            {/* Select Manual con estilos custom */}
                            <div className={styles.selectGroup}>
                                <label className={styles.label}>Moneda</label>
                                <select
                                    className={styles.select}
                                    value={formData.moneda}
                                    onChange={(e) => setFormData({ ...formData, moneda: e.target.value })}
                                >
                                    <option value="COP">Peso Colombiano (COP)</option>
                                    <option value="USD">Dólar (USD)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.half}>
                            <div className={styles.selectGroup}>
                                <label className={styles.label}>Unidad de Medida</label>
                                <select
                                    className={styles.select}
                                    value={formData.unidad}
                                    onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                                >
                                    <option value="Unidad">Unidad (UND)</option>
                                    <option value="Servicio">Servicio (SER)</option>
                                    <option value="Hora">Hora (H)</option>
                                    <option value="Mes">Mes (M)</option>
                                    <option value="Kg">Kilogramo (KG)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <Textarea
                        label="Descripción"
                        placeholder="Detalles adicionales del item..."
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        fullWidth
                    />

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
                            {isLoading ? 'Guardando...' : 'Crear Item'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
