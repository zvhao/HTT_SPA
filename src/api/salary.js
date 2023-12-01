import TokenAuth from 'utils/TokenAuth';
import api from './axios';
const baseUrl = '/api/v1/salary';
const fetchData = async (data) => {
  try {
    if (localStorage.getItem('data') !== null) {
      const localStore = JSON.parse(localStorage.getItem('data'));
      const response = await api.get(baseUrl, {
        params: { filter: data },
        headers: {
          'x-client-id': localStore.token
        }
      });
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
const paidSalary = async (data) => {
  try {
    if (localStorage.getItem('data') !== null) {
      const localStore = JSON.parse(localStorage.getItem('data'));
      const response = await api.get(baseUrl + '/paidSalary', {
        params: { filter: data },
        headers: {
          'x-client-id': localStore.token
        }
      });
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
const create = async (data) => {
  try {
    return TokenAuth.create(baseUrl, data);
  } catch (error) {
    // return { error: error.response.data.message };
    return error;
  }
};

const salaryApi = { fetchData, create, paidSalary };
export default salaryApi;
