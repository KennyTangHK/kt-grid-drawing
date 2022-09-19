import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadImageDataFromFileAsync } from '../helpers';
import { initGridWithImageData } from '../slice';

const LoadButton = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const openCallback = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeCallback = useCallback(() => setIsOpen(false), [setIsOpen]);

  const fileChangeCallback = useCallback(
    event => {
      const [file] = event.target.files;

      if (file) {
        loadImageDataFromFileAsync(file)
          .then(imageData => dispatch(initGridWithImageData(imageData)))
          .catch(error => console.error(error));
      }

      closeCallback();
    },
    [dispatch, closeCallback]
  );

  if (isOpen) {
    return (
      <div className='w-max px-2 py-4 bg-violet-100 ring-2 ring-violet-900 rounded'>
        <div className='flex items-center space-x-2'>
          <div className='flex h-8'>
            <input
              onChange={ fileChangeCallback }
              type='file'
              accept='.txt,text/*'
              className='block h-full text-sm text-slate-500 file:cursor-pointer file:h-full file:px-4 file:rounded file:text-base file:text-white file:bg-violet-500 file:border-0 hover:file:bg-violet-400'
            />
          </div>
          <div className='flex w-2 h-px' />
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
    >開啟</button>
  );
};

export default LoadButton;
