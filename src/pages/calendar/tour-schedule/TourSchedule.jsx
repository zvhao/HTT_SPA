import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; // Import plugin danh sách
import interactionPlugin from '@fullcalendar/interaction';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Calendar } from '@fullcalendar/core';
import { useEffect, useRef, useState } from 'react';
import MainCard from 'components/MainCard';
import { Box, CardActions } from '@mui/material';
import { Form, Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Path } from 'constant/path';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { bookingApi } from 'api';
import { TourDetail } from './components';
import TourForm from './TourForm';
import 'dayjs/locale/en-gb';


const TourSchedule = () => {
  const navigation = useNavigate();

  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleSelect = (info) => {
  //   setSelectedDate(info.startStr); // Lấy ngày bắt đầu của khoảng thời gian lựa chọn
  // };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpenInfo, setDialogOpenInfo] = useState(false);
  const [isDialogOpenAdd, setDialogOpenAdd] = useState(false);
  const [selectStartTime, setSelectStartTime] = useState(null);
  const calendarRef = useRef(null);
  const [allTours, setAllTours] = useState([]);
  const [role, setRole] = useState('owner');

  useEffect(() => {
    const getAllTours = async () => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        const fetchData = await bookingApi.fetchData();
        const metadata = fetchData.metadata;
        let eventsData = [];
        metadata.map((e) =>
          eventsData.push({ ...e, title: e?.technician?.fullname || 'chưa có nhân viên', start: e.startTime, end: e.endTime })
        );
        setAllTours(eventsData);
        // console.log(eventsData);

        const calendarEl = calendarRef.current;
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
          locale: 'vi',
          initialView: 'listWeek',
          firstDay: 1,
          dayMaxEvents: true,
          weekNumbers: true,
          weekText: 'Tuần ',
          selectable: true,
          nowIndicator: true,
          navLinks: true,
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          views: {
            timeGrid: {
              slotDuration: '00:15:00'
            }
          },
          eventTimeFormat: { hour: 'numeric', minute: '2-digit' },
          buttonText: {
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            list: 'Lịch biểu'
          },
          eventClick: function (info) {
            const event = info.event;
            const filter = eventsData.filter((e) => e._id === event.extendedProps._id);
            // console.log(filter);
            setSelectedEvent(filter[0]);
            setDialogOpenInfo(true);
          },
          dateClick: function (info) {
            // console.log(info);
            // navigation(Path.TourSchedule + '/add', { replace: true });
            if (role && role === 'staff') {
              setSelectStartTime(info);
              setDialogOpenAdd(true);
            }
          },
          // select: function (info) {
          //   alert('selected ' + info.startStr + ' to ' + info.endStr);
          // },
          events: eventsData
        });
        calendar.render();

        return () => {
          calendar.destroy(); // Hủy bỏ đối tượng lịch khi component bị hủy
        };
      } catch (error) {
        console.error(error);
      }
    };
    getAllTours();
  }, []);

  return (
    <>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {role === 'staff' && (
          <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.TourSchedule + `/add`}>
            Tạo tour
          </Button>
        )}
      </CardActions>

      <Box sx={{ height: '100vh' }} ref={calendarRef}></Box>

      <Dialog open={isDialogOpenInfo} onClose={() => setDialogOpenInfo(false)} sx={{ '.MuiPaper-root': { width: '100%' } }}>
        <DialogTitle variant="h4">Chi tiết lịch hẹn</DialogTitle>
        <DialogContent>{selectedEvent && <TourDetail selectedEvent={selectedEvent} />}</DialogContent>
        <DialogActions>
          {role === 'staff' && (
            <Button
              sx={{ mr: 5 }}
              size="medium"
              variant="contained"
              component={Link}
              to={`${Path.TourSchedule}/edit/${selectedEvent?._id}`}
            >
              <EditIcon />
              vào trang Cập nhật
            </Button>
          )}

          <Button onClick={() => setDialogOpenInfo(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialogOpenAdd} onClose={() => setDialogOpenAdd(false)} sx={{ '.MuiPaper-root': { minWidth: '90%' } }}>
        <DialogTitle>Thêm lịch hẹn</DialogTitle>
        <DialogContent>
          <TourForm selectStartTime={selectStartTime} idDialog={selectedEvent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpenAdd(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TourSchedule;
