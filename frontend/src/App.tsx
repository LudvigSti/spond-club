import { useState, useEffect } from 'react'
import axios from 'axios'
import { FormDetails } from './types'
import { ClubSelector } from './components/ClubSelector'
import { WizardForm } from './components/WizardForm'
import './App.css'

function App() {
    const [allForms, setAllForms] = useState<FormDetails[]>([]);
    const [selectedForm, setSelectedForm] = useState<FormDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/forms')
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setAllForms(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch club data from server.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="wizard-container">Loading Spond Club...</div>;
    if (error) return <div className="wizard-container error-banner">{error}</div>;

    if (!selectedForm) {
        return <ClubSelector allForms={allForms} onSelectForm={setSelectedForm} />;
    }

    const isFuture = new Date(selectedForm.registrationOpens) > new Date();
    if (isFuture) {
        return (
            <div className="wizard-container" style={{ textAlign: 'center' }}>
                <div className="error-banner" style={{ backgroundColor: '#fff9e6', color: '#b78103', border: '1px solid #ffcc00' }}>
                    <h2>Registration has not opened yet</h2>
                    <p>The form for <strong>{selectedForm.title}</strong> opens on: <strong>{new Date(selectedForm.registrationOpens).toLocaleDateString('no-NO')}</strong>.</p>
                </div>
                <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={() => setSelectedForm(null)}>
                    Back to Overview
                </button>
            </div>
        );
    }

    return <WizardForm selectedForm={selectedForm} onBackToCancel={() => setSelectedForm(null)} />;
}

export default App;