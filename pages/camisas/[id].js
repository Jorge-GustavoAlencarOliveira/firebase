import React from 'react'
import { useRouter } from 'next/router';
import {doc, getDoc} from 'firebase/firestore'
import { db } from '../../Components/Firebase';
import Link from 'next/link';
import styles from './Camisas.module.css'

const Camisas = () => {
  const router = useRouter();
  const {id} = router.query;
  const [produto, setProduto] = React.useState({});
  const [imagem, setImagem] = React.useState('');
  const imageRef = React.useRef();
  React.useEffect(() =>{ 
    async function singleProduto (){
      if(id){
        const docRef = doc(db, 'produtos', id);
        await getDoc(docRef)
        .then((item) =>{
          setProduto(item.data())
          setImagem(item.data().image[0])
        }) 
        .catch(error =>{
          console.log('error')
        }) 
      }
    }
    singleProduto();
  },[id]);
     
  function handleClick(src, target){
    imageRef.current.childNodes.forEach((item) => {
      item.classList.remove('borda')
    })
    setImagem(src);
    target.classList.add('borda')
  }
   
  if(produto) 
    return (  
      <section className='container'>
        <div className={styles.crumb}>
          <Link href='/'>Home/</Link>
          <Link href='/camisas'>Camisas/</Link>
          <span>{produto.nome}</span>
        </div>
        <div className={styles.produto}>
          <div className={styles.img}>
            <div ref={imageRef} className={styles.tumb}>
              {produto.image ? (produto.image.map((item, index) => {
                return (
                  <img onClick={({target}) => handleClick(item, target)} key={index} src={item} alt={produto.nome} />
                )
              })) : null}
            </div>
            <div className={styles.principal}>
              <img src={imagem} alt="foto" />
            </div>
          </div>
          <div>
            <h1>{produto.nome}</h1>
            <span>{produto.preco}</span>
            <p>{produto.descricao}</p>
          </div>
        </div>
      </section>
  )
}

export default Camisas
