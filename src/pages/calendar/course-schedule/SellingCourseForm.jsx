import { LoadingButton } from '@mui/lab';
import { Autocomplete, Checkbox, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { commissionApi, courseApi, customerApi, sellingCourseApi, staffApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import formatCurrency from 'utils/formatCurrency';
import getStatusDetailsOfTurnsString from 'utils/getStatusDetailsOfTurnsString';
import getStatusSellingCourseString from 'utils/getStatusSellingCourseString';
import * as yup from 'yup';
import '../../../components/css/sweetAlert2.css';

const validationSchema = yup.object({});

const SellingCourseForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    customerInfo: {
      name: '',
      genrder: '',
      phone: '',
      address: ''
    },
    note: ''
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [packageDetails, setPackageDetails] = useState([]);
  const [selectedPackageDetail, setSelectedPackageDetail] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [detailsOfTurns, setDetailsOfTurns] = useState([]);

  const [staffs, setStaffs] = useState([]);

  const [checkedAccount, setCheckedAccount] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    genrder: '',
    phone: '',
    address: ''
  });

  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const FORBIDDEN = async () => {
      const role = JSON.parse(localStorage.getItem('data')).role;
      if (role && role !== 'staff') {
        navigation(Path.FORBIDDEN, { replace: true });
      }
    };
    const getOneSellingCourse = async () => {
      if (isEditMode) {
        try {
          const fetchData = await sellingCourseApi.getById(id);
          let metadata = fetchData.metadata;
          setInitialValues(metadata);
          setSelectedCourse(metadata.course);
          setPackageDetails(metadata.course.package_details);
          setSelectedPackageDetail(metadata.package_detail);
          setDetailsOfTurns(metadata.detailsOfTurns);
          setCustomerInfo(metadata.customerInfo[0]);
          if (Object.keys(metadata.account).length !== 0) {
            setSelectedAccount(metadata.account);
          }
          if (metadata?.customerInfo[0]?.name !== '' && Object.keys(metadata.account).length !== 0) {
            setCheckedAccount(true);
          }
          // console.log(metadata);
        } catch (error) {
          Swal.fire('Lỗi rồi?', 'Không tìm thấy dữ liệu', 'error');
        }
      }
    };
    const getAllCourses = async () => {
      try {
        const fetchData = await courseApi.fetchData();
        let metadata = fetchData.metadata;
        setCourses(metadata);
      } catch (error) {
        Swal.fire('Lỗi rồi?', 'Không tìm thấy dữ liệu', 'error');
      }
    };
    const getAllAccounts = async () => {
      try {
        const fetchData = await customerApi.fetchData();
        let metadata = fetchData.metadata;
        setAccounts(metadata);
      } catch (error) {
        Swal.fire('Lỗi rồi?', 'Không tìm thấy dữ liệu', 'error');
      }
    };
    const allStaffs = async () => {
      try {
        const fetchStaffs = await staffApi.fetchData();
        const staffMetadata = fetchStaffs.metadata;
        setStaffs(staffMetadata);
      } catch (error) {}
    };

    const getBranch = async () => {
      try {
        const AccountData = await staffApi.getByToken();
        setBranch(AccountData.metadata.branch._id);
      } catch (error) {
        Swal.fire('Lỗi rồi?', 'Không tìm thấy dữ liệu', 'error');
      }
    };
    FORBIDDEN();
    allStaffs();
    getOneSellingCourse();
    getAllCourses();
    getAllAccounts();
    getBranch();
  }, []);

  const handleCourseChange = (event, value) => {
    // console.log(value);
    setSelectedCourse(value);
    if (value !== null) {
      setPackageDetails(value.package_details);
      setSelectedPackageDetail(value.package_details[0]);
      setDOT(value?.package_details[0]?.times);
    } else {
      setPackageDetails([]);
    }
  };
  const setDOT = async (value) => {
    if (value) {
      let newDetailsOfTurns = [];
      for (let index = 0; index < value; index++) {
        newDetailsOfTurns = Array.from({ length: value }, (_, index) => ({
          technician: '',
          date: null,
          startTime: null,
          endTime: null,
          status: 0
        }));
      }
      setDetailsOfTurns(newDetailsOfTurns);
    } else if (!value) {
      setDetailsOfTurns([]);
    }
  };
  const handlePackageDetailChange = (event, value) => {
    setSelectedPackageDetail(value);
    return setDOT(value?.times);
  };
  const handleAccountChange = (event, value) => {
    // console.log(value);
    setSelectedAccount(value);
    if (value) {
      if (customerInfo?.name !== '') {
        setCheckedAccount(true);
      } else {
        setCheckedAccount(false);
      }
    }
  };

  const handleDetailsOfTurnsChange = (index, key, value) => {
    // console.log(value);
    setDetailsOfTurns((prevAppointments) => {
      const updatedAppointments = [...prevAppointments];
      updatedAppointments[index] = {
        ...updatedAppointments[index],
        [key]: value
      };
      return updatedAppointments;
    });
  };

  const handleChangeCheckbox = async (event) => {
    const checked = event.target.checked;
    setCheckedAccount(checked);
    if (!checked) {
      setCustomerInfo({
        name: '',
        genrder: '',
        phone: '',
        address: ''
      });
    }
  };

  const handleChangeCustomerInfo = async (key, value) => {
    // console.log(key, value);
    setCustomerInfo((prevCustomerInfo) => ({
      ...prevCustomerInfo,
      [key]: value
    }));
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
      formData.course = selectedCourse._id;
      formData.branch = branch;
      formData.package_detail = selectedPackageDetail;
      formData.account = selectedAccount?._id || '';
      if (formData.account === '' && customerInfo.name === '') {
        setIsLoading(false);

        return Swal.fire('Lỗi rồi?', 'thiếu khách hàng', 'error');
      }
      if (formData.account !== '' && customerInfo.name === '' && checkedAccount) {
        setIsLoading(false);

        return Swal.fire('Lỗi rồi?', 'thiếu khách hàng được đặt hộ', 'error');
      }
      if (detailsOfTurns.length === 0) {
        setIsLoading(false);
        return Swal.fire('Lỗi rồi?', 'Tạo ít nhất 1 lượt thực hiện tour', 'error');
      }
      if (
        detailsOfTurns[0]?.date === null &&
        detailsOfTurns[0]?.startTime === null &&
        detailsOfTurns[0]?.endTime === null &&
        detailsOfTurns[0]?.technician === ''
      ) {
        setIsLoading(false);
        return Swal.fire('Lỗi rồi?', 'Tạo ít nhất 1 lượt thực hiện tour', 'error');
      }
      let updatedDetailsOfTurns = detailsOfTurns.map((turn) => {
        // Nếu technician là một object, thay thế nó bằng _id
        if (turn.technician && typeof turn.technician === 'object') {
          return { ...turn, technician: turn.technician._id };
        }
        // Nếu không phải là object, giữ nguyên đối tượng
        return turn;
      });
      formData.detailsOfTurns = updatedDetailsOfTurns;
      formData.customerInfo = customerInfo;
      setIsLoading(false);
      // console.log(formData);
      if (isEditMode) {
        try {
          const updated = await sellingCourseApi.update(id, formData);
          if (updated?.status === 200) {
            try {
              let filteredDetailsOfTurns = detailsOfTurns.filter(function (turn) {
                return turn.status === 2;
              });
              let servicesByCourse = values.course.services;
              const totalPriceService = servicesByCourse.reduce((sum, service) => sum + service.price, 0);
              let commission = parseInt(totalPriceService / 10);
              let commissions = filteredDetailsOfTurns.map(function (turn) {
                return { booking: id, technician: turn.technician?._id, executionTime: turn.startTime, type: 'course-tour', commission };
              });
              let arr = [];
              commissions.forEach(async (commission) => {
                const cre = await commissionApi.create(commission);
                arr.push(cre);
              });
            } catch (error) {}
            setIsLoading(false);
            Swal.fire({
              title: 'Cập nhật thành công!',
              icon: 'success'
            });
            navigation(Path.CourseSchedule, { replace: true });
          }
        } catch (error) {
          return Swal.fire('Lỗi rồi?', '', 'error');
        }
      } else {
        const created = await sellingCourseApi.create(formData);
        // console.log(created);
        if (created?.status === 201) {
          setIsLoading(false);
          Swal.fire({
            title: 'Tạo thành công!',
            icon: 'success'
          });
          navigation(Path.CourseSchedule, { replace: true });
        }
        // console.log(formData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      Swal.fire('Lỗi rồi?', 'Thiếu dữ liệu', 'error');
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
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} lịch liệu trình</Typography>
              </Grid>
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
                  id="course"
                  name="course"
                  label="Gói - liệu trình"
                  options={courses}
                  getOptionLabel={(option) => `${option.code} -  ${option.name}  -  ${option.duration} phút`}
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  renderInput={(params) => <CssTextField {...params} variant="outlined" label="Gói - liệu trình" />}
                />
              </Grid>
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
                  disabled={!Boolean(selectedCourse)}
                  margin="dense"
                  id="package_detail"
                  name="package_detail"
                  label="Chi tiết gói"
                  options={packageDetails}
                  getOptionLabel={(option) => `${option.times} lần -  ${formatCurrency(option.price)}`}
                  value={selectedPackageDetail}
                  onChange={handlePackageDetailChange}
                  renderInput={(params) => <CssTextField {...params} variant="outlined" label="Chi tiết gói" />}
                />
              </Grid>
              <Grid item xs={6}>
                <Field as={CssTextField} fullWidth margin="dense" label="Trạng thái" name="status" variant="outlined" select>
                  <MenuItem value={0}>{getStatusSellingCourseString(0)}</MenuItem>
                  <MenuItem value={1}>{getStatusSellingCourseString(1)}</MenuItem>
                  <MenuItem value={2}>{getStatusSellingCourseString(2)}</MenuItem>
                  <MenuItem value={3}>{getStatusSellingCourseString(3)}</MenuItem>
                  <MenuItem value={4}>{getStatusSellingCourseString(4)}</MenuItem>
                </Field>
              </Grid>
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
                  id="account"
                  name="account"
                  label="Tài khoản khách hàng tích điểm"
                  options={accounts}
                  getOptionLabel={(option) => `${option.fullname}- ${option.gender} - ${option.phone}`}
                  value={selectedAccount}
                  onChange={handleAccountChange}
                  renderInput={(params) => <CssTextField {...params} variant="outlined" label="Tài khoản khách hàng tích điểm" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems={'center'}>
                  <Grid item xs={6}>
                    <Typography variant="h5">{selectedAccount ? 'Thông tin khách hàng được đặt hộ' : 'Thông tin khách hàng'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {selectedAccount && (
                      <FormControlLabel
                        sx={{ color: 'blue' }}
                        control={<Checkbox checked={checkedAccount} onChange={handleChangeCheckbox} />}
                        label="Đặt hộ cho khách hàng khác"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="name"
                      name="name"
                      label="Tên khách hàng"
                      variant="outlined"
                      value={customerInfo?.name}
                      onChange={(e) => handleChangeCustomerInfo('name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={CssTextField}
                      fullWidth
                      margin="dense"
                      label="Giới tính"
                      name="gender"
                      variant="outlined"
                      select
                      value={customerInfo?.gender}
                      onChange={(e) => handleChangeCustomerInfo('gender', e.target.value)}
                    >
                      <MenuItem value="nam">Nam</MenuItem>
                      <MenuItem value="nữ">Nữ</MenuItem>
                      <MenuItem value="khác">Khác</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="phone"
                      name="phone"
                      label="Số điện thoại"
                      variant="outlined"
                      value={customerInfo?.phone}
                      onChange={(e) => handleChangeCustomerInfo('phone', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      margin="dense"
                      id="address"
                      name="address"
                      label="Địa chỉ"
                      variant="outlined"
                      value={customerInfo?.address}
                      onChange={(e) => handleChangeCustomerInfo('address', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  id="note"
                  name="note"
                  label="Ghi chú"
                  variant="outlined"
                  value={values.note}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              {detailsOfTurns.length !== 0 && (
                <Grid item xs={12}>
                  {/* <Grid container></Grid> */}
                  {detailsOfTurns.map((appointment, index) => (
                    <Paper key={index} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                      <Grid container spacing={2} mt={1}>
                        <Grid item xs={6}>
                          <Typography variant="h6">Thực hiện lần {index + 1} </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            as={CssTextField}
                            fullWidth
                            label="Trạng thái"
                            name="status"
                            variant="outlined"
                            select
                            value={appointment.status}
                            onChange={(e) => handleDetailsOfTurnsChange(index, 'status', e.target.value)}
                          >
                            <MenuItem value={0}>{getStatusDetailsOfTurnsString(0).status}</MenuItem>
                            <MenuItem value={1}>{getStatusDetailsOfTurnsString(1).status}</MenuItem>
                            <MenuItem value={2}>{getStatusDetailsOfTurnsString(2).status}</MenuItem>
                          </Field>
                        </Grid>

                        <Grid item xs={3}>
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
                            onChange={(e, value) => handleDetailsOfTurnsChange(index, 'technician', value)}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Yêu cầu kỹ thuật viên" />}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker
                                sx={{ width: '100%' }}
                                label="Date"
                                value={dayjs(appointment.date)}
                                onChange={(date) => handleDetailsOfTurnsChange(index, 'date', date)}
                                fullWidth
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker
                                sx={{ width: '100%' }}
                                label="Start Time"
                                value={dayjs(appointment.startTime)}
                                onChange={(time) => handleDetailsOfTurnsChange(index, 'startTime', time)}
                                fullWidth
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker
                                sx={{ width: '100%' }}
                                label="End Time"
                                value={dayjs(appointment.endTime)}
                                onChange={(time) => handleDetailsOfTurnsChange(index, 'endTime', time)}
                                fullWidth
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Grid>
              )}
            </Grid>
            <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isSubmitting} variant="contained">
              <span>Gửi</span>
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};
export default SellingCourseForm;
