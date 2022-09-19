import { useCallback, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import ColorInput from './ColorInput';

const Picker = ({ onColorChange }) => {
  const selector = useCallback(
    ({ main: { activeColor, colors } }) => ({ activeColor, colors }),
    []
  );

  const { activeColor, colors } = useSelector(selector, shallowEqual);

  const onActiveColorChange = useCallback(
    color => onColorChange(color, false),
    [onColorChange]
  );

  const onSelectColorCallbacks = useMemo(
    () => colors.map(color => () => onColorChange(color, true)),
    [colors, onColorChange]
  );

  return (
    <div className='relative -translate-x-1/2 w-max px-3 py-4 bg-violet-100 ring-2 ring-violet-900 rounded'>
      <div className='flex space-x-3 leading-6'>
        <div className='w-4 h-4 flex'>
          <ColorInput color={ activeColor } onColorChange={ onActiveColorChange } />
        </div>
        <div className='w-px h-4 flex bg-black' />
        {
          colors.map((color, i) => (
            <div
              key={ i }
              onClick={ onSelectColorCallbacks[i] }
              style={{ 'backgroundColor': color }}
              className='w-4 h-4 flex ring-1 ring-offset-2 ring-black rounded-full'
            />
          ))
        }
      </div>
    </div>
  );
};

export default Picker;
