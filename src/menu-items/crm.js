import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Path } from 'constant/path';

const crm = {
  id: 'crm',
  title: 'Quản lý khách hàng',
  icon: GroupsOutlinedIcon,
  children: [
    {
      id: 'customer-list',
      title: 'Khách hàng',
      url: Path.Customer,
      icon: ManageAccountsOutlinedIcon
    }
  ]
};

export default crm;
