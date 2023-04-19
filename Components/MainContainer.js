import Header from './Header';
import Redes from './Redes';

const MainContainer = ({children}) => {
  return (
    <>
      <Header/>      
      <main style={{minHeight:'60vh'}}>
        {children}
      </main>
      <Redes/>
    </>
  )
}

export default MainContainer;
