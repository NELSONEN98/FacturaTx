'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import CreateClientModal from './CreateClientModal';
import styles from './page.module.css';

// Interfaz Cliente
interface Client {
    id: string;
    nombre: string;
    nit: string;
    email: string;
    telefono: string;
    celular: string;
    fechaRegistro: string;
}

// Datos de ejemplo
const initialClients: Client[] = [
    {
        id: '1',
        nombre: 'Tech Solutions SAS',
        nit: '900.123.456-1',
        email: 'contacto@techsolutions.com',
        telefono: '6012345678',
        celular: '3001234567',
        fechaRegistro: '2023-01-15'
    },
    {
        id: '2',
        nombre: 'Distribuidora El Eje',
        nit: '800.987.654-3',
        email: 'ventas@eleje.com',
        telefono: '6068765432',
        celular: '3109876543',
        fechaRegistro: '2023-05-20'
    },
    {
        id: '3',
        nombre: 'Consultorios Médicos del Norte',
        nit: '901.555.333-8',
        email: 'admin@cmn.com',
        telefono: '6013334444',
        celular: '3205556666',
        fechaRegistro: '2023-11-10'
    },
    {
        id: '4',
        nombre: 'Juan Pérez Arquitectos',
        nit: '79.123.456',
        email: 'juan.perez@arq.com',
        telefono: 'N/A',
        celular: '3151112222',
        fechaRegistro: '2024-01-05'
    }
];

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateClient = (newClient: Client) => {
        setClients([newClient, ...clients]);
    };

    // Filtrar clientes
    const filteredClients = clients.filter(client =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.nit.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Clientes</h1>
                <Button variant="create" onClick={() => setIsModalOpen(true)}>
                    + Nuevo Cliente
                </Button>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <Input
                        label=""
                        placeholder="Buscar por nombre, NIT o email..."
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
                            <th>NIT/CC</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Celular</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td><strong>{client.nombre}</strong></td>
                                <td>{client.nit}</td>
                                <td>{client.email}</td>
                                <td>{client.telefono}</td>
                                <td>{client.celular}</td>
                                <td>{client.fechaRegistro}</td>
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

                {filteredClients.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No se encontraron clientes.
                    </div>
                )}
            </div>

            <CreateClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateClient}
            />
        </div>
    );
}
