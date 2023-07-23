const Button = ({ text }: { text: string }) => {
  return (
    <button className='bg-[#212031] block rounded-md px-8 hover:ring-2 ring-white hover:text-gray-100 border border-gray-500 p-3 text-gray-300 h-[50px]'>
      {text}
    </button>
  );
};

export default Button;
