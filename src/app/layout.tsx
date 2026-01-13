import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sistema de Facturación",
  description: "Sistema profesional de facturación y gestión de clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esES}
      signInUrl="/login"
      signUpUrl="/sign-up"
      appearance={{
        variables: {
          colorPrimary: '#BE1129',
          colorText: '#1A1D21',
          borderRadius: '0.5rem',
        },
        elements: {
          formButtonPrimary: {
            fontSize: '1rem',
            textTransform: 'none',
            height: '2.75rem',
            backgroundColor: '#BE1129',
            '&:hover': {
              backgroundColor: '#A00F22',
            }
          },
          formFieldInput: {
            height: '2.75rem',
            border: '1px solid #E2E8F0',
            '&:focus': {
              border: '1px solid #BE1129',
            }
          },
          card: {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E8F0',
          }
        }
      }}
    >
      <html lang="es">
        <body className={roboto.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
