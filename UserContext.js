import React from 'react'
import { auth } from './Components/Firebase';
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {useRouter} from "next/router";
import { toast } from 'react-toastify';

export const UserContext = React.createContext();


const UserStorage = ({children}) => {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] =React.useState(false); 
  const [error, setError] = React.useState(null);
  const [login, setLogin] = React.useState(false);

  async function userLogin (email, password){
    try{
      setError(null);
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        toast.success('Usuário logado com sucesso');
        setData(user.user);
        setLogin(true);
        router.push('/admin/area');
      })
    } catch {
      setError('Login e senha inválidos');
      setLoading(false)
      toast.error('Login e senha inválidos');
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() =>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          setData(user);
          setLogin(true)
        } else {
          setLogin(false)
        }
      })
    }
    checkLogin();      
  },[]);
  
  const userLogout = React.useCallback(
    async function (){
      await signOut(auth)
      setLogin(false);
      setData(null);
      localStorage.removeItem('userOutletmoc')
      toast.info('Usuário deslogado')
    }
  )
  return (
    <UserContext.Provider value={{userLogin, data, loading, error, login, userLogout}}>
       {children}
    </UserContext.Provider>
  )
}

export default UserStorage;
