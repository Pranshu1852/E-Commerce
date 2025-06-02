import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { handleSignup } from '../../../services/authApis';
import type { SignUpData } from '../../../types/Authtypes';
import type { InputRef } from '../../../types/Reftype';
import storageHandler from '../../../utils/storageHandler';
import InputField from '../../Formvalidation/InputField';

function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const formRefs = useRef<Record<string, InputRef | null>>({});

  if (storageHandler.getStorage('token')) {
    return <Navigate to={'/'} replace />;
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const registerRef =
    (name: keyof SignUpData | 'confirmpassword') =>
    (element: InputRef | null) => {
      formRefs.current[name] = element;
    };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let isValid = true;
    const data: Record<keyof SignUpData, string> = {
      username: '',
      email: '',
      password: '',
    };

    for (const [key, refObj] of Object.entries(formRefs.current)) {
      if (refObj && refObj.validation().isError) {
        isValid = false;
      }

      if (refObj && key !== 'confirmpassword') {
        data[key as keyof SignUpData] = refObj.value;
      }
    }

    if (!isValid) {
      return;
    }

    const status = await handleSignup(data);

    if (status === 200) {
      navigate('/', { replace: true });
    }
  }
  return (
    <div className='h-screen flex'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-10 m-auto bg-cyan-200 border-2 border-cyan-900 p-10 w-[80%] max-w-[550px] rounded-xl shadow-lg'
      >
        <h2 className='text-3xl font-semibold text-cyan-700'>SignUp</h2>
        <div className='flex flex-col gap-7 w-full'>
          <InputField
            style={{ backgroundColor: 'white' }}
            ref={registerRef('username')}
            label='UserName'
            id='username'
            name='username'
            placeholder='Enter your username...'
            validationMode='all'
            rules={{
              required: {
                value: true,
                message: t('This is a required field.'),
              },
            }}
          />
          <InputField
            style={{ backgroundColor: 'white' }}
            ref={registerRef('email')}
            label='Email'
            id='email'
            name='email'
            placeholder='Enter your email...'
            validationMode='all'
            rules={{
              required: {
                value: true,
                message: t('This is a required field.'),
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('Please enter valid email.'),
              },
            }}
          />
          <InputField
            style={{ backgroundColor: 'white' }}
            ref={registerRef('password')}
            label='Password'
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password...'
            validationMode='all'
            onChange={handlePasswordChange}
            rules={{
              required: {
                value: true,
                message: t('This is a required field.'),
              },
              minLength: {
                value: 8,
                message: t('Password should be of minimum 8 length.'),
              },
            }}
          />
          <InputField
            style={{ backgroundColor: 'white' }}
            ref={registerRef('confirmpassword')}
            type='password'
            label='Confirm Password'
            id='confirmpassword'
            name='confirmpassword'
            placeholder='Confirm your password...'
            validationMode='all'
            rules={{
              required: {
                value: true,
                message: t('This is a required field.'),
              },
              pattern: {
                value: password,
                message: t('Password does not match.'),
              },
            }}
          />
        </div>
        <Link to='/login' className='font-medium text-lg text-cyan-700'>
          Already have an account
        </Link>
        <button
          type='submit'
          className='py-2 px-4 font-semibold text-white bg-cyan-800 rounded-md'
        >
          SignUp
        </button>
      </form>
    </div>
  );
}

export default Signup;
