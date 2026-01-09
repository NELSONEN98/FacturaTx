'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import CreateItemModal from './CreateItemModal';
import styles from './page.module.css';

// Inteface para los datos dummy
interface Item {
    id: string;
    nombre: string;
    identificador: string;
    precio: number;
    unidad: string;
    moneda: string;
    descripcion: string;
}

// Datos de ejemplo
const initialItems: Item[] = [
    {
        id: '1',
        nombre: 'Consultoría TI',
        identificador: 'SER-001',
        precio: 150000,
        unidad: 'Hora',
        moneda: 'COP',
        descripcion: 'Servicio de consultoría especializada en desarrollo de software'
    },
    {
        id: '2',
        nombre: 'Licencia Software Anual',
        identificador: 'LIC-2024',
        precio: 2500000,
        unidad: 'Unidad',
        moneda: 'COP',
        descripcion: 'Licencia anual para uso del sistema ERP'
    },
    {
        id: '3',
        nombre: 'Soporte Técnico Basic',
        identificador: 'SOP-BAS',
        precio: 80000,
        unidad: 'Mes',
        moneda: 'USD',
        descripcion: 'Soporte 8/5 vía email y chat'
    },
    {
        id: '4',
        nombre: 'Implementación Servidor',
        identificador: 'IMP-SRV',
        precio: 4500000,
        unidad: 'Proyecto',
        moneda: 'COP',
        descripcion: 'Configuración y despliegue de servidor dedicado'
    }
];

export default function ItemsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<Item[]>(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateItem = (newItem: Item) => {
        setItems([newItem, ...items]);
    };

    // Filtrar items
    const filteredItems = items.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.identificador.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Items</h1>
                <Button variant="create" onClick={() => setIsModalOpen(true)}>
                    + Nuevo Item
                </Button>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <Input
                        label=""
                        placeholder="Buscar por nombre o identificador..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Identificador</th>
                            <th>Precio Unitario</th>
                            <th>Unidad</th>
                            <th>Moneda</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td><strong>{item.nombre}</strong></td>
                                <td>{item.identificador}</td>
                                <td className={styles.price}>
                                    {new Intl.NumberFormat('es-CO', {
                                        style: 'currency',
                                        currency: item.moneda
                                    }).format(item.precio)}
                                </td>
                                <td>{item.unidad}</td>
                                <td>{item.moneda}</td>
                                <td className={styles.description} title={item.descripcion}>
                                    {item.descripcion}
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.actionBtn} title="Consultar">
                                            👁️
                                        </button>
                                        <button className={styles.actionBtn} title="Editar">
                                            ✏️
                                        </button>
                                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Eliminar">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredItems.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No se encontraron items.
                    </div>
                )}
            </div>

            <CreateItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateItem}
            />
        </div>
    );
}
