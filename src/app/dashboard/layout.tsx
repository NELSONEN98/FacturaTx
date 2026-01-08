import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import styles from './layout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar />

            <div className={styles.mainContentWrapper}>

                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
