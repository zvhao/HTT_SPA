import { Typography } from '@mui/material';

const getStatusString = (status) => {
  switch (status) {
    case 1:
      return { color: 'orange', status: 'chờ duyệt' };
    case 2:
      return { color: 'green', status: 'đã duyệt' };
    case 0:
      return { color: 'red', status: 'không được duyệt' };
    case 3:
      return { color: 'red', status: 'nghỉ không phép' };
    default:
      return '';
  }
};


export default getStatusString;
