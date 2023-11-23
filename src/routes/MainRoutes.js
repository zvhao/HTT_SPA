import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
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

// Service
const Service = Loadable(lazy(() => import('pages/service-packages/service/Service')));
const ServiceForm = Loadable(lazy(() => import('pages/service-packages/service/ServiceForm')));

// Service Type
const ServiceType = Loadable(lazy(() => import('pages/service-packages/service-type/ServiceType')));
const ServiceTypeForm = Loadable(lazy(() => import('pages/service-packages/service-type/ServiceTypeForm')));

// Course
const Course = Loadable(lazy(() => import('pages/service-packages/course/Course')));
const CourseForm = Loadable(lazy(() => import('pages/service-packages/course/CourseForm')));

// Combo
const Combo = Loadable(lazy(() => import('pages/service-packages/combo/Combo')));
const ComboForm = Loadable(lazy(() => import('pages/service-packages/combo/ComboForm')));

// HRM
const Staff = Loadable(lazy(() => import('pages/hrm/manager/Staff')));
const StaffForm = Loadable(lazy(() => import('pages/hrm/manager/StaffForm')));

// CRM
const Customer = Loadable(lazy(() => import('pages/crm/customer/Customer')));
const CustomerForm = Loadable(lazy(() => import('pages/crm/customer/CustomerForm')));

// Senior-manager
const Branch = Loadable(lazy(() => import('pages/branch/Branch')));
const BranchForm = Loadable(lazy(() => import('pages/branch/BranchForm')));

//calendar
const WorkSchedule = Loadable(lazy(() => import('pages/calendar/work-schedule/WorkSchedule')));
const LeaveSchedule = Loadable(lazy(() => import('pages/calendar/leave-schedule/LeaveSchedule')));

const CourseSchedule = Loadable(lazy(() => import('pages/calendar/course-schedule/CourseSchedule')));
const SellingCourseForm = Loadable(lazy(() => import('pages/calendar/course-schedule/SellingCourseForm')));

const TourSchedule = Loadable(lazy(() => import('pages/calendar/tour-schedule/TourSchedule')));
const TourForm = Loadable(lazy(() => import('pages/calendar/tour-schedule/TourForm')));

// budget
const PayBill = Loadable(lazy(() => import('pages/budget/pay-bill/PayBill')));
const PayBillForm = Loadable(lazy(() => import('pages/budget/pay-bill/PayBillForm')));

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
        }
      ]
    },
    {
      path: 'service-type',
      children: [
        {
          // path: '',
          index: true,
          element: <ServiceType />
        },
        {
          path: 'add',
          element: <ServiceTypeForm />
        },
        {
          path: 'edit/:id',
          element: <ServiceTypeForm />
        }
      ]
    },
    {
      path: 'course',
      children: [
        {
          // path: '',
          index: true,
          element: <Course />
        },
        {
          path: 'add',
          element: <CourseForm />
        },
        {
          path: 'edit/:id',
          element: <CourseForm />
        }
      ]
    },
    {
      path: 'combo',
      children: [
        {
          // path: '',
          index: true,
          element: <Combo />
        },
        {
          path: 'add',
          element: <ComboForm />
        },
        {
          path: 'edit/:id',
          element: <ComboForm />
        }
      ]
    },
    {
      path: Path.Staff,
      children: [
        {
          // path: '',
          index: true,
          element: <Staff />
        },
        {
          path: 'add',
          element: <StaffForm />
        },
        {
          path: 'edit/:id',
          element: <StaffForm />
        }
      ]
    },
    {
      path: Path.Customer,
      children: [
        { index: true, element: <Customer /> },
        {
          path: 'add',
          element: <CustomerForm />
        },
        {
          path: 'edit/:id',
          element: <CustomerForm />
        }
      ]
    },
    {
      path: Path.Branch,
      children: [
        {
          index: true,
          element: <Branch />
        },
        {
          path: 'add',
          element: <BranchForm />
        },
        {
          path: 'edit/:id',
          element: <BranchForm />
        }
      ]
    },
    { path: Path.WorkSchedule, children: [{ index: true, element: <WorkSchedule /> }] },
    { path: Path.LeaveSchedule, children: [{ index: true, element: <LeaveSchedule /> }] },
    {
      path: Path.TourSchedule,
      children: [
        { index: true, element: <TourSchedule /> },
        {
          path: 'add',
          element: <TourForm />
        },
        {
          path: 'edit/:id',
          element: <TourForm />
        }
      ]
    },
    {
      path: Path.CourseSchedule,
      children: [
        { index: true, element: <CourseSchedule /> },
        {
          path: 'add',
          element: <SellingCourseForm />
        },
        {
          path: 'edit/:id',
          element: <SellingCourseForm />
        }
      ]
    },
    {
      path: Path.PayBill,
      children: [
        { index: true, element: <PayBill /> },
        {
          path: 'add/:idBooking',
          element: <PayBillForm />
        },
        {
          path: 'add',
          element: <PayBillForm />
        },
        {
          path: 'edit/:id',
          element: <PayBillForm />
        }
      ]
    }
  ]
};

export default MainRoutes;
