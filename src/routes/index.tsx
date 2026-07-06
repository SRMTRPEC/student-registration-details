import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { LandingPage } from '../pages/LandingPage';
import { StudentAccess } from '../pages/StudentAccess';
import { AdminLogin } from '../pages/AdminLogin';
import { StudentDashboard } from '../pages/StudentDashboard';
import { FirstYearDataForm } from '../pages/FirstYearDataForm';
import { SuccessPage } from '../pages/SuccessPage';
import { AdminDashboard } from '../pages/AdminDashboard';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'access', element: <StudentAccess /> },
      { path: 'admin/login', element: <AdminLogin /> },
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'form/first-year-data', element: <FirstYearDataForm /> },

      { path: 'form/success', element: <SuccessPage /> },
      { path: 'admin/dashboard', element: <AdminDashboard /> },
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
