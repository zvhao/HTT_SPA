import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { bookingApi, comboApi, courseApi, customerApi, serviceApi, staffApi } from 'api';
import MainCard from 'components/MainCard';
import { Path } from 'constant/path';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/en-gb';
import dayjs from 'dayjs';

const validationSchema = yup.object({
  // services: yup.array().min(1, 'Please select at least one service'),
  status: yup.number().required('Trạng thái là bắt buộc'),
  date: yup.date().required('Bắt buộc chọn ngày'),
  startTime: yup.date().required('Thời gian bắt đầu là bắt buộc'),
  endTime: yup.date().required('Thời gian kết thúc là bắt buộc'),
  technician: yup.object().shape({}),
  note: yup.string(),
  customerInfo: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Tên là bắt buộc'),
      gender: yup.string().required('Giới tính là bắt buộc')
    })
  ),
  account: yup.object().shape({}),
  customersNumber: yup.number().min(1, 'Chưa có khách hàng nào được chọn')
});
const TourForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [initialValues, setInitialValues] = useState({
    services: [],
    status: 1,
    date: dayjs(),
    startTime: null,
    endTime: null,
    technician: '',
    note: '',
    customerInfo: [{ name: '', gender: '' }],
    account: '',
    customersNumber: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checkedAccount, setCheckedAccount] = useState(true);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [errorRequired, setErrorRequired] = useState({});
  const [totalPriceDuration, setTotalPriceDuration] = useState({
    duration: 0,
    price: 0
  });

  const [isCus, setIsCus] = useState(0);

  useEffect(() => {
    const getOneTour = async (isEditMode) => {
      if (isEditMode) {
        try {
          const oneTourData = await bookingApi.getById(id);
          const metadata = { ...oneTourData.metadata };
          setInitialValues(metadata);
        } catch (error) {
          console.log(error);
        }
      }
    };
    const fetchServices = async () => {
      try {
        const services = await serviceApi.fetchData();
        const servicesData = services.metadata;

        const combos = await comboApi.fetchData();
        const combosData = combos.metadata;

        // const courses = await courseApi.fetchData();
        // const coursesData = courses.metadata;

        const combinedArray = [...servicesData, ...combosData];

        const fetchStaffs = await staffApi.fetchData();
        const staffMetadata = fetchStaffs.metadata;

        const fetchCustomers = await customerApi.fetchData();
        const customerMetadata = fetchCustomers.metadata;

        // console.log(combinedArray);
        setServices(combinedArray);
        setStaffs(staffMetadata);
        setAccounts(customerMetadata);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        Swal.fire({
          title: 'Lỗi rồi!',
          icon: 'error'
        });
      }
    };
    const isCus = (checkedAccount, selectedAccount) => {
      if (checkedAccount && selectedAccount !== null) {
        setIsCus(1);
      } else {
        setIsCus(0);
      }
    };

    getOneTour();
    fetchServices();
    isCus(checkedAccount, selectedAccount);
  }, [checkedAccount, selectedAccount]);

  const handleServicesChange = (event, value) => {
    setSelectedServices(value);
    setTotalPriceDuration({
      price: value.reduce((acc, service) => acc + service.price, 0),
      duration: value.reduce((acc, service) => acc + service.duration, 0)
    });
    if (value.length === 0) {
      setErrorRequired((prevErrors) => ({ ...prevErrors, services: 'Cần ít nhất 1 dịch vụ' }));
    } else {
      setErrorRequired((prevErrors) => {
        const { services, ...restErrors } = prevErrors;
        return restErrors;
      });
    }
  };

  const handleStaffChange = (event, value) => {
    setSelectedStaff(value);
  };
  const handleAccountChange = (event, value) => {
    setSelectedAccount(value);
  };

  const handleChangeCheckbox = (event) => {
    setCheckedAccount(event.target.checked);
  };

  const handleSubmit = async (values) => {
    let formData = { ...values };
    let date = dayjs(values.date.format('YYYY-MM-DD') + ' 07:00', 'YYYY-MM-DD HH:mm');
    formData.date = date;
    try {
      const customersNumber = values.customerInfo.length + isCus;
      if (selectedServices.length === 0) {
        return setErrorRequired((prevErrors) => ({ ...prevErrors, services: 'Cần ít nhất 1 dịch vụ' }));
      }
      let services = [];
      selectedServices.map((e) => services.push(e._id));
      if (customersNumber === 0) {
        return Swal.fire('Thiếu khách hàng', 'Cần chọn 1 khách hàng hoặc điền đầy đủ thông tin khách hàng', 'error');
      }
      formData.services = services;
      formData.customersNumber = customersNumber;
      if (selectedStaff) {
        formData.technician = selectedStaff._id;
      }
      if (selectedAccount) {
        formData.account = selectedAccount._id;
      }
      const AccountData = await staffApi.getByToken();
      formData.branch = AccountData.metadata.branch._id;
      formData.startTime = dayjs(date.format('YYYY-MM-DD') + ' ' + dayjs(values.startTime).format('HH:mm'), 'YYYY-MM-DD HH:mm');
      formData.endTime = dayjs(date.format('YYYY-MM-DD') + ' ' + dayjs(values.endTime).format('HH:mm'), 'YYYY-MM-DD HH:mm');
      console.log(formData);
    } catch (error) {
      console.log(error);
      return Swal.fire('Lỗi dữ liệu nhập vào', 'Vui lòng kiểm tra lại', 'error');
    }
    try {
      const created = await bookingApi.create(formData);
      // const metadata = created.metadata;
      if (created && created?.status === 201 && created?.metadata) {
        Swal.fire('Thành công!', '', 'success');
        navigation(Path.TourSchedule, { replace: true });
      }
    } catch (error) {
      return Swal.fire('Lỗi Server', '', 'error');
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
                <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} Tour</Typography>
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      onChange={(date) => setFieldValue('date', date)}
                      label="Ngày"
                      name="date"
                      value={values.date}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {values.date === '' && (
                  <FormHelperText sx={{ ml: 3 }} error>
                    Bắt buộc phải chọn ngày
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      sx={{ width: '100%' }}
                      onChange={(date) => setFieldValue('startTime', date)}
                      name="startTime"
                      value={values.startTime}
                      // maxTime={values.endTime || null}
                      label="Thời gian bắt đầu"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {values.startTime === null && (
                  <FormHelperText sx={{ ml: 3 }} error>
                    Thời gian kết thúc là bắt buộc
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      sx={{ width: '100%' }}
                      onChange={(date) => setFieldValue('endTime', date)}
                      name="endTime"
                      value={values.endTime}
                      minTime={values.startTime || null}
                      label="Thời gian Kết thúc"
                      disabled={!values.startTime}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {values.endTime === null && (
                  <FormHelperText sx={{ ml: 3 }} error>
                    Thời gian kết thúc là bắt buộc
                  </FormHelperText>
                )}{' '}
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="status"
                  name="status"
                  label="Trạng thái"
                  variant="outlined"
                  value={values.status}
                  select
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                >
                  <MenuItem value={1}>Khách chưa đến</MenuItem>
                  <MenuItem value={2}>Khách đã đến</MenuItem>
                  <MenuItem value={3}>Đã tạo bill</MenuItem>
                  <MenuItem value={4}>Khách không đến</MenuItem>
                  <MenuItem value={0}>Khách huỷ</MenuItem>
                </CssTextField>
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
                  id="tags-outlined"
                  options={services}
                  getOptionLabel={(option) => `${option.code} - ${option.name} - ${option.price / 1000}k - ${option.duration} phút`}
                  filterOptions={(options, { inputValue }) =>
                    options.filter(
                      (option) =>
                        option.code.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  onChange={handleServicesChange}
                  value={selectedServices.length > 0 ? selectedServices : []}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="Chọn nhiều dịch vụ *" placeholder={values.name} />}
                />
                {selectedServices !== '' && (
                  <FormHelperText sx={{ ml: 3 }} error>
                    {errorRequired.services}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                {' '}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={4}>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon></AddIcon>}
                        target="_blank"
                        component={Link}
                        to={Path.Customer + `/add`}
                      >
                        Tạo TK KH
                      </Button>
                    </CardActions>
                  </Grid>
                  <Grid item xs={8}>
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
                      getOptionLabel={(option) => `${option.fullname} - ${option.phone}`}
                      value={selectedAccount}
                      onChange={handleAccountChange}
                      renderInput={(params) => <CssTextField {...params} variant="outlined" label="Tài khoản khách hàng tích điểm" />}
                    />
                  </Grid>
                </Grid>
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
                  id="technician"
                  name="technician"
                  label="Yêu cầu kỹ thuật viên"
                  options={staffs}
                  getOptionLabel={(option) => `${option.username} - ${option.fullname}`}
                  value={selectedStaff}
                  onChange={handleStaffChange}
                  renderInput={(params) => <CssTextField {...params} variant="outlined" label="Yêu cầu kỹ thuật viên" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems={'center'}>
                  <Grid item xs={3}>
                    <Typography variant="h5">Khách đi cùng</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {selectedAccount && (
                      <FormControlLabel
                        sx={{ color: 'blue' }}
                        control={<Checkbox checked={checkedAccount} onChange={handleChangeCheckbox} />}
                        label="Bao gồm chủ tài khoản tham gia"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{mt: -1}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <FieldArray name="customerInfo">
                      {({ push, remove }) => (
                        <>
                          {values.customerInfo.map((_, index) => (
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} key={index}>
                              <Grid item xs={7}>
                                <Field
                                  as={CssTextField}
                                  fullWidth
                                  margin="normal"
                                  label={`Tên khách hàng ${index + 1}`}
                                  name={`customerInfo.${index}.name`}
                                  variant="outlined"
                                />
                                <ErrorMessage error={true} name={`customerInfo.${index}.name`} component={FormHelperText} />
                              </Grid>
                              <Grid item xs={3}>
                                <Field
                                  as={CssTextField}
                                  fullWidth
                                  margin="normal"
                                  label="Giới tính"
                                  name={`customerInfo.${index}.gender`}
                                  variant="outlined"
                                  select
                                >
                                  <MenuItem value="nam">Nam</MenuItem>
                                  <MenuItem value="nữ">Nữ</MenuItem>
                                  <MenuItem value="khác">Khác</MenuItem>
                                </Field>
                                <ErrorMessage error={true} name={`customerInfo.${index}.gender`} component={FormHelperText} />
                              </Grid>

                              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                  sx={{ maxHeight: '40px', mt: 2 }}
                                  variant="outlined"
                                  color="error"
                                  onClick={() => remove(index)}
                                  // disabled={values.customerInfo.length === 1}
                                >
                                  <RemoveCircleOutlineIcon />
                                </Button>
                              </Grid>
                            </Grid>
                          ))}
                          <Grid item xs={12} sx={{ mt: 1 }}>
                            <Grid container justifyContent={'space-between'}>
                              <Grid item xs={6}>
                                <Button sx={{ mt: 1 }} variant="outlined" color="primary" onClick={() => push({ name: '', gender: '' })}>
                                  <AddCircleOutlineIcon></AddCircleOutlineIcon> Thêm khách
                                </Button>
                              </Grid>
                              <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                                <CssTextField
                                  margin="dense"
                                  id="customersNumber"
                                  name="customersNumber"
                                  label="Tổng số khách hàng"
                                  variant="outlined"
                                  value={values.customerInfo.length + isCus}
                                  error={touched.customersNumber && Boolean(errors.customersNumber)}
                                  helperText={touched.customersNumber && errors.customersNumber}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="normal"
                      id="note"
                      name="note"
                      label="Ghi chú"
                      variant="outlined"
                      value={values.note}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.note && Boolean(errors.note)}
                      helperText={touched.note && errors.note}
                    />
                  </Grid>
                </Grid>
              </Grid>
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

export default TourForm;
