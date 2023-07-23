import React, { useRef } from 'react';
import { clsx } from 'clsx';

const Input = ({
  id,
  labelText,
  type,
  className,
  numberInput,
  placeholder,
  labelDropdown,
}: {
  id: string;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  labelText?: string;
  numberInput?: boolean;
  placeholder?: string;
  labelDropdown?: boolean;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      {labelText && (
        <label
          htmlFor={id}
          className={clsx(
            labelDropdown && 'text-gray-100 cursor-pointer',
            'block leading-3 text-gray-400'
          )}
        >
          {labelText}
          <span className='inline-flex'>
            {labelDropdown && (
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z'
                  fill='currentColor'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                ></path>
              </svg>
            )}
          </span>
        </label>
      )}
      <div className='mt-2 relative rounded-md shadow-sm'>
        <input
          id={id}
          type={type ?? 'text'}
          className={clsx(
            className,
            'bg-[#212031] block rounded-md w-full border border-gray-500 p-3 text-gray-300 placeholder:text-gray-500'
          )}
          placeholder={placeholder}
          ref={ref}
          defaultValue={numberInput ? 0 : ''}
        />
        {numberInput && (
          <div className='absolute cursor-pointer inset-y-0 right-0 flex justify-center flex-col items-center h-full border-l text-gray-500 border-gray-500'>
            <button
              className='px-1.5 border-b border-gray-500 text-sm flex items-center justify-center h-full hover:text-gray-200'
              onClick={() => {
                if (!ref.current) return;

                ref.current.value = (parseFloat(ref.current.value) + 1).toString();
              }}
            >
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z'
                  fill='currentColor'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
            <button
              className='px-1.5 text-sm flex items-center justify-center h-full hover:text-gray-200'
              onClick={() => {
                if (!ref.current) return;

                ref.current.value = (parseFloat(ref.current.value) - 1).toString();
              }}
            >
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z'
                  fill='currentColor'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
