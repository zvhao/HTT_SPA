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

const salaryApi = { fetchData };
export default salaryApi;
