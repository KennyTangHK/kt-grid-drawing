const ColorInput = ({ value, onChange, className }) => (
  <input
    value={ value }
    onChange={ onChange }
    type='color'
    style={{ 'backgroundColor': value }}
    className={ `w-full h-full ring-1 ring-offset-2 ring-black rounded-full ${ className }` }
  />
);

export default ColorInput;
