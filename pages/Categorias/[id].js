import React, { useCallback } from 'react'
import { db } from '../../Components/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './Camisas.module.css'
import Card from '../../Components/Card';
import Search from '../../Components/Search';
import { useRouter } from 'next/router';
import useMedia from '../../Components/Matchmedia';
import Categories from '../../Components/Categories';

const index = ({produtos}) => {
  const [produto, setProduto] = React.useState(produtos || []);
  const [search, setSearch] = React.useState('');
  const [result, setResult] = React.useState([]);
  const mobile = useMedia('(max-width: 600px)');
  const router = useRouter();
  const {id} = router.query; 
  const {isFallback} = useRouter();
  
  React.useEffect(() => {
    async function Search (){      
      if(search){
        const q = query(collection(db, id), where('nome', '==', search));
        const querySnapshot = await getDocs(q);
        let listas = [];
        querySnapshot.forEach(produto => {
          listas.push({  
            id: produto.id,
            nome: produto.data().nome,
            preco: produto.data().preco,
            descricao: produto.data().descricao,
            image: produto.data().image
          })
        })
        setResult(listas);
      }
    }
    Search();
  },[search])
   

  function handleSearch({target}){
    setSearch(target.value)
  }

  if(isFallback){
    return(
      <div>Carregando...</div>
    )
  }

  return (
    <div className='container'>
      <div className={styles.subHeader}>
        <h1 className={styles.title}>{id}</h1>
        {!mobile && (
          <Search onChange={handleSearch} value={search} />
        )}
      </div>
         {result.length ? 
         <div className={styles.camisas}>
           {(result.map((item) => {
             return(
               <Card key={item.id} produto={item} id={id}/>
             )
           }))}
         </div>
          : null}
      <section className={styles.camisas}>
        {produto.map((item) => {
          return (
            <Card key={item.id}  produto={item} id={id}/>
          )          
        })}
      </section>
    </div>
  )
}

export default index

export const getStaticPaths = async () =>{
  const categories = Categories();
  const paths = categories.map(category =>{
    return {params: {id: category}}
  })
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}


export const getStaticProps = async (ctx) =>{
  const {id} = ctx.params;
  try{
    const q = query(collection(db, id));
    const produto = await getDocs(q);
      let lista = [];
      produto.forEach(produto =>{
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
        produtos: lista
      }
    }
  }catch(err){
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}