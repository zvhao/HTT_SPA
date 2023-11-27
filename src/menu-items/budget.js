// import { CalendarOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Path } from 'constant/path';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
const budget = {
  id: 'budget',
  title: 'Quản lý ngân sách',
  icon: ReceiptIcon,
  children: [
    {
      id: 'payment',
      title: 'Hoá đơn thanh toán',
      url: Path.PayBill,
      icon: PaymentsIcon
    },
    {
      id: 'salary',
      title: 'Lương nhân viên',
      url: Path.Salary,
      icon: LocalAtmIcon
    }
  ]
};

export default budget;
