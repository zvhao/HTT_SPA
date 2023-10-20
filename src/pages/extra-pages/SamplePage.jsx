// material-ui

// project import

import { useEffect, useState } from 'react';
import { staffApi } from '../../api';
import moment from 'moment';
import dayjs from 'dayjs';
import { format, isAfter, isBefore, isWithinInterval } from 'date-fns';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const [data, setData] = useState([]);
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffsByDate, setStaffsByDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const fetchAllStaffs = async () => {
      try {
        const data = await staffApi.fetchData();
        const allStaffs = data.metadata;
        // console.log(allStaffs);
        setAllStaffs(allStaffs);
        setSelectedDate(dayjs());
        const filteredStaffs = allStaffs.filter((staff) => {
          const lastStartDate = staff.workTime.map((e) => e.startDate).pop();
          return new Date(lastStartDate) <= dayjs();
        });
        setStaffsByDate(filteredStaffs);
        console.log(filteredStaffs);
      } catch (error) {}
    };

    const fnGetStatus = async () => {
      try {
        const data = await staffApi.fetchData();
        const allStaffs = data.metadata;
        // console.log(allStaffs);
        setAllStaffs(allStaffs);
        setSelectedDate(dayjs());
        var filteredStaffs = allStaffs.filter((staff) => {
          const lastStartDate = staff.workTime.map((e) => e.startDate).pop();
          return new Date(lastStartDate) <= dayjs();
        });
        setStaffsByDate(filteredStaffs);
      } catch (error) {}
      const workTime = filteredStaffs[0].workTime.map((e) =>
        e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
      );
      const currentDate = dayjs();
      const startTime = new Date(workTime[0].startTime);
      const endTime = new Date(workTime[0].endTime);
      const startTimeFormatted = dayjs(startTime).format('HH:mm');
      const endTimeFormatted = dayjs(endTime).format('HH:mm');
      const ST = dayjs(currentDate.format('YYYY-MM-DD') + ' ' + startTimeFormatted, 'YYYY-MM-DD HH:mm');
      const ET = dayjs(currentDate.format('YYYY-MM-DD') + ' ' + endTimeFormatted, 'YYYY-MM-DD HH:mm');

      const isWorking = isWithinInterval(new Date(currentDate), {
        start: new Date(ST),
        end: new Date(ET)
      });

      return <div>{isWorking ? 'Đang làm việc' : 'Nghỉ'}</div>;
    };

    fetchAllStaffs();
    fnGetStatus();
  }, []);

  // const fnGetStatus = (staff) => {
  //   const currentDate = new Date();
  //   const workTime = staff.workTime.map((e) =>
  //     e.weekSchedule.find((schedule) => schedule.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
  //   );
  //   const startTime = new Date(workTime[0].startTime);
  //   const endTime = new Date(workTime[0].endTime);
  //   const isWorking = isWithinInterval(currentDate, { start: startTime, end: endTime });

  //   return <div>{isWorking ? 'Đang làm việc' : 'Nghỉ'}</div>;
  // };

  return (
    <div>
      {/* Hiển thị dữ liệu từ backend */}
      {allStaffs.map((item) => (
        <p key={item._id}>{item.fullname}</p>
      ))}
    </div>
  );
};

export default SamplePage;
