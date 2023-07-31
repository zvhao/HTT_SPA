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

const services = {
	id: 'services',
	title: 'Quản lý dịch vụ',
	icon: icons.MenuUnfoldOutlined,
	children: [

		{
			id: 'ant-servicetype-icons',
			title: 'Loại dịch vụ',
			url: '/servicetype',
			icon: icons.MenuOutlined,
		},
		{
			id: 'ant-service-icons',
			title: 'Dịch vụ',
			url: '/service',
			icon: icons.MenuOutlined,
		},
		{
			id: 'ant-course-icons',
			title: 'Liệu trình',
			url: '/course',
			icon: icons.MenuOutlined,
		},
		{
			id: 'ant-combo-icons',
			title: 'Combos',
			url: '/combo',
			icon: icons.MenuOutlined,
		},
	]
};

export default services;
