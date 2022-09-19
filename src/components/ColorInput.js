import debounce from 'lodash.debounce';
import { useCallback, useMemo } from 'react';
import { normalizeColor } from '../helpers';

const ColorInput = ({ color, onColorChange, wait, className }) => {
  const _wait = parseInt(wait, 10) || 100;

  const onColorChangeDebounce = useMemo(
    () => debounce(
      color => onColorChange(normalizeColor(color)),
      _wait
    ),
    [onColorChange, _wait]
  );

  const callback = useCallback(
    event => onColorChangeDebounce(event.target.value),
    [onColorChangeDebounce]
  );

  return (
    <input
      value={ color }
      onChange={ callback }
      type='color'
      style={{ 'backgroundColor': color }}
      className={ `w-full h-full ring-1 ring-offset-2 ring-black rounded-full ${ className }` }
    />
  );
}

export default ColorInput;
