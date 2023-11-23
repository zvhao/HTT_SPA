import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'; // Import plugin danh sách
import timeGridPlugin from '@fullcalendar/timegrid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CardActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { bookingApi, sellingCourseApi, staffApi } from 'api';
import { Path } from 'constant/path';
import 'dayjs/locale/en-gb';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TourForm from './TourForm';
import { TourDetail } from './components';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import '../../../components/css/sweetAlert2.css';
import getStatusSellingCourseString from 'utils/getStatusSellingCourseString';
import getStatusBookingString from 'utils/getStatusBookingString';
import PaymentsIcon from '@mui/icons-material/Payments';

const TourSchedule = () => {
  const navigation = useNavigate();

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

        let ServiceComboData = [];
        metadata.map((e) =>
          ServiceComboData.push({ ...e, title: e?.technician?.fullname || 'chưa có nhân viên', start: e.startTime, end: e.endTime })
        );
        const fetchDataSellingCourse = await sellingCourseApi.fetchData();
        const metadataSellingCourse = fetchDataSellingCourse.metadata;
        // console.log(metadataSellingCourse);
        let courseData = [];
        metadataSellingCourse.forEach((f) => {
          f.detailsOfTurns.forEach((e) => {
            if (e.date !== null && e.startTime !== null && e.endTime !== null) {
              const date = dayjs(e.date).format('YYYY-MM-DD');
              const timeStartTime = dayjs(e.startTime).format('HH:mm');
              const timeEndTime = dayjs(e.endTime).format('HH:mm');
              const startTime = dayjs(date + ' ' + timeStartTime, 'YYYY-MM-DD HH:mm').toISOString();
              const endTime = dayjs(date + ' ' + timeEndTime, 'YYYY-MM-DD HH:mm').toISOString();
              // console.log({ date, timeStartTime, timeEndTime, startTime, endTime });
              courseData.push({
                ...f,
                title: e?.technician?.fullname || 'chưa có nhân viên',
                start: startTime,
                end: endTime
              });
            }
          });
        });
        let eventsData = [...ServiceComboData, ...courseData];
        // console.log(eventsData);
        setAllTours(eventsData);

        const accountData = await staffApi.getByToken();
        const branchMetadata = accountData.metadata.branch;
        const startTime = branchMetadata.startTime;
        const endTime = branchMetadata.endTime;

        const calendarEl = calendarRef.current;
        const calendar = new Calendar(calendarEl, {
          // eventContent: function (arg) {
          //   console.log(arg.event._def.extendedProps);
          //   const title = arg.event._def.title;
          //   const status = arg.event._def.extendedProps.status;

          //   const statusString =
          //     'course' in arg.event._def.extendedProps ? getStatusSellingCourseString(status) : getStatusBookingString(status);

          //   return title + statusString;
          // },
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
          locale: 'vi',
          height: 1000,
          initialView: 'timeGridDay',
          firstDay: 1,
          eventColor: '#096cd8',
          eventDisplay: 'block',
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
          businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Monday - Thursday

            startTime: startTime, // a start time (10am in this example)
            endTime: endTime // an end time (6pm in this example)
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
            if ('course' in filter[0]) {
              Swal.fire({
                title: 'Đây là gói - liệu trình',
                text: 'Bạn muốn đến trang xem - cập nhật liệu trình?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK, chuyển hướng!',
                cancelButtonText: 'Quay lại'
              }).then((result) => {
                if (result.isConfirmed) {
                  // navigation(`${Path.CourseSchedule}/edit/${filter[0]._id}`, { replace: true });
                  window.open(`${Path.CourseSchedule}/edit/${filter[0]._id}`, '_blank').focus();
                }
              });
            } else {
              setSelectedEvent(filter[0]);
              setDialogOpenInfo(true);
            }
          },
          dateClick: function (info) {
            if (role && role === 'staff') {
              setSelectStartTime(info);
              setDialogOpenAdd(true);
            }
          },

          events: eventsData
        });
        calendar.render();

        return () => {
          calendar.destroy();
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
            <>
              <Button
                sx={{ mr: 5 }}
                size="medium"
                variant="outlined"
                target="_blank"
                component={Link}
                to={`${Path.PayBill}/add/${selectedEvent?._id}`}
              >
                <PaymentsIcon sx={{ mr: 1 }} />
                Hoá đơn thanh toán
              </Button>
              <Button
                sx={{ mr: 5 }}
                size="medium"
                variant="outlined"
                target="_blank"
                component={Link}
                to={`${Path.TourSchedule}/edit/${selectedEvent?._id}`}
              >
                <EditIcon sx={{ mr: 1 }} />
                vào trang Cập nhật
              </Button>
            </>
          )}

          <Button onClick={() => setDialogOpenInfo(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialogOpenAdd} onClose={() => setDialogOpenAdd(false)} sx={{ '.MuiPaper-root': { minWidth: '90%' } }}>
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
