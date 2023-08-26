import api from "./axios";
const baseUrl = '/api/v1/branches'


const fetchData = async () => {
  try {
    const response = await api.get(baseUrl);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const create = async (data) => {
  try {
    const response = await api.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const getById = async (id) => {
  try {
    const response = await api.get(baseUrl + '/' + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const branchApi = { fetchData, create, getById }
export default branchApi