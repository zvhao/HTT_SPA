import api from 'api/axios';
const getAll = async (baseUrl) => {
  if (localStorage.getItem('data') !== null) {
    const localStore = JSON.parse(localStorage.getItem('data'));
    const response = await api.get(baseUrl, {
      headers: {
        'x-client-id': localStore.token
      }
    });
    return response.data;
  }
};
const getById = async (baseUrl, id) => {
  if (localStorage.getItem('data') !== null) {
    const localStore = JSON.parse(localStorage.getItem('data'));
    const response = await api.get(baseUrl + '/' + id, {
      headers: {
        'x-client-id': localStore.token
      }
    });
    return response.data;
  }
};
const getByToken = async (baseUrl) => {
  if (localStorage.getItem('data') !== null) {
    const localStore = JSON.parse(localStorage.getItem('data'));
    const response = await api.get(baseUrl + '/getaccount', {
      headers: {
        'x-client-id': localStore.token
      }
    });
    return response.data;
  }
};

const update = async (baseUrl, id, data) => {
  if (localStorage.getItem('data') !== null) {
    const localStore = JSON.parse(localStorage.getItem('data'));
    const res = await api.patch(baseUrl + '/' + id, data, {
      headers: {
        'x-client-id': localStore.token,
      }
    });
    return res.data;
  }
};
const create = async (baseUrl, data) => {
  if (localStorage.getItem('data') !== null) {
    const localStore = JSON.parse(localStorage.getItem('data'));
    const res = await api.post(baseUrl, data, {
      headers: {
        'x-client-id': localStore.token,
      }
    });
    return res.data;
  }
};

const TokenAuth = { getAll, getById, create, update, getByToken };
export default TokenAuth;
