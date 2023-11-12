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
import { bookingApi } from 'api';

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
  const dt = [
    {
      _id: '6550eeec06b76f437af4c037',
      services: [
        {
          _id: '6550d2591acac3ae3f2c5e5a',
          code: 'DV013',
          name: 'Tư vấn - tự do',
          price: 100000,
          duration: 15,
          service_types: [],
          combos: [],
          courses: [],
          consultingCommission: 0,
          technicianCommission: 0,
          desc: '',
          deleted: false,
          createdAt: '2023-11-12T13:25:45.149Z',
          updatedAt: '2023-11-12T13:25:45.149Z'
        }
      ],
      status: 1,
      branch: {
        deleted: false,
        _id: '650007e9c31b396b0f6ef13d',
        name: 'HTT SPA',
        code: 'CN01',
        address: 'đường NVC, Ninh Kiều, CT',
        desc: 'Chi nhánh 1',
        capacity: 10,
        manager: '6506d038cc31547056777718',
        startTime: '09:00',
        endTime: '20:00',
        staffs: [],
        courses: [],
        combos: [],
        services: [],
        createdAt: '2023-09-12T06:40:41.693Z',
        updatedAt: '2023-09-12T06:40:41.693Z'
      },
      date: '2023-11-13T00:00:00.000Z',
      startTime: '2023-11-13T02:00:00.000Z',
      endTime: '2023-11-13T03:00:00.000Z',
      technician: {},
      note: '',
      customerInfo: [
        {
          name: 'Nguyễn Văn Hào',
          gender: 'nam'
        }
      ],
      account: {},
      customersNumber: 1,
      deleted: false,
      createdAt: '2023-11-12T15:27:40.016Z',
      updatedAt: '2023-11-12T15:27:40.016Z',
      start: '2023-11-13T02:00:00',
      end: '2023-11-13T03:00:00'
    },
    {
      _id: '6550ef4606b76f437af4c2ed',
      services: [
        {
          _id: '6521051807cd75734a63ee6a',
          code: 'DV01',
          name: 'Gội đầu thư giãn',
          price: 49000,
          duration: 30,
          service_types: [],
          combos: [],
          courses: [],
          consultingCommission: 0,
          technicianCommission: 10,
          desc: '<p>Gội đầu thường thư giãn 30p</p><p class="ql-align-center ql-indent-1"><img src="https://i.ibb.co/Ln7XH5z/goi-dau.jpg" width="416" style=""></p>',
          deleted: false,
          createdAt: '2023-10-07T07:13:28.958Z',
          updatedAt: '2023-10-14T10:42:44.989Z'
        },
        {
          _id: '6527f925f2dfbd5d58baac09',
          code: 'DV006',
          name: 'Body thư giãn gói 1',
          price: 179000,
          duration: 40,
          service_types: [],
          combos: [],
          courses: [],
          consultingCommission: 0,
          technicianCommission: 10,
          desc: '',
          deleted: false,
          createdAt: '2023-10-12T13:48:21.801Z',
          updatedAt: '2023-10-13T13:23:08.708Z'
        }
      ],
      status: 1,
      branch: {
        deleted: false,
        _id: '650007e9c31b396b0f6ef13d',
        name: 'HTT SPA',
        code: 'CN01',
        address: 'đường NVC, Ninh Kiều, CT',
        desc: 'Chi nhánh 1',
        capacity: 10,
        manager: '6506d038cc31547056777718',
        startTime: '09:00',
        endTime: '20:00',
        staffs: [],
        courses: [],
        combos: [],
        services: [],
        createdAt: '2023-09-12T06:40:41.693Z',
        updatedAt: '2023-09-12T06:40:41.693Z'
      },
      date: '2023-11-16T00:00:00.000Z',
      startTime: '2023-11-16T02:00:00.000Z',
      endTime: '2023-11-16T03:25:00.000Z',
      technician: {
        _id: '651917c7af5d6ef8a25fc0e8',
        fullname: 'Huynh Thanh Thuong',
        username: 'cn01ktv02',
        phone: '0939410692',
        email: 'huynhthanhthuong0910@gmail.com',
        address: 'Can Tho',
        numPaidLeave: 2,
        basicSalary: 4000000,
        position: 'technicians',
        password: '$2b$10$Iu07XlWwYKRoNegE8z3TKeSZlIvskBUYAGFWVHTeb0Gw2eI1umppi',
        consultingCommission: 10,
        serviceCommission: 10,
        allowances: [
          {
            name: '',
            allowance: ''
          }
        ],
        workTime: [
          {
            startDate: '2023-10-01T06:54:46.073Z',
            weekSchedule: [
              {
                day: 'Monday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-08-07T13:00:00.000Z',
                checked: true
              },
              {
                day: 'Tuesday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-08-07T13:00:00.000Z',
                checked: true
              },
              {
                day: 'Wednesday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-08-07T13:00:00.000Z',
                checked: true
              },
              {
                day: 'Thursday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-08-07T13:00:00.000Z',
                checked: true
              },
              {
                day: 'Friday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-08-07T13:00:00.000Z',
                checked: true
              },
              {
                day: 'Saturday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-08-07T13:00:00.000Z',
                checked: true
              },
              {
                day: 'Sunday',
                startTime: '2023-08-07T02:00:00.000Z',
                endTime: '2023-10-01T13:03:00.000Z',
                checked: true
              }
            ]
          }
        ],
        role: '651582fb9dce25997d637c13',
        branch: '650007e9c31b396b0f6ef13d',
        deleted: false,
        createdAt: '2023-10-01T06:55:03.868Z',
        updatedAt: '2023-10-01T06:55:03.868Z'
      },
      note: '',
      customerInfo: [],
      account: {
        _id: '65475ae1202c88e80660c1cb',
        code: 'KH000000001',
        fullname: 'Nguyễn Thị Hồng Mai',
        phone: '0985364256',
        password: '',
        email: '',
        address: 'Hậu Giang',
        gender: 'nữ',
        birthday: '2001-11-11T00:00:00.000Z',
        customerLevel: 3,
        score: 3000,
        role: '6546696e7e6592b77881158d',
        deleted: false,
        createdAt: '2023-11-05T09:05:37.615Z',
        updatedAt: '2023-11-07T15:50:47.296Z'
      },
      customersNumber: 1,
      deleted: false,
      createdAt: '2023-11-12T15:29:10.671Z',
      updatedAt: '2023-11-12T15:29:10.671Z',
      title: 'Huynh Thanh Thuong',
      start: '2023-11-16T02:00:00',
      end: '2023-11-16T03:25:00'
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
  const [allTours, setAllTours] = useState([]);

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const getAllTours = async () => {
      try {
        const fetchData = await bookingApi.fetchData();
        const metadata = fetchData.metadata;
        let eventsData = [];
        metadata.map((e) => eventsData.push({ ...e, title: e?.technician?.fullname, start: e.startTime, end: e.endTime }));
        setAllTours(eventsData);
        console.log(eventsData);
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
      events: dt
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
