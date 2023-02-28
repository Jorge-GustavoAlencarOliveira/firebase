import "../styles.css"
import MainContainer from "../Components/MainContainer"
import UserStorage from "../UserContext"

export default function MyApp({ Component, pageProps }) {
  return (
    <UserStorage>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>      
    </UserStorage>
  )    
}