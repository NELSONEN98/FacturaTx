import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import styles from "./page.module.css"; // We might need to create this or use inline styles for simplicity given the constraints

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'var(--font-roboto)',
      gap: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Sistema de Facturación</h1>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <SignedOut>
          <SignInButton>
            <button style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#BE1129',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Iniciar Sesión
            </button>
          </SignInButton>
          <SignUpButton>
            <button style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #BE1129',
              backgroundColor: 'white',
              color: '#BE1129',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Registrarse
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>¡Bienvenido de nuevo!</span>
            <UserButton />
            <Link href="/dashboard" style={{
              marginTop: '1rem',
              padding: '10px 20px',
              textDecoration: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '8px'
            }}>
              Ir al Dashboard
            </Link>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
