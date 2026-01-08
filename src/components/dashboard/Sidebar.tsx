'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import Navbar from '@/components/dashboard/Navbar';


const modules = [
    {
        id: 'home',
        title: 'Inicio',

        path: '/dashboard',
        subModules: [] // Sin submódulos
    },
    {
        id: 'configuracion',
        title: 'Configuración',

        subModules: [
            { title: 'Nueva Factura', path: '/dashboard/configuracion/new' },
            { title: 'Historial', path: '/dashboard/configuracion/history' },
            { title: 'Presupuestos', path: '/dashboard/configuracion/quotes' }
        ]
    },
    {
        id: 'clients',
        title: 'Clientes',

        subModules: [
            { title: 'Lista de Clientes', path: '/dashboard/clients' },
            { title: 'Nuevo Cliente', path: '/dashboard/clients/new' },
            { title: 'Grupos', path: '/dashboard/clients/groups' }
        ]
    },
    {
        id: 'inventory',
        title: 'Inventario',

        subModules: [
            { title: 'Productos', path: '/dashboard/inventory/products' },
            { title: 'Servicios', path: '/dashboard/inventory/services' },
            { title: 'Categorías', path: '/dashboard/inventory/categories' }
        ]
    },
    {
        id: 'reports',
        title: 'Reportes',

        subModules: [
            { title: 'Ventas', path: '/dashboard/reports/sales' },
            { title: 'Impuestos', path: '/dashboard/reports/taxes' },
            { title: 'Rendimiento', path: '/dashboard/reports/performance' }
        ]
    },
    {
        id: 'settings',
        title: 'Configuración',

        subModules: [
            { title: 'Empresa', path: '/dashboard/settings/company' },
            { title: 'Usuarios y Permisos', path: '/dashboard/settings/users' },
            { title: 'Preferencias', path: '/dashboard/settings/preferences' }
        ]
    },
    {
        id: 'help',
        title: 'Ayuda',

        subModules: [
            { title: 'Documentación', path: '/dashboard/help/docs' },
            { title: 'Soporte', path: '/dashboard/help/support' }
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    // Estado para controlar qué menús están abiertos (array de IDs)
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (id: string) => {
        setOpenMenus(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id) // Cerrar si ya está abierto
                : [...prev, id] // Abrir (permitiendo múltiples abiertos)
        );
    };

    return (
        <aside className={styles.sidebar}>
            <Navbar />

            <nav className={styles.nav}>
                {modules.map((module) => {
                    const hasSubModules = module.subModules.length > 0;
                    const isOpen = openMenus.includes(module.id);
                    // Verificar si algún hijo está activo para marcar el padre
                    const isChildActive = module.subModules.some(sub => pathname === sub.path);
                    const isActive = pathname === module.path || isChildActive;

                    return (
                        <div key={module.id} className={styles.menuItem}>
                            {hasSubModules ? (
                                <>
                                    <button
                                        className={`${styles.menuButton} ${isActive ? styles.active : ''}`}
                                        onClick={() => toggleMenu(module.id)}
                                    >
                                        <div className={styles.menuButtonContent}>
                                            <span className={styles.icon}>{module.icon}</span>
                                            <span>{module.title}</span>
                                        </div>
                                        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>▼</span>
                                    </button>

                                    <div className={`${styles.subMenu} ${isOpen ? styles.open : ''}`}>
                                        {module.subModules.map((sub, index) => (
                                            <Link
                                                key={index}
                                                href={sub.path}
                                                className={styles.subMenuItem}
                                                style={{
                                                    color: pathname === sub.path ? 'var(--primary-600)' : 'inherit',
                                                    fontWeight: pathname === sub.path ? 600 : 400
                                                }}
                                            >
                                                {sub.title}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={module.path}
                                    className={`${styles.menuButton} ${pathname === module.path ? styles.active : ''}`}
                                >
                                    <div className={styles.menuButtonContent}>
                                        <span className={styles.icon}>{module.icon}</span>
                                        <span>{module.title}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
