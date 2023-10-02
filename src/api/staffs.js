import TokenAuth from 'utils/TokenAuth';
import api from './axios';

const baseUrl = '/api/v1/staffs';

const fetchData = async () => {
  try {
    return TokenAuth.getAll(baseUrl);
  } catch (error) {
    return error;
  }
};

const create = async (data) => {
  try {
    return TokenAuth.create(baseUrl, data);
  } catch (error) {
    return error;
  }
};

const update = async (id, data) => {
  try {
    return TokenAuth.update(baseUrl, id, data);
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  try {
    return TokenAuth.getById(baseUrl, id);
  } catch (error) {
    console.error(error);
  }
};
const getByToken = async () => {
  try {
    return TokenAuth.getByToken(baseUrl);
  } catch (error) {
    console.error(error);
  }
};

const login = async (username, password) => {
  const data = {
    username: username,
    password: password
  };
  try {
    const response = await api.post(baseUrl + '/login', data);
    // console.log(response);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

const staffApi = {
  fetchData,
  create,
  update,
  getById,
  login,
  getByToken
};
export default staffApi;
