import axios from 'axios';
const BACKEND_API_URL="http://localhost:8000";
export const getLogin=async (data)=>{
    try {
        const response =await axios.post(`${BACKEND_API_URL}/Register`,data);
        return response.data;
    } catch (error) {
        console.log("Error while calling the getLogin methode "+error);
    }
};

export const postLogin = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while calling the postLogin method: ", error);
      throw error;
    }
  };