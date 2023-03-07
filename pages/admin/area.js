import React from 'react'
import ProtectedRoute from '../../Components/Helper/ProtectedRoute';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Components/Firebase';
import { addDoc, collection} from 'firebase/firestore';
import styles from "./Admin.module.css"
import {FiUpload} from 'react-icons/fi'
import { toast } from 'react-toastify';
const Area = () => {
  const [nome, setNome] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [img, setImg] = React.useState([]);
  const [url, setUrl] = React.useState([]);
  const [avatar, setAvatar] = React.useState('')

  function handleImg ({target}){
    for (let i = 0; i < target.files.length; i++){
      const image = target.files[i]
      setImg(item => [...item, image])
    }
    setAvatar(URL.createObjectURL(target.files[0]))
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
      setAvatar('');
      toast.success('produto registrado');
  }
  async function fotosubmit (event) {
    event.preventDefault();
    if (img === null) return;
      img.map( image => {
        const imageRef = ref(storage, `images/${image.name}`);
        uploadBytes(imageRef, image)
        .then((snapshot) =>{
          getDownloadURL(snapshot.ref)
          .then((url) => {
              setUrl(item => [...item, url])
          });
        })
      });
    toast.success("fotos enviadas")
  } 

  return (
    <>
      <ProtectedRoute>
        <section className={`container ${styles.area}`}>
          <h1>Novo Produto</h1>
          <form className={`formulario ${styles.formFoto}`} onSubmit={fotosubmit}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color='#000' />
              </span>
              <input 
                type="file" 
                multiple={true} 
                name='img' 
                id='img' 
                accept='image/*' 
                onChange={handleImg}
              />
              {avatar && 
                <img 
                  src={avatar} 
                  alt="Foto do produto" 
                  width={250}
                  height={250}
                />
              }
            </label>
            <button>enviar fotos</button>   
          </form>
          <form className='formulario' onSubmit={handleSubmit}>
            <label >Nome</label>
            <input 
              type='text' 
              value={nome} 
              onChange={(({target}) => setNome(target.value))} 
            />
            <label >Preço</label>
            <input 
              type='text'  
              value={preco}
              onChange={(({target}) => setPreco(target.value))}
            />
            <label >Descrição</label>
            <input 
              type='text' 
              value={descricao}
              onChange={(({target}) => setDescricao(target.value))}
            /> 
            <button>enviar produto</button>   
          </form>              
        </section>
      </ProtectedRoute>
    </>
  )
}
export default Area
