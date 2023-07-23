import React from 'react';

import { clsx } from 'clsx';

const ToggleButton = ({
  onChange,
  labelText,
  labelRight,
  id,
}: {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  labelText?: string;
  labelRight?: boolean;
  id: string;
}) => {
  return (
    <div
      className={clsx(labelRight ? 'flex-row' : 'flex-row-reverse', 'flex flex-row items-center')}
    >
      <label className='relative inline-flex items-center cursor-pointer'>
        <input id={id} type='checkbox' onChange={onChange} value='' className='sr-only peer' />
        <div className='w-11 h-6 peer-focus:outline-none rounded-full peer bg-[#76fbcb] peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-[#070919] after:rounded-full after:h-5 after:w-5 after:transition-all'></div>
      </label>
      {labelText && (
        <label
          htmlFor={id}
          className={clsx(
            labelRight ? 'ml-2' : 'mr-2',
            'text-sm font-medium text-gray-900 dark:text-gray-300'
          )}
        >
          {labelText}
        </label>
      )}
    </div>
  );
};

export default ToggleButton;
