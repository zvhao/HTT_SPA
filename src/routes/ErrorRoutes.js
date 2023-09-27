import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - login
const Error403Page = Loadable(lazy(() => import('pages/error-pages/Error403Page')));
const Error404Page = Loadable(lazy(() => import('pages/error-pages/Error404Page')));

// ==============================|| AUTH ROUTING ||============================== //

const ErrorRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '403',
      element: <Error403Page />
    },
    {
      path: '*',
      element: <Error404Page />
    },
  ]
};

export default ErrorRoutes;
