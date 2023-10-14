import TokenAuth from 'utils/TokenAuth';
const baseUrl = '/api/v1/courses';

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
    console.error(error);
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

const serviceTypeApi = { fetchData, create, getById, update };
export default serviceTypeApi;
