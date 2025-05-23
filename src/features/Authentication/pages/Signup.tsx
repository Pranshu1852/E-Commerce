import { useRef, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { InputRef } from '../../../types/Reftype';
import InputField from '../../Formvalidation/InputField';

function Signup() {
  const { t } = useTranslation();
  const formRefs = useRef<Record<string, InputRef | null>>({});

  const registerRef = (name: string) => (element: InputRef | null) => {
    formRefs.current[name] = element;
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let isValid = true;
    const data: Record<string, string> = {};
    for (const key of Object.keys(formRefs.current)) {
      if (formRefs.current[key] && formRefs.current[key].validation().isError) {
        isValid = false;
      }

      if (formRefs.current[key]) {
        data[key] = formRefs.current[key].value;
      }
    }

    if (!isValid) {
      return;
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-10 m-auto mt-7 bg-cyan-100 border-2 border-cyan-900 p-10 w-[80%] max-w-[550px] rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-semibold text-cyan-700">SignUp</h2>
      <div className="flex flex-col gap-7 w-full">
        <InputField
          style={{ backgroundColor: 'white' }}
          ref={registerRef('username')}
          label="UserName"
          id="username"
          name="username"
          placeholder="Enter your username..."
          validationMode="all"
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
          label="Email"
          id="email"
          name="email"
          placeholder="Enter your email..."
          validationMode="all"
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
          label="Password"
          id="password"
          name="password"
          placeholder="Enter your password..."
          validationMode="all"
          rules={{
            required: {
              value: true,
              message: t('This is a required field.'),
            },
          }}
        />
        <InputField
          style={{ backgroundColor: 'white' }}
          ref={registerRef('confirmpassword')}
          label="Confirm Password"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="Confirm your password..."
          validationMode="all"
          rules={{
            required: {
              value: true,
              message: t('This is a required field.'),
            },
            // pattern: {
            //   value: formRefs.current['password']?.value,
            //   message: t('Password does not match.')
            // }
          }}
        />
      </div>
      <Link to="/login" className="font-medium text-lg text-cyan-700">
        Already have an account
      </Link>
      <button
        type="submit"
        className="py-2 px-4 font-semibold text-white bg-cyan-800 rounded-md"
      >
        SignUp
      </button>
    </form>
  );
}

export default Signup;
