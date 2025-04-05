import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NotificationPanel } from '@/components/NotificationPanel';
import { AppShell } from '@/components/layout/AppShell';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Inventory from '@/pages/Inventory';
import AddItem from '@/pages/AddItem';
import Cargo from '@/pages/Cargo';
import Waste from '@/pages/Waste';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Toaster />
          <NotificationPanel />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <AppShell>
                    <Outlet />
                  </AppShell>
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/add" element={<AddItem />} />
              <Route path="cargo" element={<Cargo />} />
              <Route path="waste" element={<Waste />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
