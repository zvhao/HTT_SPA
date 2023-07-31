// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  icon: icons.FontSizeOutlined,
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      url: '/typography',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'util-color',
      title: 'Color',
      url: '/color',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      url: '/shadow',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'ant-icons',
      title: 'Ant Icons',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
    },
  
  ]
};

export default utilities;
