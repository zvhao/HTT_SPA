import { Autocomplete, DialogContentText, Grid, TextField, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import formatCurrency from 'utils/formatCurrency';
import getStatusDetailsOfTurnsString from 'utils/getStatusDetailsOfTurnsString';

const SellingCourseDetail = ({ selectedEvent }) => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  return (
    <Grid style={{ pointerEvents: 'none' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={6}>
        <CssTextField
          fullWidth
          margin="dense"
          id=""
          name=""
          label="Gói - liệu trình"
          variant="outlined"
          value={`${selectedEvent.course[0]} -  ${selectedEvent.course[1]}  -  ${selectedEvent.course[2]} phút`}
        ></CssTextField>
      </Grid>
      <Grid item xs={6}>
        <CssTextField
          fullWidth
          margin="dense"
          id=""
          name=""
          label="Chi tiết gói"
          variant="outlined"
          value={`${selectedEvent.package_detail.times} lần - ${formatCurrency(selectedEvent.package_detail.price)}`}
        ></CssTextField>
      </Grid>
      <Grid item xs={6}>
        <CssTextField
          fullWidth
          margin="dense"
          id=""
          name=""
          label="Thông tin khách hàng"
          variant="outlined"
          value={
            selectedEvent.account[0] !== '' && selectedEvent.account[0] !== undefined
              ? `${selectedEvent.account[0]} - ${selectedEvent.account[1]} - ${selectedEvent.account[2]}`
              : `${selectedEvent.account[3]} - ${selectedEvent.account[4]} - ${selectedEvent.account[5]}`
          }
        ></CssTextField>
      </Grid>
      <Grid item xs={6}>
        <CssTextField
          fullWidth
          margin="dense"
          id=""
          name=""
          label="Trạng thái"
          variant="outlined"
          value={selectedEvent.status}
        ></CssTextField>
      </Grid>
      <Grid item xs={12}>
        {' '}
        <Typography variant="h5">Chi tiết các lượt thực hiện dịch vụ</Typography>
      </Grid>
      {selectedEvent.detailsOfTurns.map((e, index) => (
        <Grid item xs={6}>
          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <strong>Chi tiết lần {index + 1}</strong>
            </Grid>
            <Grid item>
              <Typography color={getStatusDetailsOfTurnsString(e.status).color}>
                {getStatusDetailsOfTurnsString(e.status).status}
              </Typography>
            </Grid>
          </Grid>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12}>
              <CssTextField
                fullWidth
                margin="dense"
                id=""
                name=""
                label="Kỹ thuật viên"
                variant="outlined"
                value={e.technician?.fullname || 'Chưa chọn kỹ thuật viên'}
              ></CssTextField>
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                fullWidth
                margin="dense"
                id=""
                name=""
                label="Thời gian"
                variant="outlined"
                value={
                  e.date !== null
                    ? `${dayjs(e.date).format('ddd, DD/MM/YYYY')}   ${dayjs(e.startTime).format('HH:mm')}-${dayjs(e.endTime).format(
                        'HH:mm'
                      )}`
                    : 'Chưa đăng ký thời gian'
                }
              ></CssTextField>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
export default SellingCourseDetail;
