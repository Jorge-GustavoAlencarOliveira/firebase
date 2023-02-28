import React from 'react'
import styles from './Redes.module.css'
import Facebook from '../assets/redes/facebook.svg'
import Instagram from '../assets/redes/instagram.svg'
import Image from 'next/image';
import Link from 'next/link';

const Redes = () => {
  return (
    <div className='container'>
      <div className={styles.redes}>
        <h1>Siga-nos nas redes sociais.</h1>
        <div className={styles.icon}>
          <Link href='#'><Image src={Facebook} alt='Facebook'></Image></Link>
          <Link href='#'><Image src={Instagram} alt='Instagram'></Image></Link>      
        </div>
      </div>
    </div>
  )
}

export default Redes;
