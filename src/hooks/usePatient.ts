import { useState, useCallback } from 'react';
import { patientService } from '@/services/patient.service';
import type { Patient } from '@/types';

export const usePatient = (patientId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [patient, setPatient] = useState<Patient | null>(null);

    const fetchPatientData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await patientService.getPatient(patientId);
            setPatient(data);
        } catch (err) {
            setError('Failed to fetch patient data');
        } finally {
            setIsLoading(false);
        }
    }, [patientId]);

    return {
        isLoading,
        error,
        patient,
        fetchPatientData,
    };
};