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
import { bookingApi, comboApi, courseApi, customerApi, sellingCourseApi, serviceApi, staffApi } from 'api';
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
import formatCurrency from 'utils/formatCurrency';
import getStatusSellingCourseString from 'utils/getStatusSellingCourseString';

const validationSchema = yup.object({});

const SellingCourseForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [initialValues, setInitialValues] = useState({});

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [packageDetails, setPackageDetails] = useState([]);
  const [selectedPackageDetail, setSelectedPackageDetail] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  useEffect(() => {
    const getOneSellingCourse = async () => {
      if (isEditMode) {
        try {
          const fetchData = await sellingCourseApi.getById(id);
          let metadata = fetchData.metadata;
          setInitialValues(metadata);
          setSelectedCourse(metadata.course);
          setPackageDetails(metadata.course.package_details);
          setSelectedPackageDetail(metadata.package_detail);
          if (Object.keys(metadata.account).length !== 0) {
            setSelectedAccount(metadata.account);
          }
          console.log(metadata);
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
    getOneSellingCourse();
    getAllCourses();
    getAllAccounts();
  }, []);

  const handleCourseChange = (event, value) => {
    // console.log(value);
    setSelectedCourse(value);
    if (value !== null) {
      setPackageDetails(value.package_details);
    } else {
      setPackageDetails([]);
    }
  };
  const handlePackageDetailChange = (event, value) => {
    // console.log(value);
    setSelectedPackageDetail(value);
  };
  const handleAccountChange = (event, value) => {
    // console.log(value);
    setSelectedAccount(value);
  };
  const handleSubmit = async (values) => {
    console.log(values);
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
                  renderInput={(params) => <CssTextField {...params} variant="outlined" label="Gói - liệu trình" />}
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
