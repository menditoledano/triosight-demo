import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { SignIn, SignUp, Dashboard, PatientCard, Statistics, Settings } from './pages';
import { ROUTES } from './constants';

function App() {
  // Simulated authentication state
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to={ROUTES.AUTH.SIGN_IN} replace />}
        >
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PATIENT.CARD} element={<PatientCard />} />
          <Route path={ROUTES.STATISTICS} element={<Statistics />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;