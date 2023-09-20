import api from './axios';
const baseUrl = '/api/v1/branches';

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
    // console.error(error);
    return error
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
    const response = await api.get(baseUrl + '/' + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const branchApi = { fetchData, create, getById, update };
export default branchApi;
