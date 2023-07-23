import RangeSlider from './ui/range_slider';
import Button from './ui/button';
import Input from './ui/input';
import Tabs from './ui/tabs';
import TabsBar from './ui/tabs_bar';
import ToggleButton from './ui/toggle';

const OrderOptions = () => {
  return (
    <div className='flex max-w-sm border-gray-600 border p-4 rounded-md flex-col space-y-4'>
      <div className='flex w-full justify-between items-center'>
        <Tabs />
        <ToggleButton labelText='Open' id='toggle-open' />
      </div>
      <TabsBar />
      <div className='space-x-4 flex w-full justify-between flex-row items-end'>
        <Input id='input-price-usdt' type='number' labelText='Price (USDT)' numberInput />
        <Button text='BBO' />
      </div>
      <div className='w-full'>
        <Input
          id='input-contract-amount'
          labelText={'Amount (Cont)'}
          placeholder='Single Contract value 0.01 BTC'
          labelDropdown
          type='number'
        />
        <RangeSlider />
      </div>
      <div>
        <p className='text-gray-400 tracking-tighter'>
          Available <span className='text-gray-100'> -- USDT</span>
        </p>
      </div>
      <div className='w-full justify-between flex tracking-tighter'>
        <p className='text-gray-400 tracking-tight'>
          Max (Long)<span className='text-gray-100'> -- Cont</span>
        </p>
        <p className='text-gray-400 tracking-tighter'>
          Max (Short)<span className='text-gray-100'> -- Cont</span>
        </p>
      </div>
    </div>
  );
};

export default OrderOptions;
