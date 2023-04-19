import React from 'react'
import styles from './Modal.module.css'
import { db } from './Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const Modal = ({setModal, modal, produto, id, category}) => {
  
  const router = useRouter();
  const [nome, setNome] = React.useState(produto?.nome || "");
  const [preco, setPreco] = React.useState(produto?.preco || "");
  const [descricao, setDescricao] = React.useState(produto?.descricao);
  
  async function updateTarefa() {
      if(nome === '' || preco === '' || descricao === ''){
        toast.warning('Preencha todos os campos');
        return        
      }
      if(produto){
        const docRef = doc(db, category, id);
        await updateDoc(docRef, {
          nome: nome,
          preco: preco,
          descricao: descricao,
        })
        .then(() => {
          toast.success('Produto atualizado');
          setModal(false);
          router.reload(window.location.pathname);
        })
        .catch((err) => {
          toast.error("Algo errado ocorreu." + err)
        })
      }
  }

  function handleUpdate(event){
    event.preventDefault();
    updateTarefa()
  }

  function handleOutsideClick (event){
    if(event.target === event.currentTarget) setModal(false)
  }

  if (modal){
    return (
      <div className={styles.modal} onClick={handleOutsideClick}>
        <div >
          <form onSubmit={handleUpdate} className={styles.form}>
            <label>Nome</label>
            <input 
              type="text" 
              value={nome}
              onChange={({target}) => setNome(target.value)}  
            />
            <label>Preço</label>
            <input 
              type="text" 
              value={preco}
              onChange={({target}) => setPreco(target.value)}  
              />
            <label>Descrição</label>
            <input 
              type="text" 
              value={descricao}
              onChange={({target}) => setDescricao(target.value)}  
              />
            <button>Atualizar</button>
          </form>
        </div>
      </div>
    )

  }
}

export default Modal
