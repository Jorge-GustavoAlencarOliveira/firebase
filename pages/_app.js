import React from "react";
import "../styles.css"
import MainContainer from "../Components/MainContainer"
import UserStorage from "../UserContext"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyApp({ Component, pageProps }) {
  return (
    <UserStorage>
      <MainContainer>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000}/>
      </MainContainer>      
    </UserStorage>
  )    
}