import React from 'react';
import Header from './Header';
import Redes from './Redes';

const MainContainer = ({children}) => {
  return (
    <>
      <main>
        <Header/>      
        {children}
      </main>
      <Redes/>
    </>
  )
}

export default MainContainer;
