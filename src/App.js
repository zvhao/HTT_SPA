import ScrollTop from 'components/ScrollTop';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import 'dayjs/plugin/timezone';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThemeRoutes from 'routes';
import { clearUser, setUser } from 'store/reducers/user';
import ThemeCustomization from 'themes';
dayjs.extend(utc);
dayjs.extend(timezone);

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  // const navigation = useNavigate();
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  // const [currentRoute, setCurrentRoute] = useState('');
  // const [isLogin, setIsLogin] = useState(false);
  // const [isData, setData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('data') !== null) {
      const data = JSON.parse(localStorage.getItem('data'));
      dispatch(setUser(data));
      // setIsLogin(true);
    } else {
      dispatch(clearUser());
    }

    // setCurrentRoute(window.location.pathname);
  }, [dispatch]);
  return (
    <ThemeCustomization>
      <ScrollTop>
        <ThemeRoutes />

        {/* <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to={currentRoute} replace /> : <Login />} />
        </Routes> */}
        {/* {isLoggedIn ? (
          <ThemeRoutes />
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" replace />} />
          </Routes>
        )} */}
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
