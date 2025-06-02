import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import type { LoginData, SignUpData } from '../types/Authtypes';
import storageHandler from '../utils/storageHandler';

import { instance } from './axiosInstance';

export async function handleLogin(data: LoginData) {
  try {
    const response = await instance.post('/auth/local', data);

    storageHandler.setStorage('token', response.data.jwt);

    return response.status;
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.status;

    if (status?.toString().startsWith('4')) {
      toast.error('Please enter valid credentials.');
    } else if (status?.toString().startsWith('5')) {
      toast.error('Server Error Please try later.');
    } else {
      toast.error('Something Went Wrong.');
    }

    console.error('Error: ', axiosError);
  }
}

export async function handleSignup(data: SignUpData) {
  try {
    const response = await instance.post('/auth/local/register', data);

    storageHandler.setStorage('token', response.data.jwt);

    return response.status;
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.status;
    if (status?.toString().startsWith('4')) {
      toast.error('Please enter valid credentials.');
    } else if (status?.toString().startsWith('5')) {
      toast.error('Server Error Please try later.');
    } else {
      toast.error('Something Went Wrong.');
    }
    console.error('Error: ', error);
  }
}

export async function verifyUser(token: string) {
  try {
    const response = await instance.get('/users/me', {
      headers: {
        Authorization: 'Bearer' + token,
      },
    });

    return {
      userDetails: response.data,
      isLogin: response.status === 200,
    };
  } catch (error) {
    console.error('Error: ', error);
  }
}
