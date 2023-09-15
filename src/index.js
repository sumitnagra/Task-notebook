
import React from 'react';
import ReactDOM from 'react-dom/client';

import Notebook from './App';




const Hello = () => {

  return (<>

     <Notebook />
  </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <Hello />
</React.StrictMode>
);
