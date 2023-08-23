import api from "./axios";

export const branchData = async () => {
  try {
    const response = await api.get('/api/v1/branches'); // Thay đổi '/data' thành đường dẫn tương ứng với API của backend Node.js
    return response.data;
  } catch (error) {
    console.error(error);
  }
};