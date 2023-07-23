import React from 'react';

const tabs = ['Cross', '5.00x'];

const Tabs = () => {
  return (
    <div className='inline-flex py-2 px-3 bg-[#212031] rounded-md'>
      {tabs.map((tab, index) => (
        <a
          key={index}
          className='text-gray-300 hover:text-gray-100 group font-light border-r cursor-pointer border-r-gray-600 px-5 last:border-r-0 flex items-center'
        >
          {tab}
          {index === tabs.length - 1 && (
            <span className='text-[0.5rem] inline-flex ml-2 text-gray-500 group-hover:text-gray-100'>
              ▶
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
