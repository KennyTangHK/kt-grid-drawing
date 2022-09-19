import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { closePicker, setActiveColor } from '../slice';

import ColorInput from './ColorInput';

const Information = () => {
  const dispatch = useDispatch();

  const selector = useCallback(
    ({ main: { width, height, activeColor, isPickerOpen } }) => ({ width, height, activeColor, isPickerOpen }),
    []
  );

  const { width, height, activeColor, isPickerOpen } = useSelector(selector, shallowEqual);

  const onColorChange = useCallback(
    color => {
      dispatch(setActiveColor(color));

      if (isPickerOpen) {
        dispatch(closePicker());
      }
    },
    [dispatch, isPickerOpen]
  );

  return (
    <div className='flex items-center space-x-2 text-sm text-slate-500'>
      <span className='flex'>{ width } x { height }</span>
      <div className='w-px h-4 flex bg-slate-500' />
      <span className='flex'>顏色</span>
      <div className='flex w-4 h-4'>
        <ColorInput color={ activeColor } onColorChange={ onColorChange } />
      </div>
    </div>
  );
};

export default Information;
