import { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Dot from './Dot';

const Grid = () => {
  const selector = useCallback(
    ({ main }) => ({ width: main.width, height: main.height }),
    []
  );

  const { width, height } = useSelector(selector, shallowEqual);

  return Array.from(
    Array((height * 2) + 1),
    (_, r) => (
      <div key={ r } className='w-max h-4 odd:pl-4'>
        {
          Array.from(
            Array(width + (r & 1)),
            (_, c) => (<Dot key={ c } r={ r } c={ c } />)
          )
        }
      </div>
    )
  );
};

export default Grid;
