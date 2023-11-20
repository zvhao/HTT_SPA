const getStatusDetailsOfTurnsString = (status) => {
  switch (status) {
    case 0:
      return { color: 'red', status: 'Chưa thực hiện' };
    case 1:
      return { color: 'orange', status: 'Đang thực hiện' };
    case 2:
      return { color: 'green', status: 'Đã thực hiện' };
    default:
      break;
  }
};

export default getStatusDetailsOfTurnsString;
