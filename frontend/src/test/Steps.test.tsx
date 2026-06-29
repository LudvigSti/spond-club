import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepPreview } from '../components/Steps'
import { FormDetails, FormData } from '../types'

describe('StepPreview Component', () => {
    const mockForm: FormDetails = {
        id: 'test-club',
        title: 'Test Klubb',
        description: 'En testbeskrivelse',
        registrationDate: '2026-01-01T00:00:00Z',
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