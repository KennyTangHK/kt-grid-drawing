import { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { initGrid, initGridWithImageData } from './../slice';

import ExportButton from './ExportButton';
import Grid from './Grid';
import LoadButton from './LoadButton';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';

import {
  getImageDataFromLocalStorageAsync,
  setDataUrlToLocalStorage,
  saveGridToDataUrl
} from '../helpers';

const App = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      getImageDataFromLocalStorageAsync()
        .then(
          imageData => {
            dispatch(initGridWithImageData(imageData));
            setIsLoading(false);
          }
        )
        .catch(
          () => {
            dispatch(initGrid({ width: 15, height: 15, color: '#CCCCCC' }));
            setIsLoading(false);
          }
        );
      
      const interval = setInterval(
        () => {
          const { main } = store.getState();
          const { grid, width, height } = main;

          const dataUrl = saveGridToDataUrl(grid, width, height);
          setDataUrlToLocalStorage(dataUrl);
        },
        15000
      );

      return () => clearInterval(interval);
    },
    [dispatch, store]
  );

  if (isLoading) {
    return (
      <div className='w-max'><p className='text-sm'>Loading</p></div>
    );
  }

  return (
    <div className='w-max px-16 pb-16'>
      <div className='w-max py-8'>
        <div className='flex space-x-3 items-center'>
          <div className='flex'><LoadButton /></div>
          <div className='flex'><SaveButton /></div>
          <div className='flex'><ExportButton /></div>
          <div className='flex'><ResetButton /></div>
        </div>
      </div>
      <div className='w-max p-16 bg-white border border-slate-300 rounded'>
        <Grid />
      </div>
    </div>
  );
};

export default App;
