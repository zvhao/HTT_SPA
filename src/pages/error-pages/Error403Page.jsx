import React from 'react';
import { Typography, Container } from '@mui/material';

const Error403Page = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" color="error" gutterBottom>
        Lỗi 403
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Xin lỗi, bạn không có quyền truy cập vào trang này.
      </Typography>
      <Typography variant="body1" align="center">
        Vui lòng liên hệ với quản trị viên để biết thêm thông tin.
      </Typography>
    </Container>
  );
};

export default Error403Page;