export default function DashboardPage() {
    return (
        <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Bienvenido al Panel de Control
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
                Selecciona una opción del menú lateral para comenzar a gestionar tu facturación.
            </p>

            {/* Tarjetas de resumen simples para demostración */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                {['Ventas del Mes', 'Facturas Pendientes', 'Total Clientes', 'Productos Bajos en Stock'].map((item) => (
                    <div key={item} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid var(--border-color)'
                    }}>
                        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            {item}
                        </h3>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
                            ---
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
