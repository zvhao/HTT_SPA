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
import { Link } from 'react-router-dom';
import { Path } from 'constant/path';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const validationSchema = yup.object({});
const TourSchedule = () => {
  const events = [
    {
      title: 'Sự kiện 1',
      start: '2023-11-09T10:00:00',
      end: '2023-11-09T11:30:00',
      staff: 'Thanh Thuong',
      service: '2'
    },
    {
      title: 'Sự kiện 2',
      start: '2023-11-10T14:00:00',
      end: '2023-11-10T16:00:00',
      staff: 'Thanh Thuong',
      service: '2'
    },
    {
      title: 'Sự kiện 3',
      start: '2023-11-11T09:00:00',
      end: '2023-11-11T11:00:00',
      staff: 'Thanh Thuong',
      service: '2'
    },
    {
      title: 'Sự kiện 4',
      start: '2023-11-11T10:00:00',
      end: '2023-11-11T11:00:00',
      staff: 'Thanh Thuong',
      service: '2'
    }
  ];

  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleSelect = (info) => {
  //   setSelectedDate(info.startStr); // Lấy ngày bắt đầu của khoảng thời gian lựa chọn
  // };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpenInfo, setDialogOpenInfo] = useState(false);
  const [isDialogOpenAdd, setDialogOpenAdd] = useState(false);
  const calendarRef = useRef(null);

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
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
        setSelectedEvent({ ...event.extendedProps, title: event.title, startStr: event.startStr, endStr: event.endStr });
        setDialogOpenInfo(true);
      },
      dateClick: function (info) {
        console.log(info);
        setDialogOpenAdd(true);
      },
      // select: function (info) {
      //   alert('selected ' + info.startStr + ' to ' + info.endStr);
      // },
      events: events
    });
    calendar.render();

    return () => {
      calendar.destroy(); // Hủy bỏ đối tượng lịch khi component bị hủy
    };
  }, []);

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      setSubmitting(false);
      handleSubmit(values);
    } catch (err) {
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon></AddIcon>} component={Link} to={Path.TourSchedule + `/add`}>
          Tạo tour
        </Button>
      </CardActions>

      <Box sx={{ height: '100vh' }} ref={calendarRef}></Box>

      <Dialog open={isDialogOpenInfo} onClose={() => setDialogOpenInfo(false)}>
        <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div>
              <DialogContentText>Tên: {selectedEvent.title}</DialogContentText>
              <DialogContentText>Thời gian bắt đầu: {selectedEvent.startStr}</DialogContentText>
              <DialogContentText>Thời gian kết thúc: {selectedEvent.endStr}</DialogContentText>
              <DialogContentText>Nhân viên: {selectedEvent.staff}</DialogContentText>
              <DialogContentText>Dịch vụ: {selectedEvent.service}</DialogContentText>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpenInfo(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialogOpenAdd} onClose={() => setDialogOpenAdd(false)}>
        <DialogTitle>Thêm lịch hẹn</DialogTitle>
        <DialogContent>
          <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isSubmitting} variant="contained">
                  <span>Gửi</span>
                </LoadingButton>
              </Form>
            )}
          </Formik>
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
