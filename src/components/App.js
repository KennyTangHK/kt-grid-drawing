import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { initGrid, initGridWithImageData } from './../slice';

import ExportButton from './ExportButton';
import LoadButton from './LoadButton';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import Grid from './Grid';
import { loadImageDataFromLocalStorageAsync } from '../helpers';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      loadImageDataFromLocalStorageAsync()
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
    },
    [dispatch]
  );

  if (isLoading) {
    return (
      <div className='w-max'><p className='text-sm'>Loading</p></div>
    );
  }

  return (
    <div className='w-max'>
      <div className='w-max mx-16 py-8'>
        <div className='flex space-x-3 items-center'>
          <div className='flex'><LoadButton /></div>
          <div className='flex'><SaveButton /></div>
          <div className='flex'><ExportButton /></div>
          <div className='flex'><ResetButton /></div>
        </div>
      </div>
      <div className='w-max mx-16 mb-16 p-16 bg-white border border-slate-300 rounded'>
        <Grid />
      </div>
    </div>
  );
};

export default App;
