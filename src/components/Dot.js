import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { openPicker, closePicker, setActiveColor, setDot } from './../slice';

import Picker from './Picker';

const Dot = ({ r, c }) => {
  const dispatch = useDispatch();

  const selector = useCallback(
    ({ main }) => ({
      value: main.grid[r][c],
      isPickerOpen: main.isPickerOpen && main.pickerPosition.r === r && main.pickerPosition.c === c
    }),
    [r, c]
  );

  const { value, isPickerOpen } = useSelector(selector, shallowEqual);

  const onColorChange = useCallback(
    (color, done) => {
      dispatch(setActiveColor(color));
      dispatch(setDot({ r, c }));

      if (done) {
        dispatch(closePicker());
      }
    },
    [dispatch, r, c]
  );

  const onClick = useCallback(
    () => {
      dispatch(setDot({ r, c }));
      dispatch(closePicker());
    },
    [dispatch, r, c]
  );

  const onDoubleClick = useCallback(
    () => dispatch(openPicker({ r, c })),
    [dispatch, r, c]
  );

  return (
    <div className='inline-block relative w-4 h-4 mr-4 select-none'>
      <div
        onClick={ onClick }
        onDoubleClick={ onDoubleClick }
        style={{ 'backgroundColor': value }}
        className={ `absolute w-4 h-4 rounded-full transition origin-center ${ isPickerOpen ? 'scale-150' : 'scale-110' }` }
      />
      {
        isPickerOpen
        ? (
          <div className='absolute z-10 inset-x-0 -top-16 left-1/2'>
            <Picker onColorChange={ onColorChange } />
          </div>
        )
        : null
      }
    </div>
  );
};

export default Dot;
