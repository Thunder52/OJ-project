import axios from 'axios';

const BACKEND_API_URL = "http://13.233.90.66:8000/";

const api = axios.create({
  baseURL: BACKEND_API_URL,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/Register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while calling the registerUser method:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post('/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role',response.data.role);
    }
    return response.data;
  } catch (error) {
    console.error("Error while calling the loginUser method:", error);
    throw error;
  }
};

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/problems`);
    return response.data;
  } catch (error) {
    console.error("Error while calling the fetchProblems method:", error);
    throw error;
  }
};

export const fetchProblemById = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/problems/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while calling the fetchProblemById method:", error);
    throw error;
  }
};

export const createProblem = async (problemData, token) => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/problems/add-problems`, problemData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while calling the createProblem method:", error);
    throw error;
  }
};

export const updateProblem = async (id, problemData, token) => {
  try {
    const response = await axios.put(`${BACKEND_API_URL}/problems/${id}`, problemData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while calling the updateProblem method:", error);
    throw error;
  }
};

export const deleteProblem = async (id, token) => {
  try {
    const response = await axios.delete(`${BACKEND_API_URL}/problems/${id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while calling the deleteProblem method:", error);
    throw error;
  }
};
