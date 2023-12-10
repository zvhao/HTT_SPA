import TokenAuth from 'utils/TokenAuth';
import api from './axios';
const baseUrl = '/api/v1/statistical';
const statistical = async (data) => {
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
const ownerStatistical = async (data) => {
  try {
    if (localStorage.getItem('data') !== null) {
      const localStore = JSON.parse(localStorage.getItem('data'));
      const response = await api.get(baseUrl + '/owner', {
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

const statisticalApi = { statistical, ownerStatistical };
export default statisticalApi;
