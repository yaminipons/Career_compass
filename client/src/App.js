import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import CareerDetail from './pages/CareerDetail';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import SkillGap from './pages/SkillGap';

// Protect routes that need login
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={
          <PrivateRoute><ProfileSetup /></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/career/:id" element={
          <PrivateRoute><CareerDetail /></PrivateRoute>
        } />
        <Route path="/skillgap" element={
          <PrivateRoute><SkillGap /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;