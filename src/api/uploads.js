const { default: api } = require('./axios');

const baseUrl = '/api/v1/uploads';

const upload = async (data) => {
  if (localStorage.getItem('data') !== null) {
    const localStore = JSON.parse(localStorage.getItem('data'));
    const res = await api.post(baseUrl, data, {
      headers: {
        'x-client-id': localStore.token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  }
};

const uploadApi = { upload };
export default uploadApi
