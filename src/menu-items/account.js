// assets
import { AreaChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined
};

// ==============================|| MENU ITEMS - account ||============================== //

const account = {
  id: 'group-account',
  title: 'Tài khoản người dùng',
  icon: icons.AreaChartOutlined,
  children: [
    {
      id: 'manager-account',
      title: 'Tài khoản quản lý',
      url: '/',
      icon: icons.AreaChartOutlined,
    }
  ]
};

export default account;
