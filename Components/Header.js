import React from 'react';
import styles from './Header.module.css';
import Logo from '../assets/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import {FiUser} from 'react-icons/Fi';
import { UserContext } from '../UserContext';

const Header = () => {
  const {data, userLogout} = React.useContext(UserContext);
  const {pathname} = useRouter();
  return (
    <header className='container'>
      <div className={styles.header}>
        <div>
          <Link href='/'>
            <Image src={Logo} alt='Logo' width='100' height='100'/>
          </Link>
        </div>
        <nav className={styles.admin}>
            {data ? (
              <div className={styles.sign}>
                <span>{data.email}</span>
                <button onClick={userLogout}>Sair</button>
              </div>
            ) : (
              <Link className={styles.link} href='/admin'>
                Administrador 
              </Link>
            )}
        </nav>
      </div>
      <nav>
        <ul className={styles.nav}>
          <li><Link href='#'>Bermudas</Link></li>
          <li><Link href='#'>Calças</Link></li>
          <li className={pathname.startsWith('/camisas') ? 'active' : ''}><Link href='/camisas'>Camisas</Link></li>
          <li><Link href='#'>Camisetas</Link></li>
          <li><Link href='#'>Shorts</Link></li>
          <li><Link href='#'>Calçados</Link></li>
        </ul>       
      </nav>
    </header>
  )
}

export default Header
