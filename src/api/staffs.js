import api from './axios';
const baseUrl = '/api/v1/staffs';

const fetchData = async () => {
  try {
    if (localStorage.getItem('data') !== null) {
      const data = JSON.parse(localStorage.getItem('data'));
      const response = await api.get(baseUrl, {
        headers: {
          'x-client-id': data.token
        }
      });
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const create = async (data) => {
  try {
    const response = await api.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const update = async (id, data) => {
  try {
    const res = await api.patch(baseUrl + '/' + id, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  try {
    if (localStorage.getItem('data') !== null) {
      const data = JSON.parse(localStorage.getItem('data'));
      const response = await api.get(baseUrl + '/' + id, {
        headers: {
          'x-client-id': data.token
        }
      });
      return response.data;
    }
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
  login
};
export default staffApi;
