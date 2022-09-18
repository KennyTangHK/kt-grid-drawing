import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initGrid } from './../slice';

import ExportButton from './ExportButton';
import LoadButton from './LoadButton';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import Grid from './Grid';

const App = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(initGrid({ width: 15, height: 15, color: '#CCCCCC' }));
    },
    [dispatch]
  );

  return (
    <div className='w-max'>
      <div className='w-max mx-16 py-8'>
        <div className='flex flex-row space-x-3 items-center'>
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
