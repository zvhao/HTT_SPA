const getStatusSellingCourseString = (status) => {
  switch (status) {
    case 0:
      return 'Khách huỷ';
    case 1:
      return 'Chưa hoàn thành - Chưa thanh toán';
    case 2:
      return 'Chưa hoàn thành - Đã thanh toán';
    case 3:
      return 'Đã hoàn thành - Chưa thanh toán';
    case 4:
      return 'Đã hoàn thành - Đã thanh toán';
    default:
      break;
  }
};

export default getStatusSellingCourseString;
