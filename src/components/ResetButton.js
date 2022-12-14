import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDataUrlToLocalStorage } from '../helpers';

import { initGrid } from './../slice';

import ColorInput from './ColorInput';

const ResetButton = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [color, setColor] = useState('');

  const openCallback = useCallback(
    () => {
      setIsOpen(true);
      setWidth(15);
      setHeight(15);
      setColor('#cccccc');
    },
    [setIsOpen]
  );
  const closeCallback = useCallback(() => setIsOpen(false), [setIsOpen]);

  const setWidthCallback = useCallback(event => setWidth(parseInt(event.target.value, 10)), [setWidth]);
  const setHeightCallback = useCallback(event => setHeight(parseInt(event.target.value, 10)), [setHeight]);
  const setColorCallback = useCallback(color => setColor(color), [setColor]);

  const resetCallback = useCallback(
    () => {
      dispatch(initGrid({ width, height, color }));
      setDataUrlToLocalStorage('');
      closeCallback();
    },
    [dispatch, closeCallback, width, height, color]
  );

  const inputClassName = 'block w-20 rounded border-slate-300 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50';

  if (isOpen) {
    return (
      <div className='w-max px-2 py-4 bg-red-100 ring-2 ring-red-900 rounded'>
        <div className='flex items-center space-x-2'>
          <label htmlFor='width' className='flex text-sm'>長度</label>
          <div className='flex h-8'>
            <input
              value={ width }
              onChange={ setWidthCallback }
              id='width'
              type='number'
              pattern='\d*'
              className={ inputClassName }
            />
          </div>
          <label htmlFor='height' className='flex text-sm'>高度</label>
          <div className='flex h-8'>
            <input
              value={ height }
              onChange={ setHeightCallback }
              id='height'
              type='number'
              pattern='\d*'
              className={ inputClassName }
            />
          </div>
          <label className='flex text-sm'>底色</label>
          <div className='flex w-4 h-4'>
            <ColorInput color={ color } onColorChange={ setColorCallback } />
          </div>
          <div className='flex w-2 h-px' />
          <div className='flex h-8'>
            <button
              className='h-full px-4 rounded text-white bg-red-500 hover:bg-red-400'
              onClick={ resetCallback }
            >重設</button>
          </div>
          <div className='flex h-8'>
            <button
              className='h-full px-4 rounded text-white bg-slate-500 hover:bg-slate-400'
              onClick={ closeCallback }
            >取消</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className='h-8 px-4 rounded text-red-500 bg-red-100 hover:bg-red-200'
      onClick={ openCallback }
    >重設</button>
  );
};

export default ResetButton;
