import { Typography } from '@mui/material';

const getStatusString = (status) => {
  switch (status) {
    case 1:
      return <Typography sx={{ color: 'orange' }}>Chờ duyệt</Typography>;
    case 2:
      return <Typography sx={{ color: 'green' }}>Đã duyệt</Typography>;
    case 0:
      return <Typography sx={{ color: 'red' }}>Không được duyệt</Typography>;
    default:
      return '';
  }
};

export default getStatusString;
