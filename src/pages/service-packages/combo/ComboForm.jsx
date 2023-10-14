import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
import PropTypes, { number } from 'prop-types';
import React, { useEffect, useState } from 'react';
import NumericFormat from 'react-number-format';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
// import "./App.css";
import { LoadingButton } from '@mui/lab';
import { serviceApi, comboApi } from 'api';
import 'react-quill/dist/quill.snow.css';
import formatCurrency from 'utils/formatCurrency';

const validationSchema = yup.object({
  // code: yup.string().required('Mã dịch vụ là bắt buộc'),
  name: yup.string().required('Tên combo là bắt buộc'),
  price: yup.number().required('Giá combo là bắt buộc').min(0, 'Giá combo phải lớn hơn hoặc bằng 0'),
  duration: yup.number().required('Thời gian combo là bắt buộc').min(0, 'Thời gian combo phải lớn hơn hoặc bằng 0'),
  technicianCommission: yup.number().required('Hoa hồng là bắt buộc').min(0, 'Hoa hồng phải lớn hơn hoặc bằng 0'),
  consultingCommission: yup.number().required('Hoa hồng là bắt buộc').min(0, 'Hoa hồng phải lớn hơn hoặc bằng 0')
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
const ComboForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();
  const [comboCount, setComboCount] = useState(0);
  const [comboCode, setComboCode] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [initialValues, setInitialValues] = useState({
    name: '',
    price: '',
    duration: '',
    technicianCommission: 0,
    consultingCommission: 0,
    desc: ''
  });

  useEffect(() => {
    const generatecomboCode = async () => {
      if (!isEditMode) {
        try {
          const result = await comboApi.fetchData();
          const keys = Object.keys(result.metadata);
          const count = keys.length;
          setComboCount(count);
          const code = `CB${String(comboCount + 1).padStart(3, '0')}`;
          setComboCode(code);
          // console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getOnecombo = async (id) => {
      if (isEditMode) {
        const comboApiGetById = await comboApi.getById(id);
        const onecomboData = { ...comboApiGetById.metadata };
        console.log('getOneData:', onecomboData);
        setSelectedServices(onecomboData.services);
        setComboCode(onecomboData.code);
        setInitialValues(onecomboData);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    };
    const fetchServices = async () => {
      try {
        const serviceData = await serviceApi.fetchData();
        setServices(serviceData.metadata);
      } catch (error) {
        console.log(error);
      }
    };

    generatecomboCode();
    getOnecombo(id);
    fetchServices();
  }, [comboCount, isEditMode, id]);

  const handleServiceChange = (event, value) => {
    setSelectedServices(value);
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
    data.code = comboCode;
    data.price = parseInt(values.price);
    data.duration = parseInt(values.duration);
    if (selectedServices.length > 0) {
      const servicesArray = selectedServices.map((service) => service._id);
      data.services = servicesArray;
    } else {
      data.services = [];
    }
    // console.log(data);
    if (isEditMode) {
      try {
        const rs = await comboApi.update(id, data);
        navigation(Path.Combo, { replace: true });
        return rs;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log(data);
        const rs = await comboApi.create(data);
        navigation(Path.Combo, { replace: true });
        return rs;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} combo</Typography>
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
                  label="Mã combo"
                  variant="outlined"
                  value={comboCode}
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
                  label="Tên combo"
                  variant="outlined"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  label="Giá"
                  // value={values.numberformat}
                  // onChange={handleChange}
                  name="price"
                  id="price"
                  InputProps={{
                    inputComponent: NumericFormatCustom
                  }}
                  variant="outlined"
                  value={values.price}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="duration"
                  name="duration"
                  label="Thời gian"
                  variant="outlined"
                  type="number"
                  value={values.duration}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.duration && Boolean(errors.duration)}
                  helperText={touched.duration && errors.duration}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">Phút</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="technicianCommission"
                  name="technicianCommission"
                  label="% Tour Kỹ thuật viên"
                  type="number"
                  variant="outlined"
                  value={values.technicianCommission}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.technicianCommission && Boolean(errors.technicianCommission)}
                  helperText={touched.technicianCommission && errors.technicianCommission}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <CssTextField
                  fullWidth
                  margin="dense"
                  id="consultingCommission"
                  name="consultingCommission"
                  label="% tư vấn"
                  type="number"
                  variant="outlined"
                  value={values.consultingCommission}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.consultingCommission && Boolean(errors.consultingCommission)}
                  helperText={touched.consultingCommission && errors.consultingCommission}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>
                  }}
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
                <Autocomplete
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-input': { lineHeight: 2, p: '10.5px 14px 10.5px 12px' },
                    '&': { mt: 1, p: 0 },
                    '& .MuiOutlinedInput-root': { pt: '0px', pb: '6px' },
                    '& .MuiInputLabel-root': { lineHeight: 'normal' },
                    '& .MuiAutocomplete-endAdornment': { top: '50%', transform: 'translate(0, -50%)' }
                  }}
                  multiple
                  id="tags-outlined"
                  options={services}
                  getOptionLabel={(option) => `${option.code} - ${option.name}`}
                  filterOptions={(options, { inputValue }) =>
                    options.filter(
                      (option) =>
                        option.code.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  onChange={handleServiceChange}
                  value={selectedServices.length > 0 ? selectedServices : []}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="Chọn nhiều dịch vụ" placeholder={values.name} />}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12} mt={2}>
                {selectedServices && selectedServices.length !== 0 && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell width="100px" align="center">
                            STT
                          </TableCell>
                          <TableCell align="center">Mã dịch vụ</TableCell>
                          <TableCell align="center">Tên dịch vụ</TableCell>
                          <TableCell align="center">Giá</TableCell>
                          <TableCell align="center">Thời gian</TableCell>
                          <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedServices.map((service, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">
                              {service.code}
                            </TableCell>
                            <TableCell align="center">{service.name}</TableCell>
                            <TableCell align="center">{formatCurrency(service.price)}</TableCell>
                            <TableCell align="center">{service.duration} phút</TableCell>
                            <TableCell align="center">
                              <Button
                                size="medium"
                                variant="contained"
                                target="_blank"
                                component={Link}
                                to={`${Path.Service}/edit/${service._id}`}
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </Grid>

            <LoadingButton sx={{ mt: 3 }} type="submit" fullWidth size="large" loading={isSubmitting} variant="contained">
              <span>Gửi</span>
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ComboForm;
