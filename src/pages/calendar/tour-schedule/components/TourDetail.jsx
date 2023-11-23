import { Autocomplete, DialogContentText, Grid, TextField, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { useEffect } from 'react';
import getCustomerLevel from 'utils/getCustomerLevel';
import getStatusBookingString from 'utils/getStatusBookingString';

const TourDetail = ({ selectedEvent }) => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  useEffect(() => {
    const render = async () => {
      //   console.log(selectedEvent);
    };
    render();
  });
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={8}>
          <CssTextField
            fullWidth
            margin="dense"
            id="technician"
            name="technician"
            label="Yêu cầu kỹ thuật viên"
            variant="outlined"
            value={
              Object.keys(selectedEvent.technician).length !== 0
                ? `${selectedEvent.technician?.username} - ${selectedEvent.technician?.fullname}`
                : 'Chưa có nhân viên'
            }
          />
        </Grid>
        <Grid item xs={4}>
          <CssTextField
            fullWidth
            margin="dense"
            id="status"
            name="status"
            label="Trạng thái"
            variant="outlined"
            value={getStatusBookingString(selectedEvent.status)}
          />
        </Grid>

        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker sx={{ width: '100%' }} label="Ngày" name="date" value={dayjs(selectedEvent.date)} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker sx={{ width: '100%' }} name="startTime" value={dayjs(selectedEvent.startTime)} label="Thời gian bắt đầu" />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker sx={{ width: '100%' }} name="endTime" value={dayjs(selectedEvent.endTime)} label="Thời gian Kết thúc" />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { lineHeight: 2, p: '10.5px 14px 10.5px 12px' },
              '&': { mt: 2, p: 0 },
              '& .MuiOutlinedInput-root': { pt: '0px', pb: '6px' },
              '& .MuiInputLabel-root': { lineHeight: 'normal' },
              '& .MuiAutocomplete-endAdornment': { top: '50%', transform: 'translate(0, -50%)' }
            }}
            multiple
            name="services"
            options={selectedEvent.services}
            getOptionLabel={(option) => `${option.code} - ${option.name} - ${option.price / 1000}k - ${option.duration} phút`}
            value={selectedEvent.services.length > 0 ? selectedEvent.services : []}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Các dịch vụ" />}
          />
        </Grid>
        <Grid item xs={12}>
          {/* {Object.keys(selectedEvent.account).length !== 0 && ( */}
          <CssTextField
            fullWidth
            margin="dense"
            id=""
            name=""
            label="Tài khoản đặt trước"
            variant="outlined"
            value={
              Object.keys(selectedEvent.account).length !== 0
                ? `${selectedEvent.account.fullname}  -  ${selectedEvent.account.gender}  -  ${selectedEvent.account.phone}  -  Hạng ${getCustomerLevel(
                    selectedEvent.account.customerLevel
                  )}`
                : 'Không có tài khoản khách hàng'
            }
          />
          {/*    )} */}
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6" color={'blue'}>
                {selectedEvent.customersNumber > selectedEvent.customerInfo.length &&
                  selectedEvent.account &&
                  `Thông tin khách hàng đi cùng nhau - bao gồm chủ tài khoản (tổng ${selectedEvent.customersNumber} KH)`}
                {selectedEvent.customersNumber === selectedEvent.customerInfo.length &&
                  Object.keys(selectedEvent.account).length !== 0 &&
                  `Đặt hộ cho các khách hàng - Không có chủ tài khoản tham gia (tổng ${selectedEvent.customersNumber} KH)`}
                {selectedEvent.customersNumber === selectedEvent.customerInfo.length &&
                  Object.keys(selectedEvent.account).length === 0 &&
                  `Các khách hàng (tổng ${selectedEvent.customersNumber} KH)`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {selectedEvent.customersNumber > selectedEvent.customerInfo.length && selectedEvent.account && (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={8}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id=""
                  name=""
                  label="Tên khách hàng"
                  variant="outlined"
                  value={selectedEvent.account.fullname}
                />
              </Grid>
              <Grid item xs={4}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id=""
                  name=""
                  label="Giới tính"
                  variant="outlined"
                  value={selectedEvent.account.gender}
                />
              </Grid>
            </Grid>
          )}
          {selectedEvent.customerInfo.map((e) => (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={8}>
                <CssTextField fullWidth margin="dense" id="" name="" label="Tên khách hàng" variant="outlined" value={e.name} />
              </Grid>
              <Grid item xs={4}>
                <CssTextField fullWidth margin="dense" id="" name="" label="Giới tính" variant="outlined" value={e.gender} />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
};

export default TourDetail;
