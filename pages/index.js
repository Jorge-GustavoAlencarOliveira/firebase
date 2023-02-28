import React from 'react';
import styles from './Home.module.css';
import { db} from '../Components/Firebase';
import { collection, onSnapshot} from 'firebase/firestore';
import Carousel from '../Components/Carousel';

const Home = () => {
  const [produto, setProduto] = React.useState([]);   
  React.useEffect(() =>{
    async function loadProduto(){
      const produtoRef = onSnapshot(collection(db, 'produtos'), (snapshot) => {
        let lista = [];
        snapshot.forEach(produto =>{
          lista.push({
            id: produto.id,
            nome: produto.data().nome,
            preco: produto.data().preco,
            descricao: produto.data().descricao,
            image: produto.data().image,
          })
        })
        setProduto(lista);
        })
      };
    loadProduto();         
  },[]);
  return (
    <section>
      <div className={styles.container}>
        <h1>Destaques</h1>
        <Carousel produto={produto}/>
      </div>
      <div className={styles.container}>
        <h1>Camisas</h1>
        <Carousel produto={produto}/>
      </div>
      <div className={styles.container}>
        <h1>Calças</h1>
        <Carousel produto={produto}/>
      </div>
    </section>         
  )
}        
    
export default Home;



