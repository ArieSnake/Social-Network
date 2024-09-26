import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Profile/dashboard';
import { Settings } from './pages/Profile/settings';  
import { PasswordUpdate } from './pages/Profile/settings/password-update';
import { LoginUpdate } from './pages/Profile/settings/login-update';  

const routes = createBrowserRouter([
  {
    path: '',
    element: <Signup />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'profile',
    element: <Profile />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'settings',
        element: <Settings />,  
        children: [
          {
            path: 'password-update',
            element: <PasswordUpdate /> 
          },
          {
            path: 'login-update',
            element: <LoginUpdate />
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
