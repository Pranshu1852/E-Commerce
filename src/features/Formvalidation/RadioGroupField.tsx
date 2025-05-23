import {
  useEffect,
  useImperativeHandle,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from 'react';

import type { InputRef } from '../../types/Reftype';
import { ErrorCheck } from '../../utils/validation';

interface Rules {
  value: boolean | number | string | RegExp;
  message: string;
}

interface Option {
  label: string;
  value: string;
}

type RadioGroupFieldProps = {
  label: string;
  id: string;
  name: string;
  options: Array<Option>;
  value?: string;
  rules?: Record<string, Rules>;
  validationMode: 'onChange' | 'onBlur' | 'all';
  ref: (element: InputRef | null) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: FocusEvent<HTMLInputElement>) => void;
};

function RadioGroupField({
  label,
  id,
  name,
  options,
  onChange,
  onBlur,
  rules,
  validationMode,
  ref,
  value: data,
}: RadioGroupFieldProps) {
  const [value, setValue] = useState(data ?? '');
  const [error, setError] = useState('');

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
    <div className="flex flex-col gap-2 self-start w-full">
      {label && (
        <label className="text-lg font-medium" htmlFor={id}>
          {label}
          {rules && rules.required && rules.required.value && (
            <span className="text-red-600"> *</span>
          )}
        </label>
      )}
      <div className="flex flex-row gap-10 items-center flex-wrap">
        {options.map((element) => {
          return (
            <RadioField
              key={element.value + element.label}
              label={element.label}
              name={name}
              value={element.value}
              changeEvent={handleChange}
              blurEvent={handleBlur}
              data={value}
            />
          );
        })}
      </div>
      {error !== '' && (
        <p className="text-red-600 font-medium text-sm">{error}</p>
      )}
    </div>
  );
}

type RadioFieldProps = {
  label: string;
  name: string;
  value: string;
  data?: string;
  changeEvent: (event: ChangeEvent<HTMLInputElement>) => void;
  blurEvent: (event: FocusEvent<HTMLInputElement>) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref'>;

function RadioField({
  label,
  name,
  value,
  changeEvent,
  blurEvent,
  data,
}: RadioFieldProps) {
  return (
    <div className="flex flex-row gap-3 items-center font-medium">
      <input
        id={value}
        name={name}
        type="radio"
        value={value}
        onChange={changeEvent}
        onBlur={blurEvent}
        checked={data ? data === value : false}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
}

export default RadioGroupField;
