import type { LoginData, SignUpData } from '../types/Authtypes';
import storageHandler from '../utils/storageHandler';

import { instance } from './axiosInstance';

export async function handleLogin(data: LoginData) {
  try {
    const response = await instance.post('/auth/local', data);

    storageHandler.setStorage('token', response.data.jwt);
  } catch (error) {
    console.error('Error: ', error);
  }
}

export async function handleSignup(data: SignUpData) {
  try {
    const response = await instance.post('/auth/local/register', data);

    storageHandler.setStorage('token', response.data.jwt);
  } catch (error) {
    console.error('Error: ', error);
  }
}
