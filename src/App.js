// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useEffect } from 'react';
import { dispatch } from 'store';
import { clearUser, setUser } from 'store/reducers/user';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  useEffect(()=> {
  if(localStorage.getItem('data') !== null) {
    const data = JSON.parse(localStorage.getItem('data'))
    dispatch(setUser(data))
  } else {
    dispatch(clearUser())
  }
  })
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
