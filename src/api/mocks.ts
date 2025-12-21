import { Patient, Strategy, ApiResponse, TokenResponse, User } from '@/types';

export const mockStrategies: Strategy[] = [
    {
        id: 'A',
        name: 'Strategy A',
        score: 8,
        mortalityRate: '2.5%',
        secondSurgeryRisk: '5.2%',
        complicationRisk: '8.1%',
        daysToRecovery: 45,
    },
    {
        id: 'B',
        name: 'Strategy B',
        score: 4,
        mortalityRate: '4.8%',
        secondSurgeryRisk: '12.5%',
        complicationRisk: '15.3%',
        daysToRecovery: 60,
    },
    {
        id: 'C',
        name: 'Strategy C',
        score: 6,
        mortalityRate: '3.2%',
        secondSurgeryRisk: '8.7%',
        complicationRisk: '11.2%',
        daysToRecovery: 52,
    },
];

export const mockPatients: Patient[] = [
    {
        id: '28391',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        age: 38,
        gender: 'Male',
        date: '14/06/21',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
        selectedStrategy: null,
        trioScore: null,
        dateOfBirth: '15 May 1985',
        bloodType: 'A+',
        height: "5'11\"",
        weight: '176 lbs',
        allergies: ['Penicillin'],
        medications: ['Aspirin', 'Metformin'],
    },
    {
        id: '28392',
        name: 'Esthera Jackson',
        email: 'esthera@gmail.com',
        age: 39,
        gender: 'Female',
        date: '14/06/21',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        selectedStrategy: null,
        trioScore: null,
    },
    {
        id: '28393',
        name: 'Alexa Liras',
        email: 'alexa@gmail.com',
        age: 27,
        gender: 'Female',
        date: '14/06/21',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        selectedStrategy: null,
        trioScore: null,
    },
    {
        id: '28394',
        name: 'Mendi Tolliver',
        email: 'freduardo@gmail.com',
        age: 42,
        gender: 'Male',
        date: '14/06/21',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        selectedStrategy: null,
        trioScore: null,
    },
];

export const mockUser: User = {
    id: '1',
    name: 'Prof. David Brown',
    email: 'david.brown@triosight.com',
    role: 'doctor',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
};

export class MockApiService {
    private delay(ms: number = 800): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async login(email: string, password: string): Promise<ApiResponse<{ token: TokenResponse; user: User }>> {
        await this.delay();

        if (email && password) {
            const response: ApiResponse<{ token: TokenResponse; user: User }> = {
                success: true,
                data: {
                    token: {
                        accessToken: 'mock-access-token-' + Date.now(),
                        refreshToken: 'mock-refresh-token-' + Date.now(),
                        expiresIn: 3600,
                    },
                    user: mockUser,
                },
                message: 'Login successful',
            };
            return response;
        }

        throw {
            success: false,
            message: 'Invalid credentials',
            statusCode: 401,
        };
    }

    public async register(name: string, email: string, password: string): Promise<ApiResponse<{ token: TokenResponse; user: User }>> {
        await this.delay();

        if (name && email && password) {
            const newUser: User = {
                ...mockUser,
                id: Date.now().toString(),
                name,
                email,
            };

            const response: ApiResponse<{ token: TokenResponse; user: User }> = {
                success: true,
                data: {
                    token: {
                        accessToken: 'mock-access-token-' + Date.now(),
                        refreshToken: 'mock-refresh-token-' + Date.now(),
                        expiresIn: 3600,
                    },
                    user: newUser,
                },
                message: 'Registration successful',
            };
            return response;
        }

        throw {
            success: false,
            message: 'Invalid registration data',
            statusCode: 400,
        };
    }

    public async getPatients(): Promise<ApiResponse<Patient[]>> {
        await this.delay();
        return {
            success: true,
            data: mockPatients,
        };
    }

    public async getPatient(id: string): Promise<ApiResponse<Patient>> {
        await this.delay();
        const patient = mockPatients.find(p => p.id === id);
        
        if (patient) {
            return {
                success: true,
                data: patient,
            };
        }

        throw {
            success: false,
            message: 'Patient not found',
            statusCode: 404,
        };
    }

    public async updatePatientStrategy(
        patientId: string,
        strategy: string,
        score?: number
    ): Promise<ApiResponse<Patient>> {
        await this.delay();
        const patient = mockPatients.find(p => p.id === patientId);
        
        if (patient) {
            return {
                success: true,
                data: {
                    ...patient,
                    selectedStrategy: strategy as Patient['selectedStrategy'],
                    trioScore: score !== undefined ? score : patient.trioScore,
                },
            };
        }

        throw {
            success: false,
            message: 'Patient not found',
            statusCode: 404,
        };
    }

    public async getStrategies(): Promise<ApiResponse<Strategy[]>> {
        await this.delay(300);
        return {
            success: true,
            data: mockStrategies,
        };
    }
}

export const mockApiService = new MockApiService();

