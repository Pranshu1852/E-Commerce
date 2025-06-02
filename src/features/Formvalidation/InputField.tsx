import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  useEffect,
  useImperativeHandle,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type HTMLInputTypeAttribute,
} from 'react';

import type { InputRef } from '../../types/Reftype';
import { ErrorCheck } from '../../utils/validation';

interface Rules {
  value: boolean | number | string | RegExp;
  message: string;
}

type InputFieldProps = {
  label?: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: FocusEvent<HTMLInputElement>) => void;
  rules?: Record<string, Rules>;
  validationMode: 'onChange' | 'onBlur' | 'all';
  ref: (element: InputRef | null) => void;
  type?: HTMLInputTypeAttribute;
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'type'>;

function InputField({
  label,
  id,
  placeholder,
  onChange,
  onBlur,
  rules,
  validationMode,
  ref,
  value: data,
  type: initType = 'text',
  ...props
}: InputFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [inputType, setInputType] = useState(initType);

  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);

  useImperativeHandle(ref, () => {
    return {
      validation: () => {
        const errormessage = CheckError(value);
        return {
          error: errormessage,
          isError: errormessage !== '',
        };
      },
      value,
    };
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (
      validationMode &&
      (validationMode === 'all' || validationMode === 'onChange')
    ) {
      CheckError(inputValue);
    }

    if (onChange) {
      onChange(event);
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    if (
      validationMode &&
      (validationMode === 'all' || validationMode === 'onBlur')
    ) {
      CheckError(event.target.value);
    }

    if (onBlur) {
      onBlur(event);
    }
  }

  function CheckError(inputVal: string) {
    if (rules) {
      const errorMessage = (function isError(): string {
        for (const rule of Object.keys(rules)) {
          if (ErrorCheck(rule, rules[rule].value, inputVal)) {
            return rules[rule].message;
          }
        }
        return '';
      })();
      setError(errorMessage);
      return errorMessage;
    }
    return '';
  }

  return (
    <div className='flex flex-col gap-2 self-start w-full'>
      {label && (
        <label className='text-lg font-medium' htmlFor={id}>
          {label}
          {rules && rules.required && rules.required.value && (
            <span className='text-red-600'> *</span>
          )}
        </label>
      )}
      <div className='flex flex-row justify-between w-full relative'>
        <input
          className='border-[1.5px] border-black rounded-md p-2 bg-transparent w-full'
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          type={inputType}
          {...props}
        />
        {initType === 'password' && (
          <button
            type='button'
            onClick={() => {
              setInputType(inputType === 'password' ? 'text' : 'password');
            }}
            className='absolute right-[2%] top-[20%]'
          >
            {inputType === 'password' ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </button>
        )}
      </div>
      {error !== '' && (
        <p className='text-red-600 font-medium text-sm'>{error}</p>
      )}
    </div>
  );
}

export default InputField;
