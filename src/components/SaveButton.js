import { useCallback, useState } from 'react';
import { useStore } from 'react-redux';
import { saveGridToFile } from '../helpers';

const SaveButton = () => {
  const store = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const openCallback = useCallback(
    () => {
      setIsOpen(true);
      setFileName('檔案');
    },
    [setIsOpen]
  );
  const closeCallback = useCallback(() => setIsOpen(false), [setIsOpen]);

  const setFileNameCallback = useCallback(event => setFileName(event.target.value), [setFileName]);

  const saveCallback = useCallback(
    () => {
      const { main } = store.getState();
      const { grid, width, height } = main;

      saveGridToFile(grid, width, height, fileName);
      closeCallback();
    },
    [store, fileName, closeCallback]
  );

  const inputClassName = 'block w-32 rounded border-slate-300 focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50';

  if (isOpen) {
    return (
      <div className='w-max px-2 py-4 bg-violet-100 ring-2 ring-violet-900 rounded'>
        <div className='flex items-center space-x-2'>
          <label htmlFor='fileName' className='flex text-sm'>檔案名稱</label>
          <div className='flex h-8'>
            <input
              value={ fileName }
              onChange={ setFileNameCallback }
              id='fileName'
              type='text'
              className={ inputClassName }
            />
          </div>
          <div className='flex w-2 h-px' />
          <div className='flex h-8'>
            <button
              className='h-8 px-4 rounded text-white bg-violet-500 hover:bg-violet-400'
              onClick={ saveCallback }
            >儲存</button>
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
      className='h-8 px-4 rounded text-violet-500 bg-violet-100 hover:bg-violet-200'
      onClick={ openCallback }
    >儲存</button>
  );
};

export default SaveButton;
