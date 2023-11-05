// project import
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { clearUser, setUser } from 'store/reducers/user';
import ThemeRoutes from 'routes';
import { dispatch } from 'store';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.locale('vi');
// dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// import { useNavigate } from 'react-router-dom';
// import { Path } from 'constant/path';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  // const navigation = useNavigate();

  useEffect(() => {
    // console.log(reduxData);
    if (localStorage.getItem('data') !== null) {
      const data = JSON.parse(localStorage.getItem('data'));
      dispatch(setUser(data));
    } else {
      dispatch(clearUser());
    }
    
  });
  return (
    <ThemeCustomization>
      <ScrollTop>
        <ThemeRoutes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
