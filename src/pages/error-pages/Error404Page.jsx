import React from 'react';
import { Typography, Container, Grid, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NOTFOUND from 'assets/images/others/404.png';
const Error404Page = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid xs={6} alignItems="center" container>
            <Container  sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">Trang bạn đang tìm kiếm không tồn tại.</Typography>
              <Button sx={{ mt: 2, width: "300px" }} variant="contained" onClick={handleGoBack}>
                Quay về trang trước
              </Button>
              <Button sx={{ mt: 2, width: "300px" }} variant="contained" LinkComponent={Link} to="/">
                Trang chủ
              </Button>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <img src={NOTFOUND} alt="" height={500} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Error404Page;
