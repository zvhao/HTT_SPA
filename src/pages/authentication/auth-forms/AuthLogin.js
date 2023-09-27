import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { ownerApi, staffApi } from 'api';
import { Path } from 'constant/path';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/reducers/user';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ role }) => {
  // const user = useSelector((state) => state.user);
  const toPath = role === 'owner' ? '/login' : '/login?role=owner';
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigation = useNavigate();

  const handleSubmit = async (values) => {
    try {
      let result;
      if (role === 'owner') {
        result = await ownerApi.login(values.username, values.password);
        // console.log(role);
      } else {
        role = 'staff';
        result = await staffApi.login(values.username, values.password);
        // console.log('staff');
      }
      if (result && result.error) {
        setError(result.error);
      }
      if (result && result.status === 200 && result.metadata) {
        // console.log(result.metadata.user);
        const token = result.metadata.token;
        const user = result.metadata.user;
        const data = {
          username: user,
          token: token,
          role: role
        };
        localStorage.setItem('data', JSON.stringify(data));
        dispatch(setUser(data));
        // console.log(user);
        navigation(Path.Index, { replace: true });
      }
      // console.log(result); // Xử lý kết quả đăng nhập từ backend
    } catch (error) {
      // setError(error.response.data.message)
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('username là bất buộc'),
          password: Yup.string().max(255).required('Mật khẩu là bắt buộc')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
            handleSubmit(values);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    // type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập username"
                    fullWidth
                    autoComplete="off"
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-username-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    autoComplete="off"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Nhập Mật khẩu"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Giữ đăng nhập</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Quên mật khẩu?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              {error && (
                <FormHelperText sx={{ paddingLeft: '20px', fontSize: '14px' }} error>
                  {error}
                </FormHelperText>
              )}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Đăng nhập
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Đăng nhập với quyền </Typography>
                  <Link variant="h6" component={RouterLink} to={toPath} sx={{ textDecoration: 'none' }}>
                    {role === 'owner' ? 'Nhân viên' : 'Chủ SPA'}
                  </Link>
                </Divider>
              </Grid>
              {/* <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
