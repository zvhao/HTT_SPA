// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  MenuOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Path } from 'constant/path';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  MenuOutlined,
  MenuUnfoldOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

// const branches = {
// 	id: 'branches',
// 	title: 'Quản lý chi nhánh',
// 	url: Path.Branch,
// 	icon: icons.MenuUnfoldOutlined,
// };
const seniorManager = {
  id: 'senior-manager',
  title: 'quản lý cấp cao',
  icon: icons.MenuUnfoldOutlined,
  children: [
    {
      id: 'branches',
      title: 'Quản lý chi nhánh',
      url: Path.Branch,
      icon: icons.MenuOutlined
    }
  ]
};

export default seniorManager;