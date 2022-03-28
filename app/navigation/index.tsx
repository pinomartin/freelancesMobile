import React from 'react';
import {AuthProvider} from '../context/AuthContext';
import Router from './Router';
export default function Providers() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
