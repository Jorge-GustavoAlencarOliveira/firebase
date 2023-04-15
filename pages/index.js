import React from 'react';
import styles from './Home.module.css';
import { db} from '../Components/Firebase';
import { collection, getDocs, onSnapshot, query} from 'firebase/firestore';
import Carousel from '../Components/Carousel';
import Head from 'next/head';

const Home = ({lista}) => {
  const [produto, setProduto] = React.useState(lista || []);   
  return (
    <>
      <Head>
        <title>OutletMoc</title>
      </Head>
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
    </>
  )
}        
    
export default Home;

export const getServerSideProps = async () => {
  try{
    const q = query(collection(db, 'produtos'))
    const produtos = await getDocs(q)
    let lista = []            
    produtos.forEach(produto => {
        lista.push({
          id: produto.id,
          nome: produto.data().nome,
          preco: produto.data().preco,
          descricao: produto.data().descricao,
          image: produto.data().image,
        })
      })
    return {
      props:{ 
        lista: lista     
      }
    }
  }catch(err){
    return{
      props:{}
    }    
    }
  }
