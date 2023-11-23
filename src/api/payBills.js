import TokenAuth from 'utils/TokenAuth';
const baseUrl = '/api/v1/bills';

const fetchData = async () => {
  try {
    return TokenAuth.getAll(baseUrl);
  } catch (error) {
    return { error: error.response.data.message };
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

const payBillApi = { fetchData, create, getById, update };
export default payBillApi;
