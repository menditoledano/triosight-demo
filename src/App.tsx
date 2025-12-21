import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ErrorBoundary, LoadingPage } from './components/common';
import { ROUTES } from './constants';
import { AuthProvider } from './context/AuthContext';
import { PatientsProvider } from './context/PatientsContext';
import { MetricsProvider } from './context/MetricsContext';

const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PatientCard = lazy(() => import('./pages/patient/PatientCard'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <AuthProvider>
                    <PatientsProvider>
                        <MetricsProvider>
                            <Suspense fallback={<LoadingPage />}>
                                <Routes>
                                    <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
                                    <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />

                                    <Route
                                        path="/"
                                        element={
                                            <ProtectedRoute>
                                                <Layout />
                                            </ProtectedRoute>
                                        }
                                    >
                                        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                                        <Route path={ROUTES.PATIENT.CARD} element={<PatientCard />} />
                                        <Route path={ROUTES.STATISTICS} element={<Statistics />} />
                                        <Route path={ROUTES.SETTINGS} element={<Settings />} />
                                    </Route>
                                </Routes>
                            </Suspense>
                        </MetricsProvider>
                    </PatientsProvider>
                </AuthProvider>
            </Router>
        </ErrorBoundary>
    );
}

export default App;