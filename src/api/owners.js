import api from "./axios";
const apiOwners = '/api/v1/owners'

const fetchData = async () => {
  try {
    const response = await api.get(apiOwners); // Thay đổi '/data' thành đường dẫn tương ứng với API của backend Node.js
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const login = async (username, password) => {
  const data = {
    username: username,
    password: password
  }
  try {
    const response = await api.post(apiOwners + '/login', data);
    // console.log(response);
    return response.data;
  } catch (error) {
    return {error: error.response.data.message}
    // console.error(error);
  }
};

const ownerApi = {fetchData, login }
export default ownerApi
