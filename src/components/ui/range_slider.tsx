import { useState } from 'react';
import { clsx } from 'clsx';

const arr = [true].concat(Array(4).fill(false));

const RangeSlider = () => {
  const [rangeArray, setRangeArray] = useState(arr);

  return (
    <div className='mt-4'>
      <div className='relative flex justify-between w-full'>
        <span className='absolute w-full flex h-[1px] bg-gray-500 top-1/2'></span>
        {rangeArray.map((isSelected, index) => {
          return (
            <span
              key={index}
              className={clsx(
                !isSelected ? 'bg-[#07081b] !border-gray-400' : 'bg-white border-transparent',
                'w-3 h-3 block rounded-full border z-10 cursor-pointer'
              )}
              onClick={() => {
                const newRangeArray = rangeArray.map((val, i) => {
                  if (val === true && i !== index) return false;
                  if (i == index) return true;
                  return val;
                });
                setRangeArray(newRangeArray);
              }}
            />
          );
        })}
      </div>
      <div className='w-full flex justify-between text-gray-400'>
        <p>0</p>
        <p>100%</p>
      </div>
    </div>
  );
};

export default RangeSlider;
