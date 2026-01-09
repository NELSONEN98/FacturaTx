import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
    ({ className = '', fullWidth = false, ...props }, ref) => {
        return (
            <div className={styles.container} style={{ width: fullWidth ? '100%' : 'auto' }}>
                <input
                    ref={ref}
                    type="text"
                    className={`${styles.input} ${className}`}
                    {...props}
                />

                {/* SVG Lupa - Icono de Búsqueda */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.searchIcon}
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        );
    }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
