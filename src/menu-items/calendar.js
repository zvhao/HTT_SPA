import { CalendarOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Path } from 'constant/path';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const calendar = {
  id: 'calendar',
  title: 'Quản lý lịch biểu',
  icon: CalendarMonthIcon,
  children: [
    {
      id: 'work-schedule',
      title: 'Lịch làm việc',
      url: Path.WorkSchedule,
      icon: CalendarTodayOutlinedIcon
    },
    {
      id: 'work-schedule',
      title: 'Lịch làm việc',
      url: Path.WorkSchedule,
      icon: CalendarTodayOutlinedIcon
    },
    {
      id: 'work-schedule',
      title: 'Lịch làm việc',
      url: Path.WorkSchedule,
      icon: CalendarTodayOutlinedIcon
    }
  ]
};

export default calendar;
