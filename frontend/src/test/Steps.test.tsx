import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepPreview } from '../components/Steps'
import { FormDetails, FormData } from '../types'

describe('StepPreview Component', () => {
    const mockForm: FormDetails = {
        clubId: 'britsport',
        formId: 'B171388180BC457D9887AD92B6CCFC86', // FIX: Added formId
        title: 'Test Club',
        description: 'A test description',
        registrationOpens: '2026-01-01T00:00:00Z', // FIX: Changed from registrationDate
        memberTypes: [{ id: 'player', name: 'Spiller' }]
    }

    const mockData: FormData = {
        formId: 'test-club',
        firstName: 'Ludvig',
        lastName: 'Sti',
        email: 'ludvig@spond.com',
        phone: '12345678',
        birthDate: '2000-01-01',
        memberType: 'player'
    }

    it('displays the correct user data in the preview box', () => {
        render(<StepPreview selectedForm={mockForm} formData={mockData} />)

        expect(screen.getByText('Ludvig')).toBeInTheDocument()
        expect(screen.getByText('Sti')).toBeInTheDocument()
        expect(screen.getByText('ludvig@spond.com')).toBeInTheDocument()
        expect(screen.getByText('Spiller')).toBeInTheDocument()
    })
})