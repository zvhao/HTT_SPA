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
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';

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
  title: 'Quản lý cấp cao',
  icon: BusinessOutlinedIcon,
  children: [
    {
      id: 'branches',
      title: 'Quản lý chi nhánh',
      url: Path.Branch,
      icon: AddBusinessOutlinedIcon
    }
  ]
};

export default seniorManager;
