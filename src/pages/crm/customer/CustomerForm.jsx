import { LoadingButton } from '@mui/lab';
import { Grid, MenuItem, TextField, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { customerApi } from 'api';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import enGB from 'date-fns/locale/en-GB';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Swal from 'sweetalert2';
import { Path } from 'constant/path';
import cusLevel from 'utils/cusLevel';
dayjs.extend(utc);
dayjs.extend(timezone);

const validationSchema = yup.object({
  fullname: yup.string().required('Tên khách hàng là bắt buộc'),
  phone: yup.string().required('Số điện thoại khách hàng là bắt buộc'),
  //   email: yup.string().required('Email khách hàng là bắt buộc'),
  customerLevel: yup.string().required('Hạng thành viên là bắt buộc'),
  gender: yup.string().required('Giới tính là bắt buộc'),
  birthday: yup.date().required('Sinh nhật là bắt buộc'),
  address: yup.string().required('Địa chỉ khách hàng là bắt buộc')
});

const CustomerForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();

  const [initialValues, setInitialValues] = useState({
    code: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    birthday: new Date(),
    gender: 'nữ',
    password: '',
    customerLevel: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPwd, setIsPwd] = useState('Mật khẩu (bỏ trống nếu không tạo TK đăng nhập cho khách hàng)');
  const [getScore, setGetScore] = useState(0);

  // const [allCustomers, setAllCustomers] = useState([]);
  // const [code, setCode] = useState();
  useEffect(() => {
    const renderCus = async (id) => {
      if (isEditMode) {
        try {
          const oneCustomer = await customerApi.getById(id);
          if (oneCustomer && oneCustomer?.metadata) {
            const metadata = oneCustomer.metadata;
            const birthday = new Date(metadata.birthday);
            const password = '';
            if (metadata.password === '') {
              setIsPwd('Mật khẩu (bỏ trống nếu không tạo TK đăng nhập cho khách hàng)');
            } else {
              setIsPwd('Mật khẩu (Khách hàng đã tạo tài khoản đăng nhập)');
            }
            let data = { ...metadata, birthday, password };
            setInitialValues(data);
            setGetScore(metadata.score);

            // console.log(oneCustomer.metadata);
          }
        } catch (error) {}
      } else {
        try {
          const fetchData = await customerApi.fetchData();
          // console.log(fetchData.metadata.length);
          // setAllCustomers(fetchData.metadata);
          const keys = Object.keys(fetchData.metadata);
          const count = keys.length;
          const code = `KH${String(count + 1).padStart(9, '0')}`;
          // console.log(code);
          // setCode(code);
          setInitialValues({ ...initialValues, code });
        } catch (error) {}
      }
    };
    renderCus(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onChangeScore = async (event) => {
  //   const data = event.target.value;
  //   console.log(data);
  //   cusLevel.setLevel(data);
  // };
  const onChangeLevel = async (event) => {
    const data = event.target.value;
    const score = await cusLevel.setMininumScore(parseInt(data));
    setGetScore(score);
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
    const newValues = { ...values, score: getScore };
    if (isEditMode) {
      try {
        const updateData = await customerApi.update(id, newValues);
        if (updateData && updateData?.metadata) {
          const metadata = updateData.metadata;

          console.log(metadata);
          setIsLoading(false);
          Swal.fire({
            title: 'Thành công!',
            icon: 'success'
          });
          navigation(Path.Customer, { replace: true });
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        Swal.fire({
          title: 'Lỗi rồi!',
          icon: 'error'
        });
      }
    } else {
      try {
        const createData = await customerApi.create(newValues);
        if (createData && createData?.metadata) {
          const metadata = createData.metadata;

          console.log(metadata);
          setIsLoading(false);
          Swal.fire({
            title: 'Thành công!',
            icon: 'success'
          });
          navigation(Path.Customer, { replace: true });
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        Swal.fire({
          title: 'Lỗi rồi!',
          icon: 'error'
        });
      }
    }
    console.log(values);
  };
  return (
    <MainCard>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} khách hàng</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
              <Grid item xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="code"
                      name="code"
                      label="code"
                      disabled
                      variant="outlined"
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.code && Boolean(errors.code)}
                      helperText={touched.code && errors.code}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="fullname"
                      name="fullname"
                      label="Họ tên khách hàng"
                      variant="outlined"
                      value={values.fullname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.fullname && Boolean(errors.fullname)}
                      helperText={touched.fullname && errors.fullname}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="phone"
                      name="phone"
                      label="Số điện thoại (dùng đăng nhập)"
                      variant="outlined"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="email"
                      name="email"
                      label="email"
                      variant="outlined"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="password"
                      name="password"
                      // label="Mật khẩu (bỏ trống nếu không cần tạo tài khoản đăng nhập cho KH)"
                      label={isPwd}
                      variant="outlined"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="gender"
                      name="gender"
                      label="Giới tính"
                      variant="outlined"
                      select
                      value={values.gender}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.gender && Boolean(errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <MenuItem value="nam">Nam</MenuItem>
                      <MenuItem value="nữ">Nữ</MenuItem>
                      <MenuItem value="khác">Khác</MenuItem>
                    </CssTextField>
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                      <DatePicker
                        sx={{ mt: 1, mb: 1, width: '100%' }}
                        name="birthday"
                        id="birthday"
                        label="Sinh nhật"
                        value={values.birthday}
                        views={['year', 'month', 'day']}
                        onBlur={handleBlur}
                        onChange={(date) => {
                          setFieldValue('birthday', date); // Cập nhật giá trị birthday bằng setFieldValue
                        }}
                        maxDate={new Date()}
                        error={touched.birthday && Boolean(errors.birthday)}
                        helperText={touched.birthday && errors.birthday}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="customerLevel"
                      name="customerLevel"
                      label="Hạng thành viên"
                      // disabled
                      select
                      variant="outlined"
                      value={values.customerLevel}
                      onBlur={handleBlur}
                      onChange={(event) => {
                        handleChange(event); // Gọi hàm handleChange mặc định
                        onChangeLevel(event);
                      }}
                      error={touched.customerLevel && Boolean(errors.customerLevel)}
                      helperText={touched.customerLevel && errors.customerLevel}
                    >
                      <MenuItem value={1}>Đồng</MenuItem>
                      <MenuItem value={2}>Bạc</MenuItem>
                      <MenuItem value={3}>Vàng</MenuItem>
                      <MenuItem value={4}>Kim cương</MenuItem>
                    </CssTextField>
                  </Grid>
                  <Grid item xs={3}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="score"
                      name="score"
                      label="Điểm thành viên"
                      variant="outlined"
                      disabled
                      value={getScore}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.score && Boolean(errors.score)}
                      helperText={touched.score && errors.score}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="address"
                      name="address"
                      label="Địa chỉ"
                      variant="outlined"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
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
export default CustomerForm;
