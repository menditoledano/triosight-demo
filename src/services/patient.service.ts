import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { mockApiService } from '@/api/mocks';
import { Patient, Strategy, ApiResponse, StrategyType } from '@/types';
import { env } from '@/config/env';

class PatientService {
    private useMockApi = env.useMockApi;

    async getPatients(): Promise<Patient[]> {
        try {
            let response: ApiResponse<Patient[]>;

            if (this.useMockApi) {
                response = await mockApiService.getPatients();
            } else {
                response = await apiClient.get<Patient[]>(API_ENDPOINTS.PATIENTS.LIST);
            }

            return response.data;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }

    async getPatient(id: string): Promise<Patient> {
        try {
            let response: ApiResponse<Patient>;

            if (this.useMockApi) {
                response = await mockApiService.getPatient(id);
            } else {
                response = await apiClient.get<Patient>(API_ENDPOINTS.PATIENTS.GET(id));
            }

            return response.data;
        } catch (error) {
            console.error('Error fetching patient:', error);
            throw error;
        }
    }

    async updatePatientStrategy(
        patientId: string,
        strategy: StrategyType,
        score?: number
    ): Promise<Patient> {
        try {
            let response: ApiResponse<Patient>;

            if (this.useMockApi) {
                response = await mockApiService.updatePatientStrategy(
                    patientId,
                    strategy || '',
                    score
                );
            } else {
                response = await apiClient.patch<Patient>(
                    API_ENDPOINTS.PATIENTS.UPDATE_STRATEGY(patientId),
                    { strategy, score }
                );
            }

            return response.data;
        } catch (error) {
            console.error('Error updating patient strategy:', error);
            throw error;
        }
    }

    async getStrategies(): Promise<Strategy[]> {
        try {
            let response: ApiResponse<Strategy[]>;

            if (this.useMockApi) {
                response = await mockApiService.getStrategies();
            } else {
                response = await apiClient.get<Strategy[]>('/strategies');
            }

            return response.data;
        } catch (error) {
            console.error('Error fetching strategies:', error);
            throw error;
        }
    }
}

export const patientService = new PatientService();