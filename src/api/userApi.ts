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
    
    console.log('Login response:', response.data);
    // Return the raw response data instead of wrapping it
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
