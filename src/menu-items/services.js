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
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';

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
	icon: SpaOutlinedIcon,
	children: [

		{
			id: 'ant-servicetype-icons',
			title: 'Loại dịch vụ',
			url: Path.ServiceType,
			icon: icons.MenuOutlined,
		},
		{
			id: 'ant-service-icons',
			title: 'Dịch vụ',
			url: Path.Service,
			icon: icons.MenuOutlined,
		},
		{
			id: 'ant-course-icons',
			title: 'Liệu trình',
			url: Path.Course,
			icon: icons.MenuOutlined,
		},
		{
			id: 'ant-combo-icons',
			title: 'Combos',
			url: Path.Combo,
			icon: icons.MenuOutlined,
		},
	]
};

export default services;
