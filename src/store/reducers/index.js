// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import user from './user';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu: menu, user: user });

export default reducers;
