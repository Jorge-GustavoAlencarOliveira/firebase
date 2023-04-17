import React from 'react';
import styles from './Header.module.css';
import Logo from '../assets/icons/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from '../UserContext';
import {FaUser, FaSignOutAlt} from 'react-icons/fa';
import useMedia from './Matchmedia';
import ImagemMob from '../assets/WhatsApp Image 2022-08-01 at 20.54.08 (1).jpeg'

const Header = () => {
  const {data, userLogout} = React.useContext(UserContext);
  const {pathname} = useRouter();
  const mobile = useMedia('(max-width: 600px)')  
  

  return (
    <header className='container'>
      {!mobile ? (
        <div className={styles.header}>
          <div>
            <Link href='/'>
              <Image src={Logo} alt='Logo' width='100' height='100'/>
            </Link>
          </div>
          <nav className={styles.admin}>
                {data ? (
                  <div className={styles.sign}>
                    <Link href='/admin/area'>{data.email}</Link>
                    <button 
                      onClick={userLogout}
                      style={{background: 'transparent', border: 'none', marginTop: '3px'}}
                    >
                      <FaSignOutAlt size={20}/>
                    </button>
                  </div>
                ) : (
                  <Link className={styles.link} href='/admin'>
                    <FaUser size={24} color='#000' />
                  </Link>
                )}
            </nav>          
        </div>
      ) : (
        <div className={styles.headerMobile}>
            <Link href='/'>
              <Image src={Logo} alt='Logo' width='200' height='200'/>
            </Link>
        </div>
      )}
      {!mobile ? (
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
      ) : (
        <nav>
          <ul className={styles.navMobile}>
            <li >
              <Link href='/camisas' className={styles.navMobileItem}>
                <Image src={ImagemMob} width={90} height={90} style={{borderRadius: '100%', objectFit: 'cover'}} alt=''/>
                <button>Camisas</button>
              </Link>
            </li>
            <li >
              <Link href='/' className={styles.navMobileItem}>
                <Image src={ImagemMob} width={90} height={90} style={{borderRadius: '100%', objectFit: 'cover'}} alt=''/>
                <button>Camisetas</button>
              </Link>
            </li>
            <li >
              <Link href='/' className={styles.navMobileItem}>
                <Image src={ImagemMob} width={90} height={90} style={{borderRadius: '100%', objectFit: 'cover'}} alt=''/>
                <button>Calças</button>
              </Link>
            </li>
            <li >
              <Link href='/' className={styles.navMobileItem}>
                <Image src={ImagemMob} width={90} height={90} style={{borderRadius: '100%', objectFit: 'cover'}} alt=''/>
                <button>Bermudas</button>
              </Link>
            </li>
            <li >
              <Link href='/' className={styles.navMobileItem}>
                <Image src={ImagemMob} width={90} height={90} style={{borderRadius: '100%', objectFit: 'cover'}} alt=''/>
                <button>Calçados</button>
              </Link>
            </li>
          </ul>
        </nav>

      )}
      
    </header>
  )
}

export default Header
