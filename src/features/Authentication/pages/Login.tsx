import { useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { handleLogin } from '../../../services/authApis';
import type { LoginData } from '../../../types/Authtypes';
import type { InputRef } from '../../../types/Reftype';
import InputField from '../../Formvalidation/InputField';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formRefs = useRef<Record<string, InputRef | null>>({});

  const registerRef = (name: keyof LoginData) => (element: InputRef | null) => {
    formRefs.current[name] = element;
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let isValid = true;
    const data: Record<keyof LoginData, string> = {
      identifier: '',
      password: '',
    };
    for (const [key, refObj] of Object.entries(formRefs.current)) {
      if (refObj && refObj.validation().isError) {
        isValid = false;
      }

      if (refObj) {
        data[key as keyof LoginData] = refObj.value;
      }
    }

    if (!isValid) {
      return;
    }

    const status = await handleLogin(data);

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
        <h2 className='text-3xl font-semibold text-cyan-700'>Login</h2>
        <div className='flex flex-col gap-7 w-full'>
          <InputField
            style={{ backgroundColor: 'white' }}
            ref={registerRef('identifier')}
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
            ref={registerRef('password')}
            type='password'
            label='Password'
            id='password'
            name='password'
            placeholder='Enter your password...'
            validationMode='all'
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
        </div>
        <Link to='/signup' className='font-medium text-lg text-cyan-700'>
          Create a new account
        </Link>
        <button
          type='submit'
          className='py-2 px-4 font-semibold text-white bg-cyan-800 rounded-md'
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
