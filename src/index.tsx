import React from 'react';
import ReactDOM from 'react-dom/client';

import Notebook from './App';

const Hello: React.FC = () => {
  return (
    <>
      <Notebook />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>
);
