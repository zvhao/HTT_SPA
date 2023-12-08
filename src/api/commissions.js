import TokenAuth from 'utils/TokenAuth';
import api from './axios';
const baseUrl = '/api/v1/commissions';

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

const create = async (data) => {
  try {
    return TokenAuth.create(baseUrl, data);
  } catch (error) {
    // return { error: error.response.data.message };
    return console.error(error);
  }
};

const update = async (id, data) => {
  try {
    return TokenAuth.update(baseUrl, id, data);
  } catch (error) {
    return { error: error.response.data.message };
  }
};

const getById = async (id) => {
  try {
    return TokenAuth.getById(baseUrl, id);
  } catch (error) {
    return { error: error.response.data.message };
  }
};

const bookingApi = { fetchData, create, getById, update };
export default bookingApi;
