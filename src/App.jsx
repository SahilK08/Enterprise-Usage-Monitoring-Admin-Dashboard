import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';

// Placeholders for other pages
const Users = () => <div className="text-2xl font-bold p-10">Users Management</div>;
const Activity = () => <div className="text-2xl font-bold p-10">Activity Logs</div>;
const Settings = () => <div className="text-2xl font-bold p-10">System Settings</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="activity" element={<Activity />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
