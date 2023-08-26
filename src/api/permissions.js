import api from "./axios";

export const fetchData = async () => {
  try {
    const response = await api.get('/api/v1/permissions'); // Thay đổi '/data' thành đường dẫn tương ứng với API của backend Node.js
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const permissionApi = { fetchData }
export default permissionApi