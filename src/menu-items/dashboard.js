// assets
import { AreaChartOutlined } from '@ant-design/icons';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
// icons
const icons = {
  AreaChartOutlined
};


// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Thống kê',
  icon: AnalyticsOutlinedIcon,
  children: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      url: '',
      icon: icons.AreaChartOutlined,
    }
  ]
};

export default dashboard;
