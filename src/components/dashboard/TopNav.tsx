'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './TopNav.module.css';
import Navbar from './Navbar';

const modules = [
    {
        id: 'home',
        title: 'Inicio',
        path: '/dashboard',
        subModules: []
    },
    {
        id: 'wompi',
        title: 'Wompi',
        path: '/dashboard/wompi',
        subModules: [
            { title: 'Transacciones', path: '/dashboard/wompi/transactions' },
            { title: 'Configuración', path: '/dashboard/wompi/settings' }
        ]
    },
    {
        id: 'billing',
        title: 'Facturación',
        path: '/dashboard/billing',
        subModules: [
            { title: 'Items v2.1', path: '/dashboard/billing/items' },
            { title: 'Clientes v2.1', path: '/dashboard/billing/clients' },
            { title: 'Comprobantes v-2.1', path: '/dashboard/billing/vouchers' },
            { title: 'Cotizaciones', path: '/dashboard/billing/quotes' },
            { title: 'Transportistas', path: '/dashboard/billing/carriers' },
            { title: 'Rips', path: '/dashboard/billing/rips' }
        ]
    },
    {
        id: 'payroll',
        title: 'Nóminas',
        path: '/dashboard/payroll',
        subModules: [
            { title: 'Nómina Individual', path: '/dashboard/payroll/individual' },
            { title: 'Nómina de Ajuste', path: '/dashboard/payroll/adjustment' }
        ]
    },
    {
        id: 'support-docs',
        title: 'Doc. Soporte',
        path: '/dashboard/support-docs',
        subModules: []
    },
    {
        id: 'elec-support-docs',
        title: 'Doc. soporte electrónico',
        path: '/dashboard/elec-support-docs',
        subModules: []
    },
    {
        id: 'inbox',
        title: 'Buzón',
        path: '/dashboard/inbox',
        subModules: []
    },
    {
        id: 'new-voucher',
        title: 'Nuevo Comprobante',
        path: '/dashboard/vouchers/new',
        subModules: []
    },
    {
        id: 'buy-folios',
        title: 'Comprar Folios',
        path: '/dashboard/folios/buy',
        subModules: []
    }
];

export default function TopNav() {
    const pathname = usePathname();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Efecto para sincronizar el menú activo con la URL actual al cargar o navegar
    useEffect(() => {
        const foundModule = modules.find(m => pathname.startsWith(m.path) && m.id !== 'home');
        if (foundModule) {
            setActiveCategory(foundModule.id);
        } else if (pathname === '/dashboard') {
            setActiveCategory('home');
        }
    }, [pathname]);

    // Encontrar el módulo que corresponde a la categoría activa visualmente
    const activeModuleData = modules.find(m => m.id === activeCategory);

    return (
        <header className={styles.headerContainer}>
            {/* 1. Nivel Superior */}
            <div className={styles.primaryNav}>
                <div className={styles.leftSection}>
                    <Image
                        src="/images/logo-login.png"
                        alt="Factura Tech"
                        width={120}
                        height={36}
                        className={styles.logoImage}
                    />

                    <nav className={styles.navLinks}>
                        {modules.map((module) => {
                            const hasSubModules = module.subModules.length > 0;
                            const isActive = activeCategory === module.id;

                            if (hasSubModules) {
                                // Opción con submódulos: Botón que solo cambia el menú visible
                                return (
                                    <button
                                        key={module.id}
                                        onClick={() => setActiveCategory(module.id)}
                                        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                                        style={{ background: 'none', border: 'none', borderBottom: isActive ? '2px solid var(--primary-500)' : '2px solid transparent', cursor: 'pointer', fontFamily: 'inherit' }}
                                    >
                                        {module.title}
                                    </button>
                                );
                            } else {
                                // Opción simple: Link directo
                                return (
                                    <Link
                                        key={module.id}
                                        href={module.path}
                                        onClick={() => setActiveCategory(module.id)}
                                        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                                    >
                                        {module.title}
                                    </Link>
                                );
                            }
                        })}
                    </nav>
                </div>

                <div className={styles.userSection}>
                    <Navbar />
                </div>
            </div>

            {/* 2. Nivel Secundario (Barra de herramientas) */}
            {activeModuleData && activeModuleData.subModules.length > 0 && (
                <div className={styles.secondaryNav}>
                    {/* Fila del Título */}
                    <div className={styles.moduleTitleRow}>
                        <h2 className={styles.moduleTitle}>{activeModuleData.title}</h2>
                    </div>

                    {/* Fila de Links */}
                    <nav className={styles.secondaryLinksRow}>
                        {activeModuleData.subModules.map((sub, index) => {
                            const isSubActive = pathname === sub.path;
                            return (
                                <Link
                                    key={index}
                                    href={sub.path}
                                    className={`${styles.subLink} ${isSubActive ? styles.active : ''}`}
                                >
                                    {sub.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}
