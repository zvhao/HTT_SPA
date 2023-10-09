import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { Path } from 'constant/path';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import NumericFormat from 'react-number-format';
import ReactQuill from 'react-quill';
import { Link, useNavigate, useParams } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import * as yup from 'yup';
import EditorToolbar, { formats, modules } from '../../../components/quill-editor/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import "./App.css";
import { LoadingButton } from '@mui/lab';
import { serviceApi, serviceTypeApi } from 'api';
import 'react-quill/dist/quill.snow.css';

const validationSchema = yup.object({
  // code: yup.string().required('Mã dịch vụ là bắt buộc'),
  name: yup.string().required('Tên dịch vụ là bắt buộc')
});
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
      suffix=" VND"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
const ServiceTypeForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [serviceCount, setServiceCount] = useState(0);
  const [serviceCode, setServiceCode] = useState('');
  const [errorApi, setErrorApi] = useState(null);
  const [desc, setDesc] = useState({ value: '<h1>Hello</h1>' });
  const handleChangeDesc = (content) => {
    setDesc({ value: content });
  };
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [searchValue, setSearchValue] = useState('');

  const [initialValues, setInitialValues] = useState({
    name: '',
    desc: ''
  });

  useEffect(() => {
    const generateServiceCode = async () => {
      try {
        const result = await serviceTypeApi.fetchData();
        const keys = Object.keys(result.metadata);
        const count = keys.length;
        setServiceCount(count);
        const code = `LDV${String(serviceCount + 1).padStart(3, '0')}`;
        setServiceCode(code);
        // console.log(result);
      } catch (error) {}
    };

    const getOneService = async (id) => {
      if (isEditMode) {
        const serviceApiGetById = await serviceApi.getById(id);
        const oneServiceData = { ...serviceApiGetById.metadata };
        // oneServiceData.desc = desc;
        setDesc({ value: oneServiceData.desc });
        setServiceCode(oneServiceData.code);
        setInitialValues(oneServiceData);
        console.log('data:', oneServiceData);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    };
    const fetchServices = async () => {
      try {
        const serviceData = await serviceApi.fetchData();
        // console.log(serviceData.metadata);
        setServices(serviceData.metadata);
      } catch (error) {
        console.log(error);
      }
    };

    generateServiceCode();
    getOneService(id);
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceCount, isEditMode, id]);

  const handleServiceChange = (event, value) => {
    setSelectedService(value);
  };

  const handleSearch = async () => {
    // Gửi mã code lên backend để tìm kiếm các dịch vụ phù hợp
    // và cập nhật danh sách dịch vụ
    // Ví dụ:
    const serviceData = await serviceApi.getById(searchValue);
    setServices(serviceData.metadata);
  };

  const handleAddRow = () => {
    // Thêm một hàng mới vào bảng
    setServices((prevServices) => [...prevServices, '']);
  };
  const handleDeleteRow = (index) => {
    // Xoá một hàng khỏi bảng
    setServices((prevServices) => prevServices.filter((_, i) => i !== index));
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
    // alert(JSON.stringify(values, null, 4));
    const data = { ...values };
    data.code = serviceCode;
    // console.log(data);
    if (isEditMode) {
      // try {
      //   data.desc = desc.value;
      //   const rs = await serviceApi.update(id, data);
      //   console.log(rs);
      //   navigation(Path.Service, { replace: true });
      //   return rs;
      // } catch (error) {
      //   console.error(error);
      // }
    } else {
      try {
        data.services = [];
        console.log(data);

        // const rs = await serviceApi.create(data);
        // navigation(Path.Service, { replace: true });
        // return rs;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} dịch vụ</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="code"
                  name="code"
                  label="Mã dịch vụ"
                  variant="outlined"
                  value={serviceCode}
                  disabled
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
                  id="name"
                  name="name"
                  label="Tên loại dịch vụ"
                  variant="outlined"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="desc"
                  name="desc"
                  label="Mô tả ngắn"
                  variant="outlined"
                  value={values.desc}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.desc && Boolean(errors.desc)}
                  helperText={touched.desc && errors.desc}
                />
              </Grid>
              <Grid item xs={6}>
                <CardActions sx={{ justifyContent: 'end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to={Path.Service + `/add`}
                    target="_blank"
                  >
                    Thêm dịch vụ mới
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="center">Tên dịch vụ</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>1</TableCell>
                    <TableCell>
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
                        id="service"
                        name="service"
                        label="Nhân viên"
                        options={services}
                        getOptionLabel={(option) => option.name || option.code}
                        value={selectedService}
                        onChange={handleServiceChange}
                        renderInput={(params) => <CssTextField {...params} variant="outlined" label="Dịch vụ" />}
                      />
                    </TableCell>
                    <TableCell>
                      <CardActions sx={{ justifyContent: 'end' }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          // onClick={handleDeleteRow}
                        >
                          Xoá
                        </Button>
                      </CardActions>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>1</TableCell>
                    <TableCell>
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
                        id="service"
                        name="service"
                        options={services}
                        getOptionLabel={(option) => option.name || option.code}
                        value={selectedService}
                        onChange={handleServiceChange}
                        renderInput={(params) => <CssTextField {...params} variant="outlined" label="Dịch vụ" />}
                      />
                    </TableCell>
                    <TableCell>
                      <CardActions sx={{ justifyContent: 'end' }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          // onClick={handleDeleteRow}
                        >
                          Xoá
                        </Button>
                      </CardActions>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Button fullWidth size="large" variant="outlined" color="primary" startIcon={<AddIcon />}></Button>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>

            <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isSubmitting} variant="contained">
              <span>Gửi</span>
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ServiceTypeForm;
