import { Autocomplete, Grid, Paper, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { staffApi } from 'api';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useEffect } from 'react';

const DetailsOfTurns = ({ init }) => {

  const [appointments, setAppointments] = useState(init);
  const [staffs, setStaffs] = useState([]);
  //   const [selectedTechnician, setSelectedTechnician] = useState(null);

  useEffect(() => {
    const allStaffs = async () => {
      try {
        const fetchStaffs = await staffApi.fetchData();
        const staffMetadata = fetchStaffs.metadata;
        setStaffs(staffMetadata);
      } catch (error) {}
    };
    allStaffs();
  }, []);

  const handleInputChange = (index, key, value) => {
    console.log(key, value);
    setAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments];
      updatedAppointments[index] = {
        ...updatedAppointments[index],
        [key]: value
      };
      return updatedAppointments;
    });
  };

  const handleAddAppointment = () => {
    console.log(appointments);

  };

  return (
    <div>
      {appointments.map((appointment, index) => (
        <Paper key={index} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6">Thực hiện lần {index + 1} </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Autocomplete
                sx={{
                  '& .MuiOutlinedInput-input': { lineHeight: 2, p: '10.5px 14px 10.5px 12px' },
                  '&': { mt: 1, p: 0 },
                  '& .MuiOutlinedInput-root': { pt: '0px', pb: '6px' },
                  '& .MuiInputLabel-root': { lineHeight: 'normal' },
                  '& .MuiAutocomplete-endAdornment': { top: '50%', transform: 'translate(0, -50%)' }
                }}
                fullWidth
                margin="dense"
                id="technician"
                name="technician"
                label="Yêu cầu kỹ thuật viên"
                options={staffs}
                getOptionLabel={(option) => (option ? `${option.username} - ${option.fullname}` : '')}
                value={appointment.technician}
                onChange={(e, value) => handleInputChange(index, 'technician', value)}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Yêu cầu kỹ thuật viên" />}
              />
              {/* <TextField
                label="Technician"
                value={`${appointment.technician?.username || ''}  ${appointment.technician?.fullname || ''}`}
                onChange={(e) => handleInputChange(index, 'technician', e.target.value)}
                fullWidth
              /> */}
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Date"
                    value={dayjs(appointment.date)}
                    onChange={(date) => handleInputChange(index, 'date', date)}
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker
                    label="Start Time"
                    value={dayjs(appointment.startTime)}
                    onChange={(time) => handleInputChange(index, 'startTime', time)}
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker
                    label="End Time"
                    value={dayjs(appointment.endTime)}
                    onChange={(time) => handleInputChange(index, 'endTime', time)}
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default DetailsOfTurns;
