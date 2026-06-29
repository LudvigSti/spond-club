import { useState } from 'react'
import axios from 'axios'
import { FormDetails, FormData } from '../types'
import { StepMemberType, StepInfo, StepPreview } from './Steps'

interface Props {
    selectedForm: FormDetails;
    onBackToCancel: () => void;
}

export function WizardForm({ selectedForm, onBackToCancel }: Props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        formId: selectedForm.id,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        memberType: ''
    });

    const handleNextStep = () => {
        setValidationError(null);
        if (currentStep === 1 && !formData.memberType) {
            setValidationError('Du må velge en medlemstype for å gå videre.');
            return;
        }
        if (currentStep === 2) {
            if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.birthDate) {
                setValidationError('Alle felt må fylles ut.');
                return;
            }
            if (!formData.email.includes('@')) {
                setValidationError('Vennligst oppgi en gyldig e-postadresse.');
                return;
            }
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleSubmit = () => {
        setValidationError(null);
        const dataToSend = {
            formId: formData.formId,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email,
            phone: formData.phone,
            birthDate: formData.birthDate,
            memberType: formData.memberType
        };

        axios.post('http://localhost:8080/api/submit', dataToSend)
            .then(() => setSuccess(true))
            .catch(err => setValidationError(err.response?.data?.error || 'Noe gikk galt under lagring.'));
    };

    if (success) {
        return (
            <div className="success-container">
                <h2>🎉 Registrering fullført!</h2>
                <p>Takk skal du ha, <strong>{formData.firstName}</strong>. Du er nå registrert i <strong>{selectedForm.title}</strong>.</p>
                <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={onBackToCancel}>
                    Tilbake til forsiden
                </button>
            </div>
        );
    }

    return (
        <div className="wizard-container">
            <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px', marginBottom: '15px' }} onClick={onBackToCancel}>
                ← Avbryt og gå tilbake
            </button>

            <header className="wizard-header">
                <h1>{selectedForm.title}</h1>
                <p>{selectedForm.description}</p>
                <div className="wizard-step-indicator">Steg {currentStep} av 3</div>
            </header>

            {validationError && <div className="error-banner">{validationError}</div>}

            <form onSubmit={(e) => e.preventDefault()}>
                {currentStep === 1 && <StepMemberType selectedForm={selectedForm} formData={formData} setFormData={setFormData} />}
                {currentStep === 2 && <StepInfo formData={formData} setFormData={setFormData} />}
                {currentStep === 3 && <StepPreview selectedForm={selectedForm} formData={formData} />}

                <div className="button-group">
                    {currentStep > 1 && (
                        <button type="button" onClick={() => setCurrentStep(prev => prev - 1)} className="btn btn-secondary">
                            Tilbake
                        </button>
                    )}
                    {currentStep < 3 ? (
                        <button type="button" onClick={handleNextStep} className="btn btn-primary">
                            Neste
                        </button>
                    ) : (
                        <button type="button" onClick={handleSubmit} className="btn btn-success">
                            Send inn registrering
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}