// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  icon: icons.LoginOutlined,
  children: [
    {
      id: 'login1',
      title: 'Đăng nhập',
      url: '/login',
      icon: icons.LoginOutlined,
    },
    {
      id: 'register1',
      title: 'Đăng ký',
      url: '/register',
      icon: icons.ProfileOutlined,
    }
  ]
};

export default pages;
