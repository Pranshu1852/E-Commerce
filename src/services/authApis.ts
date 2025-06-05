import type { LoginData, SignUpData } from '../types/Authtypes';
import storageHandler from '../utils/storageHandler';

import { instance } from './axiosInstance';

export async function handleLogin(data: LoginData) {
  const response = await instance.post('/auth/local', data);

  storageHandler.setStorage('token', response.data.jwt);

  return response.status;
}

export async function handleSignup(data: SignUpData) {
  const response = await instance.post('/auth/local/register', data);

  storageHandler.setStorage('token', response.data.jwt);

  return response.status;
}

export async function getUser(token: string) {
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
