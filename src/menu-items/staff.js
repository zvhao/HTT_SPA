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

const staff = {
	id: 'staff',
	title: 'Quản lý nhân sự',
	icon: icons.MenuUnfoldOutlined,
	children: [

		{
			id: 'staff-list',
			title: 'Nhân viên quản lý',
			url: 'staff',
			icon: icons.MenuOutlined,
		},

	]
};

export default staff;
