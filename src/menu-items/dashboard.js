// assets
import { AreaChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Thống kê',
  icon: icons.AreaChartOutlined,
  children: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      url: '/dashboard/default',
      icon: icons.AreaChartOutlined,
    }
  ]
};

export default dashboard;
