import { useRef } from 'react';
import { Link } from 'react-router-dom';

import type { InputRef } from '../../../types/Reftype';
import InputField from '../../Formvalidation/InputField';

function Login() {
  const formRefs = useRef<Record<string, InputRef | null>>({});

  const registerRef = (name: string) => (element: InputRef | null) => {
    formRefs.current[name] = element;
  };

  return (
    <div className="flex flex-col items-center gap-10 m-auto mt-10 bg-cyan-100 border-2 border-cyan-900 p-10 w-[80%] max-w-[550px] rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-cyan-700">Login</h2>
      <div className="flex flex-col gap-7 w-full">
        <InputField
          style={{ backgroundColor: 'white' }}
          ref={registerRef('username')}
          label="UserName"
          id="username"
          name="username"
          placeholder="Enter your username..."
          validationMode="all"
        />
        <InputField
          style={{ backgroundColor: 'white' }}
          ref={registerRef('password')}
          label="Password"
          id="password"
          name="password"
          placeholder="Enter your password..."
          validationMode="all"
        />
      </div>
      <Link to="/signup" className="font-medium text-lg text-cyan-700">
        Create a new account
      </Link>
      <button className="py-2 px-4 font-semibold text-white bg-cyan-800 rounded-md">
        Login
      </button>
    </div>
  );
}

export default Login;
