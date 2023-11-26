import { bookingApi, commissionApi, customerApi, sellingCourseApi, staffApi } from 'api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../components/css/sweetAlert2.css';
import payBillApi from 'api/payBills';
import MainCard from 'components/MainCard';
import {
  Autocomplete,
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
import cusLevel from 'utils/cusLevel';
import { Path } from 'constant/path';
import { SellingCourseDetail } from 'pages/calendar/course-schedule/components';
import getStatusSellingCourseString from 'utils/getStatusSellingCourseString';

const validationSchema = yup.object({});
const PayBillForm = ({ selectBill }) => {
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
    discount: 'Giảm thẳng',
    value: 0,
    paymentMethods: 'Tiền mặt',
    commission: 10
  });
  const [bookingInfo, setBookingInfo] = useState(null);
  const [sellingCourseInfo, setSellingCourseInfo] = useState(null);
  // const [maxValue, setMaxValue] = useState(undefined);
  const [totalPaymentBill, setTotalPaymentBill] = useState(0);
  const [totalPriceBooking, setTotalPriceBooking] = useState(0);
  const [staffs, setStaffs] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const fetchStaffs = await staffApi.fetchData();
        const staffMetadata = fetchStaffs.metadata;
        setStaffs(staffMetadata);
      } catch (error) {
        Swal.fire({
          title: 'Lỗi xuất dữ liệu',
          text: '',
          icon: 'error',
          customClass: {
            container: 'custom-z-index'
          }
        });
      }
      if (hasBooking) {
        try {
          const fetchDataAccount = await staffApi.getByToken();
          const metadataAccount = fetchDataAccount.metadata;
          const codeBranch = metadataAccount.branch.code;
          const idBranch = metadataAccount.branch._id;
          const getAllBills = await payBillApi.fetchData();
          const lengthBills = getAllBills.metadata.length;
          const code = `${codeBranch}-HD${String(lengthBills + 1).padStart(9, '0')}`;
          const getBooking = await bookingApi.getById(idBooking);
          const getSellingCourse = await sellingCourseApi.getById(idBooking);
          if (getBooking && getBooking?.metadata !== null) {
            // console.log(getBooking);
            const metadata = getBooking.metadata;
            const createdAtBooking = metadata.createdAt;
            const totalPayment = metadata.services.reduce((sum, service) => sum + service.price, 0);
            setTotalPriceBooking(totalPayment);
            setInitialValues({
              ...initialValues,
              bookingTime: createdAtBooking,
              totalPayment,
              code,
              branch: idBranch,
              bookingInfomation: idBooking
            });
            console.log(metadata);
            setBookingInfo(metadata);
          }
          if (getSellingCourse && getSellingCourse?.metadata !== null) {
            console.log(getSellingCourse);
            const metadata = getSellingCourse.metadata;
            setInitialValues({
              ...initialValues,
              bookingTime: metadata.createdAt,
              totalPayment: metadata.package_detail.price,
              code,
              branch: idBranch,
              bookingInfomation: idBooking
            });
            setSellingCourseInfo(metadata);
          }
          // console.log(metadata);
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Lỗi xuất dữ liệu',
            text: '',
            icon: 'error',
            customClass: {
              container: 'custom-z-index'
            }
          });
        }
        // console.log(metadata);
      } else {
        if (isEditMode || selectBill) {
          let byId;
          if (selectBill && selectBill?.id) {
            byId = selectBill?.id;
          } else {
            byId = id;
          }
          try {
            const oneBill = await payBillApi.getById(byId);
            const metadata = oneBill.metadata;
            // console.log(metadata);
            setPayBill(metadata);
            let totalPaymentV1 = 0;
            if (metadata.bookingInfomation?._id) {
              const getBooking = await bookingApi.getById(metadata.bookingInfomation._id);
              const getSellingCourse = await sellingCourseApi.getById(metadata.bookingInfomation._id);
              if (getBooking.metadata) {
                const metadataBooking = getBooking.metadata;
                totalPaymentV1 = metadataBooking.services.reduce((sum, service) => sum + service.price, 0);
                setBookingInfo(metadataBooking);
              }
              if (getSellingCourse.metadata) {
                try {
                } catch (error) {}
                const metadataSellingCourse = getSellingCourse.metadata;
                totalPaymentV1 = metadataSellingCourse.package_detail.price;
                setSellingCourseInfo(metadataSellingCourse);
              }
            }

            setInitialValues({
              ...metadata,
              branch: metadata.branch._id,
              discount: metadata.paymentInformation.discount,
              value: metadata.paymentInformation.value,
              totalPayment: totalPaymentV1
            });
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: 'Lỗi xuất dữ liệu',
              text: '',
              icon: 'error',
              customClass: {
                container: 'custom-z-index'
              }
            });
          }
        }
      }
    };

    getBooking();
  }, []);

  const handleStaffChange = (event, value) => {
    console.log(value);
    setSelectedTechnician(value);
  };

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
    let formDataScoreLevel = {};
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
      console.error(error);
      setIsLoading(false);
      return Swal.fire('Lỗi nhập dữ liệu', '', 'error');
    }
    if (hasBooking) {
      try {
        const created = await payBillApi.create(formData);
        console.log(created);
        if (created && created?.status === 201) {
          try {
            if (bookingInfo?._id) {
              const id = bookingInfo._id;
              const formData = { status: 3 };
              // console.log(bookingInfo);
              const updated = await bookingApi.update(id, formData);
              // console.log(updated);
            } else if (sellingCourseInfo?._id) {
              let statusOld = sellingCourseInfo.status;
              let statusNew = 2;
              switch (statusOld) {
                case 1:
                  statusNew = 2;
                  break;
                case 3:
                  statusNew = 4;
                  break;

                default:
                  break;
              }
              const formData = { status: statusNew };
              const updated = await sellingCourseApi.update(sellingCourseInfo._id, formData);
              console.log(updated);
            }
          } catch (error) {
            console.error(error);
            setIsLoading(false);
            return Swal.fire('Lỗi nhập dữ liệu', 'Lỗi cập nhật trạng thái lịch hẹn', 'error');
          }
          try {
            if (bookingInfo?.account && Object.keys(bookingInfo?.account).length !== 0) {
              // console.log(bookingInfo.account);
              let scoreOld = bookingInfo.account.score;
              let score = scoreOld + values.totalPayment / 1000;
              let customerLevel = cusLevel.setLevel(score);
              formDataScoreLevel = { score, customerLevel };
              const updated = await customerApi.update(bookingInfo.account._id, formDataScoreLevel);
              console.log(updated);
            } else if (sellingCourseInfo?.account && Object.keys(sellingCourseInfo?.account).length !== 0) {
              // console.log(sellingCourseInfo);
              let scoreOld = sellingCourseInfo.account.score;
              let score = scoreOld + values.totalPayment / 1000;
              let customerLevel = cusLevel.setLevel(score);
              formDataScoreLevel = { score, customerLevel };
              // console.log(formDataScoreLevel);
              const updated = await customerApi.update(sellingCourseInfo.account._id, formDataScoreLevel);
              console.log(updated);
            }
          } catch (error) {
            console.error(error);
            setIsLoading(false);
            return Swal.fire('Lỗi nhập dữ liệu', 'Lỗi cập nhật điểm thành viên', 'error');
          }
          try {
            let formData = {};
            if (bookingInfo?._id && bookingInfo?.technician?._id) {
              const average =
                bookingInfo.services.reduce((total, item) => {
                  return total + item.percent;
                }, 0) / bookingInfo.services.length;
              formData = {
                technician: bookingInfo.technician._id,
                commission: parseInt((totalPriceBooking * average) / 100) || parseInt((totalPriceBooking * 10) / 100),
                type: 'service',
                booking: bookingInfo._id,
                executionTime: dayjs()
              };
            }
            if (selectedTechnician && sellingCourseInfo?._id) {
              formData = {
                technician: selectedTechnician._id,
                commission: (sellingCourseInfo.package_detail.price * values.commission) / 100,
                type: 'course-consultation',
                booking: sellingCourseInfo._id,
                executionTime: sellingCourseInfo.createdAt
              };
            }
            const created = await commissionApi.create(formData);
            console.log(created);
          } catch (error) {
            setIsLoading(false);
            return Swal.fire('Lỗi nhập dữ liệu', 'Lỗi tạo hoa hồng cho nhân viên', 'error');
          }
          console.log(created);
          setIsLoading(false);
          Swal.fire({
            title: 'Thành công!',
            text: '',
            icon: 'success',
            customClass: {
              container: 'custom-z-index'
            }
          });
          navigation(Path.PayBill, { replace: true });
        }
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(false);
        return Swal.fire('Lỗi!!!', error.response.data.message, 'error');
      }
    } else {
      try {
        formData.bookingInfomation = values.bookingInfomation._id;
        const updated = await payBillApi.update(id, formData);
        if (updated && updated?.status === 200) {
          setIsLoading(false);
          Swal.fire({
            title: 'Thành công!',
            text: '',
            icon: 'success',
            customClass: {
              container: 'custom-z-index'
            }
          });
          navigation(Path.PayBill, { replace: true });
        }
        console.log(formData);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return Swal.fire('Lỗi nhập dữ liệu', '', 'error');
      }
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
              <Grid item xs={12}>
                {' '}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={9}>
                    <Typography variant="h4">
                      {isEditMode && 'Cập nhật'} {hasBooking && 'Thêm'} {selectBill && 'Chi tiết'} hoá đơn
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
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
                      disabled
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.code && Boolean(errors.code)}
                      helperText={touched.code && errors.code}
                    />
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
                    {sellingCourseInfo?._id && hasBooking && (
                      <Grid container rowSpacing={1} sx={{ mt: 1 }} columnSpacing={{ xs: 1, sm: 2 }}>
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
                            label="Kỹ thuật viên tư vấn"
                            options={staffs}
                            getOptionLabel={(option) => `${option.username} - ${option.fullname}`}
                            value={selectedTechnician}
                            onChange={handleStaffChange}
                            renderInput={(params) => <CssTextField {...params} variant="outlined" label="Kỹ thuật viên tư vấn" />}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            disabled={!selectedTechnician}
                            fullWidth
                            margin="dense"
                            id="commission"
                            name="commission"
                            label="% tư vấn liệu trình"
                            variant="outlined"
                            value={values.commission}
                            onBlur={handleBlur}
                            type="number"
                            onChange={handleChange}
                            inputProps={{ min: 0 }}
                            error={touched.commission && Boolean(errors.commission)}
                            helperText={touched.commission && errors.commission}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={12}>
                    <Typography mt={1} variant="h5">
                      Thông tin {sellingCourseInfo?._id ? 'liệu trình' : 'tour'} (Không thể thay đổi ở trang này)
                    </Typography>
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
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ m: 1, mt: -1, p: 2, borderRadius: 1, boxShadow: '2px 4px 10px 2px #888888' }}>
                  <Grid container>
                    <TableContainer component={Paper}>
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
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }} align="right">
                              {formatCurrency(setTotalPayment(values.discount, values.value, values.totalPayment))}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {hasBooking && (
                      <Grid item xs={12} mt={2}>
                        <LoadingButton type="submit" fullWidth size="large" loading={isLoading} variant="contained">
                          <Typography variant="h4">THANH TOÁN</Typography>
                        </LoadingButton>
                      </Grid>
                    )}
                    {isEditMode && (
                      <Grid item xs={12} mt={2}>
                        <LoadingButton type="submit" fullWidth size="large" loading={isLoading} variant="contained">
                          <Typography variant="h4">CẬP NHẬT</Typography>
                        </LoadingButton>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>

              {bookingInfo && (
                <Grid item xs={12}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
                    <TourDetail selectedEvent={bookingInfo} />
                  </Grid>
                </Grid>
              )}
              {sellingCourseInfo && (
                <Grid item xs={12}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
                    <SellingCourseDetail
                      selectedEvent={{
                        ...sellingCourseInfo,
                        course: [sellingCourseInfo.course.code, sellingCourseInfo.course.name, sellingCourseInfo.course.duration],
                        status: getStatusSellingCourseString(sellingCourseInfo.status),
                        account: [
                          sellingCourseInfo.customerInfo[0]?.name,
                          sellingCourseInfo.customerInfo[0]?.gender,
                          sellingCourseInfo.customerInfo[0]?.phone,
                          sellingCourseInfo.account?.fullname,
                          sellingCourseInfo.account?.gender,
                          sellingCourseInfo.account?.phone
                        ]
                      }}
                    />
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
