import React from 'react';
import { Typography, Container, Grid, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FORBIDDEN from 'assets/images/others/403.png';

const Error403Page = () => {
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
              <Typography variant="h1">403</Typography>
              <Typography variant="h6">Bạn không có quyền truy cập.</Typography>
              <Button sx={{ mt: 2, width: "300px" }} variant="contained" onClick={handleGoBack}>
                Quay về trang trước
              </Button>
              <Button sx={{ mt: 2, width: "300px" }} variant="contained" LinkComponent={Link} to="/">
                Trang chủ
              </Button>
            </Container>
          </Grid>
          <Grid xs={6}>
            <img src={FORBIDDEN} alt="" height={500} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Error403Page;
