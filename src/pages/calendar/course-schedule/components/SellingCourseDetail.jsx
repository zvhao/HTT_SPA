import { Autocomplete, DialogContentText, Grid, TextField, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import formatCurrency from 'utils/formatCurrency';
import getStatusDetailsOfTurnsString from 'utils/getStatusDetailsOfTurnsString';

const SellingCourseDetail = ({ selectedEvent })=> {
    const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

    return (<Grid style={{ pointerEvents: 'none' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
    <Grid item xs={6}>
      <CssTextField
        fullWidth
        margin="dense"
        id=""
        name=""
        label="Gói - liệu trình"
        variant="outlined"
        value={`${selectedEvent.course.code} -  ${selectedEvent.course.name}  -  ${selectedEvent.course.duration} phút`}
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
        value={`${selectedEvent.package_detail.times} lần - ${formatCurrency(
          selectedEvent.package_detail.price
        )}`}
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
          Object.keys(selectedEvent.account).length !== 0
            ? `${selectedEvent.account?.fullname} - ${selectedEvent.account?.gender} - ${selectedEvent.account?.phone}`
            : `${selectedEvent.customerInfo?.name} - ${selectedEvent.customerInfo?.gender} - ${selectedEvent.customerInfo?.phone}`
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
              value={e.technician?.fullname || 'chưa chọn kỹ thuật viên'}
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
              value={`${dayjs(e.date).format('ddd, DD/MM/YYYY')}   ${dayjs(e.startTime).format('HH:mm')}-${dayjs(
                e.endTime
              ).format('HH:ss')}`}
            ></CssTextField>
          </Grid>
        </Grid>
      </Grid>
    ))}
  </Grid>)
}
export default SellingCourseDetail