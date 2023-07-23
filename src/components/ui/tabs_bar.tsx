import React from 'react';

const tabs = ['Limit', 'Market', 'Stop'];

const TabsBar = () => {
  return (
    <div>
      <ul className='flex min-w-full flex-none gap-x-6 mx-2 leading-6 border-b border-b-gray-600 mb-2'>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className='cursor-pointer text-gray-400 first:text-white first:border-b-2 pb-2 first:border-[#ec56c8]'
          >
            <a className='text-inherit hover:text-[#ec56c8]'>{tab}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsBar;
