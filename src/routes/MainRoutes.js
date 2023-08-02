import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ServiceDetail from 'pages/service-packages/service/ServiceDetail';
import { Path } from 'constant/path';


// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Service = Loadable(lazy(() => import('pages/service-packages/service/Service')));
const ServiceForm = Loadable(lazy(() => import('pages/service-packages/service/ServiceForm')));
const ServiceType = Loadable(lazy(() => import('pages/service-packages/service-type/ServiceType')));
const Course = Loadable(lazy(() => import('pages/service-packages/course/Course')));
const Combo = Loadable(lazy(() => import('pages/service-packages/combo/Combo')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: Path.Service,
      children: [
        {
          // path: '',
          index: true,
          element: <Service />
        },
        {
          path: 'add',
          element: <ServiceForm />
        },
        {
          path: 'edit/:id',
          element: <ServiceForm />
        },
      ]
    },
    {
      path: 'service-type',
      element: <ServiceType />
    },
    {
      path: 'course',
      element: <Course />
    },
    {
      path: 'combo',
      element: <Combo />
    },
    {
      path: Path.ServiceDetail + ':slug',
      element: <ServiceDetail />
    },
    {
      path: Path.ServiceDetail + ':slug',
      element: <ServiceDetail />
    },
  ]
};

export default MainRoutes;
