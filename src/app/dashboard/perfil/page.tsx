import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
            <UserProfile
                path="/dashboard/perfil"
                routing="path"
                appearance={{
                    elements: {
                        rootBox: {
                            width: '100%',
                            boxShadow: 'none',
                        },
                        card: {
                            boxShadow: 'var(--shadow-md)',
                            border: '1px solid var(--border-color)',
                            width: '100%',
                        }
                    }
                }}
            />
        </div>
    );
}
