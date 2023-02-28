import React from 'react'
import ProtectedRoute from '../../Components/Helper/ProtectedRoute';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Components/Firebase';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc, getDocs} from 'firebase/firestore';
import styles from "./Admin.module.css"

const Area = () => {
  const [nome, setNome] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [img, setImg] = React.useState([]);
  const [url, setUrl] = React.useState([]);

  function handleImg ({target}){
    for (let i = 0; i < target.files.length; i++){
      const image = target.files[i]
      setImg(item => [...item, image])
    }
  }
  async function handleSubmit (event){
    event.preventDefault();
    if(url.length === 0){
      return 
    }
    await addDoc(collection(db, 'produtos'), {
      nome: nome,
      preco: preco,
      descricao: descricao,
      image: url,
    })
      setNome('');
      setDescricao('');
      setPreco('');
      setUrl([]);
      console.log('produto registrado');
  }
  async function fotosubmit (event) {
    event.preventDefault();
    if (img === null) return;
      img.map( image =>{
        const imageRef = ref(storage, `images/${image.name}`);
        uploadBytes(imageRef, image)
        .then((snapshot) =>{
          getDownloadURL(snapshot.ref)
          .then((url) => {
              setUrl(item => [...item, url])
          });
        })
      });
    console.log(url)
    console.log('fotos enviadas')
  } 

  return (
    <>
      <ProtectedRoute>
        <section className={`container ${styles.area}`}>
          <h1>Subir Produto</h1>
          <form className='formulario' onSubmit={handleSubmit}>
            <label >Nome</label>
            <input type='text' id='nome' value={nome} 
              onChange={(({target}) => setNome(target.value))} />
            <label >Preço</label>
            <input type='text' id='preco' value={preco}
                onChange={(({target}) => setPreco(target.value))}/>
            <label >Descrição</label>
            <input type='text' id='descricao' value={descricao}
                onChange={(({target}) => setDescricao(target.value))}/> 
            <button>enviar produto</button>   
          </form>              
          <form onSubmit={fotosubmit}>
            <input type="file" multiple={true} name='img' id='img' accept='image/*' 
              onChange={handleImg} />
            <button>enviar foto</button>   
          </form>
        </section>
      </ProtectedRoute>
    </>
  )
}
export default Area
