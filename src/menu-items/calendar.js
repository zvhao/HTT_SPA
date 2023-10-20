import { CalendarOutlined, MenuOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Path } from "constant/path";

const calendar = {
  id: 'calendar',
  title: 'Quản lý lịch biểu',
  icon: MenuUnfoldOutlined,
  children: [
    {
        id: 'work-schedule',
        title: 'Lịch làm việc',
        url: Path.WorkSchedule,
        icon: CalendarOutlined
    }
  ]
};

export default calendar;
