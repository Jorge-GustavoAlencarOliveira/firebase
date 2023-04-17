import React from 'react'
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {useRouter} from 'next/router'

const ProtectedRoute = ({children}) => {
  const [loading, setLoading] = React.useState(true);
  const [signed, setSigned] = React.useState(false);
  const router = useRouter();

  React.useEffect(() =>{
    async function checkLogin(){
      const unsub = onAuthStateChanged(auth, (user) =>{
        if(user){
          const userData = {
            uid: user.uid,
            email: user.email
          }
          localStorage.setItem('userOutletmoc', JSON.stringify(userData))
          setLoading(false)
          setSigned(true)

        } else{
          setLoading(false)
          setSigned(false)
        }
      })
    }
    checkLogin()
  },[]);

  if(loading){
    return(
      <div className='container'>Carregando...</div>
      )
  }
    
  if(!signed){  
    router.push('/admin')
    return;
  }
    
  return children;
}

export default ProtectedRoute;

