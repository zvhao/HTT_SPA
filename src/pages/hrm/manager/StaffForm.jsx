import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { branchApi, staffApi } from 'api';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NumericFormat from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

dayjs.extend(utc);
dayjs.extend(timezone);

const validationSchema = yup.object({});
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
      valueisnumericstring="true"
      suffix=" VND"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const StaffForm = () => {
  const CssTextField = styled(TextField)({ '& > div > input': { lineHeight: 2 }, '& > label': { lineHeight: 'normal' } });

  //
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigation = useNavigate();

  const [initialValues, setInitialValues] = useState({
    fullname: 'Huynh Thanh Thuong',
    username: 'qlcn0101',
    phone: '0939410692',
    email: 'huynhthanhthuong0910@gmail.com',
    address: 'Can Tho',
    numPaidLeave: 2,
    basicSalary: 4000000,
    position: '',
    password: 'Hao291001',
    consultingCommission: 10,
    serviceCommission: 10,
    allowances: [{ name: '', allowance: '' }],
    workTime: [
      {
        startDate: dayjs(),
        weekSchedule: [
          { day: 'Monday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Tuesday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Wednesday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Thursday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Friday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Saturday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Sunday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00', 'HH:mm'), checked: true }
        ]
      }
    ],
    role: '651582fb9dce25997d637c13',
    branch: ''
  });

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [role, setRole] = useState([]);

  useEffect(() => {
    const getOneStaff = async (id) => {
      try {
        const role = JSON.parse(localStorage.getItem('data')).role;
        setRole(role);
        if (isEditMode) {
          try {
            const oneStaffData = await staffApi.getById(id);
            if (oneStaffData.metadata) {
              const newOneStaffData = { ...oneStaffData.metadata };
              const dataWorkTime = newOneStaffData.workTime.pop();

              const formattedData = {
                ...dataWorkTime,
                startDate: dayjs(),
                weekSchedule: dataWorkTime.weekSchedule.map((schedule) => ({
                  ...schedule,
                  startTime: dayjs(schedule.startTime),
                  endTime: dayjs(schedule.endTime)
                }))
              };
              newOneStaffData.workTime = [formattedData];
              // console.log(JSON.stringify(formattedData, null, 4));
              const branchData = await branchApi.getById(newOneStaffData.branch);
              setSelectedBranch(branchData.metadata);

              setInitialValues(newOneStaffData);
              // console.log(initialValues)
            } else {
              console.log('loi');
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {}
    };
    const fetchBranches = async () => {
      try {
        const branchesData = await branchApi.fetchData();
        setBranches(branchesData.metadata);
      } catch (error) {}
    };
    fetchBranches();
    getOneStaff(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBranchChange = (event, value) => {
    setSelectedBranch(value);
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
    const newdata = { ...values };
    console.log(JSON.stringify(newdata, null, 4));
    if (selectedBranch && selectedBranch !== null) {
      newdata.branch = selectedBranch._id;
      if (isEditMode) {
        try {
          const rs = await staffApi.update(id, newdata);
          if (rs && rs.status === 200) {
            alert(rs.message);
            navigation(Path.Staff, { replace: true });
          } else {
            console.log('Error');
          }

          // console.log(JSON.stringify(rs, null, 4));

          // return rs
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const rs = await staffApi.create(newdata);
          // console.log(JSON.stringify(rs, null, 4));
          if (rs.metadata) {
            navigation(Path.Staff, { replace: true });
          }

          // console.log(rs);
          // return rs;
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    } else {
      alert('khong co branch');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Typography variant="h4">{isEditMode ? 'Cập nhật' : 'Thêm'} nhân viên</Typography>
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }} sx={{ padding: 1 }}>
              <Grid item xs={6}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="username"
                      name="username"
                      label="Username"
                      variant="outlined"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {/* <CssTextField
                      fullWidth
                      margin="dense"
                      id="branch"
                      name="branch"
                      label="Chi nhánh"
                      variant="outlined"
                      value={values.branch}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    /> */}
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
                      id="branch"
                      name="branch"
                      options={branches}
                      getOptionLabel={(option) => option.code}
                      value={selectedBranch}
                      onChange={handleBranchChange}
                      renderInput={(params) => (
                        <CssTextField
                          {...params}
                          variant="outlined"
                          label="Chi nhánh"
                          error={touched.manager && Boolean(errors.manager)}
                          helperText={touched.manager && errors.manager}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={handleTogglePassword}>
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="position"
                      name="position"
                      label="Vị trí"
                      variant="outlined"
                      select
                      value={values.position}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      {role === 'owner' ? <MenuItem value="manager">Nhân viên quản lý</MenuItem> : ''}
                      <MenuItem value="technicians">Kĩ thuật viên</MenuItem>
                      <MenuItem value="receptionists">Lễ tân</MenuItem>
                      <MenuItem value="counselors">Tư vấn viên</MenuItem>
                      <MenuItem value="otherStaff">Nhân viên khác</MenuItem>
                    </CssTextField>
                  </Grid>

                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="fullname"
                      name="fullname"
                      label="Họ tên nhân viên"
                      variant="outlined"
                      value={values.fullname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="phone"
                      name="phone"
                      label="Số điện thoại"
                      variant="outlined"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="basicSalary"
                          name="basicSalary"
                          label="Lương cơ bản"
                          variant="outlined"
                          value={values.basicSalary}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            inputComponent: NumericFormatCustom
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="consultingCommission"
                          name="consultingCommission"
                          label="Hoa hồng tư vấn"
                          variant="outlined"
                          value={values.consultingCommission}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="start">%</InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="numPaidLeave"
                          name="numPaidLeave"
                          label="Số ngày nghỉ phép có lương"
                          variant="outlined"
                          type="number"
                          value={values.numPaidLeave}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">/tháng</InputAdornment>
                          }}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="serviceCommission"
                          name="serviceCommission"
                          label="Hoa hồng dịch vụ"
                          variant="outlined"
                          value={values.serviceCommission}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="start">%</InputAdornment>
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray name="allowances">
                      {({ push, remove }) => (
                        <div>
                          {values.allowances.map((allowance, index) => (
                            <Grid container key={index} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                              <Grid item xs={6}>
                                <Field
                                  as={CssTextField}
                                  fullWidth
                                  margin="dense"
                                  id={`allowances[${index}].name`}
                                  name={`allowances[${index}].name`}
                                  label={`Phụ cấp ${index + 1}`}
                                  variant="outlined"
                                  value={allowance.name}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  sx={{ '& > label': { lineHeight: 'normal' } }}
                                />
                                <ErrorMessage name={`allowances[${index}].name`} component="div" />
                              </Grid>
                              <Grid item xs={6}>
                                <Field
                                  as={CssTextField}
                                  fullWidth
                                  margin="dense"
                                  id={`allowances[${index}].allowance`}
                                  name={`allowances[${index}].allowance`}
                                  label="Khoản tiền"
                                  variant="outlined"
                                  value={allowance.allowance}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  sx={{ '& > label': { lineHeight: 'normal' } }}
                                  InputProps={{
                                    endAdornment: (
                                      <Button type="button" onClick={() => remove(index)}>
                                        Xóa
                                      </Button>
                                    ),
                                    inputComponent: NumericFormatCustom
                                  }}
                                />
                                <ErrorMessage name={`allowances[${index}].allowance`} component="div" />
                              </Grid>
                            </Grid>
                          ))}
                          <Button type="button" onClick={() => push({ name: '', allowance: '' })}>
                            Thêm khoản phụ cấp
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6} mt={2}>
                <Grid container>
                  <Grid item sx={{ display: 'inline-flex', justifyContent: 'space-between', mb: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                        {/* <Grid item xs={12}>
                          <Field type="checkbox" name="workTime[0].selectAllDays" as={Checkbox} />
                          Tất cả các ngày
                        </Grid> */}
                        <FieldArray name="workTime[0].weekSchedule">
                          <>
                            {values.workTime[0].weekSchedule.map((schedule, index) => (
                              <Grid container key={index} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                                <Grid item xs={3} sx={{ mb: 2 }}>
                                  <FormControlLabel
                                    sx={{ pl: 3 }}
                                    label={schedule.day}
                                    control={
                                      <Checkbox
                                        checked={values.workTime[0].weekSchedule[index].checked}
                                        onChange={() => {
                                          const checked = values.workTime[0].weekSchedule[index].checked;
                                          setFieldValue(`workTime[0].weekSchedule[${index}].checked`, !checked);
                                          if (!checked) {
                                            setFieldValue(`workTime[0].weekSchedule[${index}].startTime`, dayjs('2023-08-07T09:00'));
                                            setFieldValue(`workTime[0].weekSchedule[${index}].endTime`, dayjs('2023-08-07T20:00'));
                                          } else {
                                            setFieldValue(`workTime[0].weekSchedule[${index}].startTime`, null);
                                            setFieldValue(`workTime[0].weekSchedule[${index}].endTime`, null);
                                          }
                                        }}
                                      />
                                    }
                                  />
                                </Grid>
                                <Grid item xs={9} sx={{ mb: 2 }}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                                      <Grid item xs={6}>
                                        <TimePicker
                                          label="Thời gian bắt đầu"
                                          name={`workTime[0].weekSchedule[${index}].startTime`}
                                          value={values.workTime[0].weekSchedule[index].startTime}
                                          onChange={(value) => setFieldValue(`workTime[0].weekSchedule[${index}].startTime`, value)}
                                          disabled={!values.workTime[0].weekSchedule[index].checked}
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <TimePicker
                                          label="Thời gian kết thúc"
                                          name={`workTime[0].weekSchedule[${index}].endTime`}
                                          value={values.workTime[0].weekSchedule[index].endTime}
                                          onChange={(value) => setFieldValue(`workTime[0].weekSchedule[${index}].endTime`, value)}
                                          disabled={!values.workTime[0].weekSchedule[index].checked}
                                        />
                                      </Grid>
                                    </Grid>
                                  </LocalizationProvider>
                                </Grid>
                              </Grid>
                            ))}
                          </>
                        </FieldArray>
                      </Grid>
                    </LocalizationProvider>
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
    </Box>
  );
};

export default StaffForm;
