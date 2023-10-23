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
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
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
	icon: GroupsOutlinedIcon,
	children: [
		{
			id: 'staff-list',
			title: 'Nhân viên',
			url: 'staff',
			icon: ManageAccountsOutlinedIcon,
		},

	]
};

export default staff;
