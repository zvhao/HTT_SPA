import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography, styled, MenuItem, Button } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { branchApi } from 'api';
import { Path } from 'constant/path';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NumericFormat from 'react-number-format';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormikContext, useField } from 'formik';

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
      valueIsNumericString
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
    position: 'Manager',
    password: 'Hao291001',
    consultingCommission: 10,
    serviceCommission: 10,
    allowances: [{ name: '', allowance: '' }],
    workTime: [
      {
        startDate: '2023-08-30',
        weekSchedule: [
          { day: 'Monday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Tuesday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Wednesday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Thursday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Friday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Saturday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
          { day: 'Sunday', startTime: dayjs('2023-08-07T09:00'), endTime: dayjs('2023-08-07T20:00'), checked: true },
        ],
      },
    ],
    roles: '64f5c9952c268c9c00c1fe33',
    branches: '650007e9c31b396b0f6ef13d'
  });


  useEffect(() => {
    const getOneStaff = async (id) => {
      if (isEditMode) {
        try {
          // const oneBranchData = await branchApi.getById(id);
          // const newOneBranchData = { ...oneBranchData.metadata };
          // newOneBranchData.startTime = dayjs(oneBranchData.metadata.startTime, 'HH:mm');
          // newOneBranchData.endTime = dayjs(oneBranchData.metadata.endTime, 'HH:mm');
          // setInitialValues(newOneBranchData);
          // return newOneBranchData;
        } catch (error) {
          // console.log(error);
        }
      }

    };
    getOneStaff(id);
  }, []);

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
    // const newdata = { ...values };
    // newdata.startTime = dayjs(values.startTime).format('HH:mm');
    // newdata.endTime = dayjs(values.endTime).format('HH:mm');
    // alert(JSON.stringify(values, null, 4));
    console.log(JSON.stringify(values, null, 4));
    if (isEditMode) {
      try {
        // console.log(newdata);
        // const rs = await branchApi.update(id, newdata);
        // navigation(Path.Branch, { replace: true });
        // return rs
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // const rs = await branchApi.create(newdata);
        // navigation(Path.Branch, { replace: true });
        // console.log(rs);
        // return rs
      } catch (error) {
        console.error(error);
      }
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
          <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
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
                    <CssTextField
                      fullWidth
                      margin="dense"
                      id="branch"
                      name="branch"
                      label="Chi nhánh"
                      variant="outlined"
                      value={values.branch}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      <MenuItem value="manager">Nhân viên quản lý</MenuItem>
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
                      label="Họ tên quản lý"
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
                    {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="namAllowance"
                          name="namAllowance"
                          label="Phụ cấp 1"
                          variant="outlined"
                          value={values.namAllowance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CssTextField
                          fullWidth
                          margin="dense"
                          id="moneyAllowance"
                          name="moneyAllowance"
                          label="Khoản tiền"
                          variant="outlined"
                          value={values.moneyAllowance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{ '& > label': { lineHeight: 'normal' } }}
                          InputProps={{
                            inputComponent: NumericFormatCustom
                          }}
                        />
                      </Grid>
                    </Grid> */}
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
