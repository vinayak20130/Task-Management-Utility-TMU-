// src/App.js
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const clientId = '781927388309-9424rc0fqhojghcqeud0b4p26pnmvop5.apps.googleusercontent.com';

  const { isAuthenticated } = useAuth();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Router basename="/98-gfgwb9cjgfhsdecj.southeastasia-01.azurewebsites.net">
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <Notes />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/notes" : "/login"} />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
