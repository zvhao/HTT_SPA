const getStatusBookingString = (status) => {
  switch (status) {
    case 0:
      return 'Khách huỷ';
    case 1:
      return 'Khách chưa đến';
    case 2:
      return 'Khách đã đến';
    case 3:
      return 'Đã tạo bill';
    case 4:
      return 'Khách không đến';
    default:
      break;
  }
};

export default getStatusBookingString;
