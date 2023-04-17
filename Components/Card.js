import React from 'react'
import styles from './Card.module.css'
import Link from 'next/link'
const Card = ({produto, location}) => {
  return (
    <div className={styles.card}>
      <Link href={`${location}/${produto.id}`}>       
        <div key={produto.id} className={styles.content}>
          <div className={styles.image}>
            <img src={produto.image} alt={produto.nome} />
          </div>
          <div className={styles.text}>
            <h1>{produto.nome}</h1>
            <span>R$ {produto.preco},00</span>
          </div>
        </div>         
      </Link>       
    </div>
  )
}
export default Card;
