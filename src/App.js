// project import
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { clearUser, setUser } from 'store/reducers/user';
import ThemeRoutes from 'routes';
import { dispatch } from 'store';


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
