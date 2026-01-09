import TopNav from '@/components/dashboard/TopNav';
import styles from './layout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.dashboardContainer}>
            <TopNav />

            <div className={styles.mainContentWrapper}>

                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
