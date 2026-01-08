'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './page.module.css';
import HelpModal from './HelpModal';
import RegisterModal from './RegisterModal';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validación básica
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = 'El correo es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Correo inválido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Aquí irá la lógica de autenticación
        setIsLoading(true);

        // Simulación de llamada API
        setTimeout(() => {
            setIsLoading(false);
            // Por ahora redirigimos al dashboard
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundShapes}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
                <div className={styles.shape3}></div>
            </div>

            <div className={styles.loginCard}>
                <div className={styles.logoSection}>
                    <Image
                        src="/images/logo-login.png"
                        alt="Logo Factura Tech"
                        width={180}
                        height={60}
                        priority
                        className={styles.logo}
                    />


                    <p className={styles.title}>Inicia sesión</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Correo electrónico"
                        type="email"
                        placeholder="tu@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                        fullWidth
                        autoComplete="email"
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors.password}
                        fullWidth
                        autoComplete="current-password"
                    />

                    <div className={styles.actionRow}>
                        <label className={styles.rememberMe}>
                            <input type="checkbox" />
                            <span>Recuérdame</span>
                        </label>
                        <a href="#" className={styles.forgotPassword}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>
                        ¿No tienes cuenta?{' '}
                        <button
                            type="button"
                            className={styles.registerLink}
                            onClick={() => setIsRegisterModalOpen(true)}
                            style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
                        >
                            Regístrate aquí
                        </button>
                    </p>
                    <p>
                        ¿Necesitas asistencia?{' '}

                    </p>
                    <Button size="sm" onClick={() => setIsHelpModalOpen(true)}>
                        Solicitar ayuda
                    </Button>
                </div>
            </div>

            {/* Modales */}
            <HelpModal
                open={isHelpModalOpen}
                onOpenChange={setIsHelpModalOpen}
            />

            <RegisterModal
                open={isRegisterModalOpen}
                onOpenChange={setIsRegisterModalOpen}
            />
        </div>
    );
}
