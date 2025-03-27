// src/api/api.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (username: string, password: string) => {
  try {
    console.log('Attempting login with:', { username, API_URL });
    const response = await axios.post(`${API_URL}/login`, {  
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    
    if (!response.data || !response.data.access_token) {
      throw new Error('Invalid response from server');
    }
    
    // Lưu username vào localStorage sau khi đăng nhập thành công
    localStorage.setItem('username', username);
    
    console.log('Login response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw {
      message: error.response?.data?.message || 'Login failed',
      status: error.response?.status,
      details: error.response?.data
    };
  }
};

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { 
      username,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Register response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw {
      message: error.response?.data?.message || 'Registration failed',
      status: error.response?.status,
      details: error.response?.data
    };
  }
};

export const getUserInformation = async () => {
  try {
    // Lấy username từ localStorage hoặc sessionStorage
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');
    
    if (!username) {
      throw new Error('Username not found in session');
    }

    const response = await axios.post(`${API_URL}/phone_address`, {
      username: username // Thêm username vào request body
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    
    console.log('User information response:', {
      phone: response.data.phone,
      address: response.data.address,
      fullResponse: response.data
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user information:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw {
      message: error.response?.data?.message || 'Failed to fetch user information',
      status: error.response?.status,
      details: error.response?.data
    };
  }
};

export const updateUserContact = async (phone: string, address: string) => {
  try {
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');
    
    if (!username) {
      throw new Error('Username not found in session');
    }

    const response = await axios.post(`${API_URL}/insert_update_phone_address`, {
      username,
      phone,
      address
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating contact info:', error);
    throw {
      message: error.response?.data?.message || 'Failed to update contact information',
      status: error.response?.status,
      details: error.response?.data
    };
  }
};
