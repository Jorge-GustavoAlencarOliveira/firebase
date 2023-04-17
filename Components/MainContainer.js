import Header from './Header';
import Redes from './Redes';

const MainContainer = ({children}) => {
  return (
    <>
      <main>
        <Header/>      
        {children}
        <Redes/>
      </main>
    </>
  )
}

export default MainContainer;
