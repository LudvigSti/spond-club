import { FormDetails } from '../types'

interface Props {
    allForms: FormDetails[];
    onSelectForm: (form: FormDetails) => void;
}

export function ClubSelector({ allForms, onSelectForm }: Props) {
    return (
        <div className="wizard-container">
            <header className="wizard-header">
                <h1>Spond Club Portalen</h1>
                <p>Velg en klubb eller et arrangement nedenfor for å starte registreringsveiviseren.</p>
            </header>
            <div style={{ marginTop: '20px' }}>
                {allForms.map(form => {
                    const isFuture = new Date(form.registrationDate) > new Date();
                    return (
                        <div key={form.id} className="radio-label" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1, paddingRight: '10px' }}>
                                <h4 style={{ margin: '0 0 5px 0' }}>{form.title}</h4>
                                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                                    {isFuture
                                        ? `🔴 Åpner ${new Date(form.registrationDate).toLocaleDateString('no-NO')}`
                                        : '🟢 Åpen for påmelding'}
                                </p>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ margin: 0, padding: '8px 16px', fontSize: '13px' }}
                                onClick={() => onSelectForm(form)}
                            >
                                {isFuture ? 'Se info' : 'Registrer meg'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}