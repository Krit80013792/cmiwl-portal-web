'use client';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function LoadingComponent() {
    return (
        <div className="spinner-container">
            <ProgressSpinner aria-label="Loading" style={{ width: '100px', height: '100px' }} />
            <strong>Loading...</strong>
        </div>
    );
}
