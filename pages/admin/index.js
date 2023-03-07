import React from "react";
import Link from "next/link";
import styles from "./Admin.module.css";
import { UserContext } from "../../UserContext";
import { useRouter } from "next/router";

const Admin = () => {
  const {userLogin, login} = React.useContext(UserContext)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
 
  async function handleLogin (event){
    event.preventDefault();
    if(email !== '' && password !== ''){
      userLogin(email, password)
    } else{
      alert('Preencha todos os campos')
    }
  }
  if(login){
    router.push('/admin/area');
  }
  return (
    <main className={styles.containerhome}>
        <h1 className={styles.title}>Área do administrador</h1>
        <span>Gerencie seu sie</span>
        <form onSubmit={handleLogin} className={styles.formulario}>
          <label >email:</label>
          <input 
            type="text" 
            id='email' 
            placeholder='Digite seu email' 
            value={email} 
            onChange={({target}) => setEmail(target.value)}
          />
          <label >Senha:</label>
          <input 
            type= "password" 
            id= 'password'
            placeholder= "*******" 
            value={password} 
            onChange={({target}) => setPassword(target.value)}
          />
          <button type="submit">Acessar</button>
        </form>
        <Link className={styles.link} href='/register'>Não possui conta? Cadastre-se</Link>
    </main>
    
  )
}

export default Admin;



    // {tarefas.map(item => (
    //   <article className={styles.lista} key={item.id}>
    //     <p>{item.tarefa}</p>
    //     <div>
    //       <button onClick={() => editarTarefa(item)}>Editar</button>
    //       <button onClick={() => deletarTarefa(item.id)}>Concluir</button>  
    //     </div> 
    //   </article>                    
    // ))}              

  {/* <textarea
    placeholder='Digite sua tarefa'
    value={tarefa}
    onChange={({target}) => setTarefa(target.value)}
  /> */}

  // React.useEffect(() =>{
    //   async function loadTarefas (){
    //     const tarefaRef = collection(db, 'tarefas');
    //     const q = query(tarefaRef, orderBy('created', 'desc'));
    //     onSnapshot(q, (snap) =>{
    //       let lista = []
    //       snap.forEach((doc) => {
    //         lista.push({
    //           id: doc.id,
    //           tarefa: doc.data().tarefa,
    //           userUid: doc.data().userUid,
    //         })
    //       })
    //       setTarefas(lista);
    //     }) 
    //   }
    //   loadTarefas();         
    // },[])
    
    
    
    // for(let i = 0; i < (image.length - 1); i++){
    //   Object.keys(image)magens.push([key, o[key]])
    // }

    //   await addDoc(collection(db, 'tarefas'),{
    //     tarefa: tarefa,
    //     created: new Date(),
    //     userUid: user?.uid,
    //   })
    //   .then(() =>{
    //     setTarefa('')
    //   })
    //   .catch(() => {
    //     console.log('error')
    //   })
    // }    
    // async function deletarTarefa(id){
    //    const docRef = doc(db, 'tarefas', id);
    //    await deleteDoc(docRef)
    // }
     
    // function editarTarefa(item){
    //   setTarefa(item.tarefa);
    //   setEditar(item);
    // }

    // async function updateTarefa() {
    //   const docRef = doc(db, 'tarefas', editar?.id);
    //   await updateDoc(docRef, {
    //     tarefa: tarefa,
    //   })
    //   .then(() => {
    //     console.log('atualizada');
    //     setTarefa('');
    //     setEditar({});
    //   })
    // }
      // const people = [
      //   "Siri",
      //   "Alexa",
      //   "Google",
      //   "Facebook",
      //   "Twitter",
      //   "Linkedin",
      //   "Sinkedin"
      // ];
      // let nomes = [];
      // produto.map(item => nomes.push(item.nome))      
      // console.log(nomes)
      // const [search, setSearch] = React.useState('');
      // const [result, setResult] = React.useState([]);
      // React.useEffect(() =>{
      //   const results = nomes.filter(person =>
      //     person.toLowerCase().includes(search.toLocaleLowerCase()));
      //   setResult(results);
      // },[search]);
 // console.log(image)
      // let imagens = []
      // Object.keys(image).map((key) => {
      //   imagens.push(image[key])
      // })
      // console.log(imagens)
      // if(image.type === 'image/jpeg' || image.type === 'image/png'){
        // imagens.map((itens) => setImgUrl( (item) => [...item, URL.createObjectURL(itens)]));
        // setImgUrl(URL.createObjectURL(image))
        // } else{
          //   alert('Envie uma imagem do tipo png ou jpeg');
          //   setImgUrl(null)
          // }
       

    // }
    // if(editar?.id){
      //   updateTarefa();
      //   return;
      // }
      
      // if(tarefa === ''){
        //   alert('Digite sua tarefa')
        //   return;
        // }