import React from "react";
import "../styles.css"
import MainContainer from "../Components/MainContainer"
import UserStorage from "../UserContext"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <UserStorage>
      <MainContainer>
        <Component key={router.asPath} {...pageProps} />
      </MainContainer>      
      <ToastContainer autoClose={3000}/>
    </UserStorage>
  )    
}