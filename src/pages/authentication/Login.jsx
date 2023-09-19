import { Link, useSearchParams } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import { useEffect } from 'react';

// ================================|| LOGIN ||================================ //
const Login = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">
              Đăng nhập với <br></br> {role === 'owner' ? 'Chủ SPA' : 'Nhân viên'}
            </Typography>
            <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Không có tài khoản?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin role={role} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
