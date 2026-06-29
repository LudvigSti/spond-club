import { FormDetails, FormData } from '../types'

interface Step1Props {
    selectedForm: FormDetails;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export function StepMemberType({ selectedForm, formData, setFormData }: Step1Props) {
    return (
        <div>
            <h3>Trinn 1: Velg din rolle/medlemstype</h3>
            {selectedForm.memberTypes.map(type => (
                <div key={type.id} className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="memberType"
                            value={type.id}
                            checked={formData.memberType === type.id}
                            onChange={(e) => setFormData({ ...formData, memberType: e.target.value })}
                            className="radio-input"
                        />
                        {type.name}
                    </label>
                </div>
            ))}
        </div>
    );
}

interface Step2Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export function StepInfo({ formData, setFormData }: Step2Props) {
    return (
        <div>
            <h3>Trinn 2: Din informasjon</h3>
            <div className="form-group">
                <label>Fornavn</label>
                <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
                <label>Etternavn</label>
                <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
                <label>E-post</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
                <label>Telefonnummer</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
                <label>Fødselsdato</label>
                <input type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} className="form-input" />
            </div>
        </div>
    );
}

interface Step3Props {
    selectedForm: FormDetails;
    formData: FormData;
}

export function StepPreview({ selectedForm, formData }: Step3Props) {
    return (
        <div>
            <h3>Trinn 3: Se over opplysningene dine</h3>
            <div className="preview-box">
                <p><strong>Klubb:</strong> {selectedForm.title}</p>
                <p><strong>Medlemstype:</strong> {selectedForm.memberTypes.find(t => t.id === formData.memberType)?.name}</p>
                <p><strong>Fornavn:</strong> {formData.firstName}</p>
                <p><strong>Etternavn:</strong> {formData.lastName}</p>
                <p><strong>E-post:</strong> {formData.email}</p>
                <p><strong>Telefon:</strong> {formData.phone}</p>
                <p><strong>Fødselsdato:</strong> {formData.birthDate}</p>
            </div>
        </div>
    );
}