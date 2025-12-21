import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { patientService } from '@/services/patient.service';
import { Patient, Strategy, StrategyType } from '@/types';

export type { StrategyType };

interface PatientsContextType {
    patients: Patient[];
    strategies: Strategy[];
    isLoading: boolean;
    error: string | null;
    getPatientById: (id: string) => Patient | undefined;
    updatePatientStrategy: (patientId: string, strategy: StrategyType, score?: number) => Promise<void>;
    refreshPatients: () => Promise<void>;
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

export function PatientsProvider({ children }: { children: ReactNode }) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const [patientsData, strategiesData] = await Promise.all([
                patientService.getPatients(),
                patientService.getStrategies(),
            ]);
            setPatients(patientsData);
            setStrategies(strategiesData);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
            setError(errorMessage);
            console.error('Error loading initial data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshPatients = useCallback(async () => {
        try {
            const patientsData = await patientService.getPatients();
            setPatients(patientsData);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to refresh patients';
            setError(errorMessage);
            console.error('Error refreshing patients:', err);
        }
    }, []);

    const getPatientById = useCallback((id: string): Patient | undefined => {
        return patients.find((p) => p.id === id);
    }, [patients]);

    const updatePatientStrategy = useCallback(async (
        patientId: string,
        strategy: StrategyType,
        score?: number
    ) => {
        try {
            const updatedPatient = await patientService.updatePatientStrategy(
                patientId,
                strategy,
                score
            );

            setPatients((prevPatients) =>
                prevPatients.map((p) => (p.id === patientId ? updatedPatient : p))
            );
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update strategy';
            setError(errorMessage);
            console.error('Error updating patient strategy:', err);
            throw err;
        }
    }, []);

    return (
        <PatientsContext.Provider
            value={{
                patients,
                strategies,
                isLoading,
                error,
                getPatientById,
                updatePatientStrategy,
                refreshPatients,
            }}
        >
            {children}
        </PatientsContext.Provider>
    );
}

export function usePatients() {
    const context = useContext(PatientsContext);
    if (context === undefined) {
        throw new Error('usePatients must be used within a PatientsProvider');
    }
    return context;
}


