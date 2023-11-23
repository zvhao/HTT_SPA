import { bookingApi, staffApi } from 'api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../components/css/sweetAlert2.css';
import payBillApi from 'api/payBills';
import MainCard from 'components/MainCard';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { Form, Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { TourDetail } from 'pages/calendar/tour-schedule/components';
import formatCurrency from 'utils/formatCurrency';
import { DateTimeField, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const validationSchema = yup.object({});
const PayBillForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const [isLoading, setIsLoading] = useState(false);

  const { idBooking } = useParams();
  const { id } = useParams();
  const hasBooking = Boolean(idBooking);
  const isEditMode = Boolean(id);
  const [PayBill, setPayBill] = useState(null);
  const navigation = useNavigate();
  const [initialValues, setInitialValues] = useState({
    code: '',
    bookingInfomation: '',
    bookingTime: new Date(),
    branch: '',
    totalPayment: 0,
    counselorInfomation: {},
    discount: 'Giảm thẳng',
    value: 0,
    paymentMethods: 'Tiền mặt'
  });
  const [bookingInfo, setBookingInfo] = useState(null);
  const [maxValue, setMaxValue] = useState(undefined);
  const [totalPaymentBill, setTotalPaymentBill] = useState(0);

  useEffect(() => {
    const getBooking = async () => {
      if (hasBooking) {
        const getBooking = await bookingApi.getById(idBooking);
        const metadata = getBooking.metadata;
        const createdAtBooking = metadata.createdAt;
        const totalPayment = metadata.services.reduce((sum, service) => sum + service.price, 0);
        // console.log(metadata);
        const fetchDataAccount = await staffApi.getByToken();
        const metadataAccount = fetchDataAccount.metadata;
        const codeBranch = metadataAccount.branch.code;
        const idBranch = metadataAccount.branch._id;
        const getAllBills = await payBillApi.fetchData();
        const lengthBills = getAllBills.metadata.length;
        const code = `${codeBranch}-HD${String(lengthBills + 1).padStart(9, '0')}`;
        setInitialValues({
          ...initialValues,
          bookingTime: createdAtBooking,
          totalPayment,
          code,
          branch: idBranch,
          bookingInfomation: idBooking
        });
        setBookingInfo(metadata);
        // console.log(metadata);
      }
    };

    getBooking();
  }, []);

  const setDiscount = (discount, value, totalPayment) => {
    // console.log({ discount, value, totalPayment });
    if (discount === 'Phần trăm') {
      return (totalPayment * value) / 100;
    } else if (discount === 'Giảm thẳng') {
      return value;
    }
  };
  const setTotalPayment = (discount, value, totalPayment) => {
    let totalPaymentBill = totalPayment - setDiscount(discount, value, totalPayment);
    setTotalPaymentBill(totalPaymentBill);
    if (totalPaymentBill < 0) {
      setTotalPaymentBill(0);
      return 0;
    }
    return totalPaymentBill;
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    let formData = { ...values };
    try {
      if (values.discount === 'Phần trăm' && values.value > 100) {
        setIsLoading(false);

        return Swal.fire('Lỗi nhập dữ liệu', 'Vui lòng nhập số phần trăm không lớn hơn 100%', 'error');
      }
      if (values.value === '') {
        formData.paymentInformation = {
          discount: values.discount,
          value: 0
        };
      } else {
        formData.paymentInformation = {
          discount: values.discount,
          value: values.value
        };
      }
      delete formData.discount;
      delete formData.value;
      formData.totalPayment = totalPaymentBill;
    } catch (error) {
      setIsLoading(false);

      Swal.fire('Lỗi nhập dữ liệu', '', 'error');
    }
    try {
      const created = await payBillApi.create(formData);
      console.log(created);
      if (created && created?.status === 201) {
        const metadata = created.metadata;
        console.log(metadata);
        setIsLoading(false);
        Swal.fire({
          title: 'Thành công!',
          text: '',
          icon: 'success',
          customClass: {
            container: 'custom-z-index'
          }
        });
      }
    } catch (error) {
      setIsLoading(false);

      Swal.fire('Lỗi nhập dữ liệu', '', 'error');
    }

  };
  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      setSubmitting(false);
      handleSubmit(values);
    } catch (err) {
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };
  return (
    <MainCard>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
              <Grid item xs={9}>
                <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} hoá đơn</Typography>
              </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
              <Grid item xs={6}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6} style={{ pointerEvents: 'none' }}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="code"
                      name="code"
                      label="Code"
                      variant="outlined"
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.code && Boolean(errors.code)}
                      helperText={touched.code && errors.code}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ pointerEvents: 'none' }}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="totalPayment"
                      name="totalPayment"
                      label="Tổng tiền dịch vụ"
                      variant="outlined"
                      value={formatCurrency(parseInt(values.totalPayment))}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.totalPayment && Boolean(errors.totalPayment)}
                      helperText={touched.totalPayment && errors.totalPayment}
                    />
                  </Grid>
                  <Grid item xs={6} style={{ pointerEvents: 'none' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                      <DemoContainer components={['DateTimeField']}>
                        <DateTimePicker label="Thời gian tạo lịch hẹn" value={dayjs(values.bookingTime)} format="DD/MM/YYYY HH:mm:ss" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={'bold'}>
                      Giảm giá
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="discount"
                          name="discount"
                          label="Phương thức giảm giá"
                          variant="outlined"
                          value={values.discount}
                          select
                          onBlur={handleBlur}
                          onChange={(value) => {
                            handleChange(value);
                          }}
                          error={touched.discount && Boolean(errors.discount)}
                          helperText={touched.discount && errors.discount}
                        >
                          <MenuItem value="Giảm thẳng">Giảm thẳng</MenuItem>
                          <MenuItem value="Phần trăm">Phần trăm</MenuItem>
                        </CssTextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          margin="dense"
                          id="value"
                          name="value"
                          label="Giá trị giảm giá"
                          variant="outlined"
                          value={values.value}
                          onBlur={handleBlur}
                          type="number"
                          onChange={handleChange}
                          inputProps={{ min: 0 }}
                          error={touched.value && Boolean(errors.value)}
                          helperText={touched.value && errors.value}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="paymentMethods"
                  name="paymentMethods"
                  label="Phương thức thanh toán"
                  variant="outlined"
                  value={values.paymentMethods}
                  select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.paymentMethods && Boolean(errors.paymentMethods)}
                  helperText={touched.paymentMethods && errors.paymentMethods}
                >
                  <MenuItem value="Tiền mặt">Tiền mặt</MenuItem>
                  <MenuItem value="Chuyển khoản">Chuyển khoản</MenuItem>
                  <MenuItem value="MOMO">MOMO</MenuItem>
                  <MenuItem value="VNPAY">VNPAY</MenuItem>
                </CssTextField>
                <TableContainer sx={{ mt: 2 }} component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền dịch vụ</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">
                          {formatCurrency(values.totalPayment)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Điểm thành viên</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">
                          {values.totalPayment / 1000} điểm
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Giảm giá</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">
                          {formatCurrency(setDiscount(values.discount, values.value, values.totalPayment))}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: '#0a6cd8' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Thành tiền</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">
                          {formatCurrency(setTotalPayment(values.discount, values.value, values.totalPayment))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid item xs={12} mt={2}>
                  <LoadingButton type="submit" fullWidth size="large" loading={isLoading} variant="contained">
                    <Typography variant="h4">THANH TOÁN</Typography>
                  </LoadingButton>
                </Grid>
              </Grid>

              {bookingInfo && (
                <Grid item xs={12}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
                    <Grid item xs={12}>
                      <Typography mb={1} variant="h5">
                        Thông tin lịch hẹn
                      </Typography>
                    </Grid>
                    <TourDetail selectedEvent={bookingInfo} />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};

export default PayBillForm;
