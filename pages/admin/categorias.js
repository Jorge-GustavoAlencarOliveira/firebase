import React from 'react'
import {collection, doc, getDoc} from 'firebase/firestore'
import {db} from '../../Components/Firebase'

const Categorias = () => {
  const [category, setCategory] = React.useState('');

  async function handleNewCategory (){
    const newCategory = collection(db, "Camisetas")
    const docRef = doc(db, "Camisetas", 'Camiseta King e Joe')
    try{
      const produto = await getDoc(docRef)
      console.log(produto.data())
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <section className='container'>
      <h1>Adicione uma nova categoria</h1>
      <input 
        type="text"
        placeholder='Categoria'
        value={category}
        onChange={({target}) => setCategory(target.value)} 
      />
      <button onClick={handleNewCategory}>Adicionar</button> 
    </section>
  )
}

export default Categorias
