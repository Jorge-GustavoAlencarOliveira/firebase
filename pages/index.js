import React from 'react';
import styles from './Home.module.css';
import { db} from '../Components/Firebase';
import { collection, getDocs, query} from 'firebase/firestore';
import Carousel from '../Components/Carousel';
import Head from 'next/head';
import Categories from '../Components/Categories';
import Logo from '../assets/icons/logo.svg'
import Image from 'next/image';


const Home = () => {
  const categories = Categories();
  const [produto, setProduto] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() =>{
    categories.map(async(category) =>{
      const q = query(collection(db, category))
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
        setProduto(produto => [...produto, lista]) 
    })
    setLoading(false)
  },[])
  
  if(loading){
    return(
      <div className='container' style={{display: 'flex', alignItems: 'center', justifyContent:'center', height: '80vh'}}>
        <Image src={Logo} width={200} alt='Logo' height={200}/>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>OutletMoc</title>
      </Head>
      <section>
        {produto.map((item, index) => {
          return(
            <div key={index} className={styles.container}>
              <h1>{categories[index]}</h1>
              <Carousel produto={item} category={categories[index]}/>
            </div>
          )
        })}
      </section>         
    </>
  )
}        
    
export default Home;

