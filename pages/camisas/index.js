import React from 'react'
import { db } from '../../Components/Firebase';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import styles from './Camisas.module.css'
import Card from '../../Components/Card';
import Search from '../../Components/Search';
import { useRouter } from 'next/router';

const index = () => {
  const {pathname} = useRouter();
  const [produto, setProduto] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [result, setResult] = React.useState([])
  React.useEffect(() => {
    async function Search (){      
      if(search){
        const q = query(collection(db, 'produtos'), where('nome', '==', search));
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
        console.log(listas)
      }
    }
    Search();
  },[search])

  function handleSearch({target}){
    setSearch(target.value)
  }

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
  },[])
  console.log(result.length)
  return (
    <div className='container'>
      <div className={styles.subHeader}>
        <h1 className={styles.title}>Camisas</h1>
        <Search onChange={handleSearch} value={search} />
      </div>
         {result.length ? 
         <div className={styles.camisas}>
           {(result.map((item) => {
             return(
               <Card key={item.id} produto={item} location={pathname}/>
             )
           }))}
         </div>
          : null}
      <section className={styles.camisas}>
        {produto.map((item) => {
          return (
            <Card key={item.id}  produto={item} location={pathname}/>
          )          
        })}
      </section>
    </div>
  )
}

export default index
