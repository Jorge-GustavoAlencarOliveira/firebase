import React from 'react'
import styles from "../Home.module.css";
import Link from 'next/link';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from '../../Components/Firebase';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  async function handleRegister (event){
    event.preventDefault();
    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/admin')
      })
      .catch(() => {
        console.log('erro')
      })
    } else{
      alert('Preencha todos os campos')
    }
  }
  return (
    <main className={styles.containerhome}>
        <h1 className={styles.title}>Cadastre-se</h1>
        <span>Gerencia sua agenda de forma fácil</span>
        <form onSubmit={handleRegister} className={styles.formulario}>
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
          <button type="submit">Cadastrar</button>
        </form>
        <Link className={styles.link} href='/'>Já possui conta? Faça login!</Link>
    </main>
    
  )
}

export default Register;
