import React from 'react'
import styles from './Carousel.module.css'
import {motion} from 'framer-motion'
import Link from 'next/link'

const Carousel = ({produto}) => {
  console.log(produto)
  const carousel = React.useRef();
  const [width, setWidth] = React.useState(0)
  React.useEffect(() =>{
    console.log(width)
   setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  },[produto])
  return (
    <div className={styles.carousel}>
      <motion.div 
        ref={carousel} 
        className={styles.slides} 
        whileTap={{cursor: 'grabbing'}}>
        <motion.div className={styles.inner}
          drag='x'
          dragConstraints={{right: 0, left: - width}}
        >
          {produto.map((item) => {
            return (
              <motion.div className={styles.imagens} key={item.id}>
                  <img src={item.image} alt='foto'/>
                  <Link href={`/camisas/${item.id}`}>
                    <div className={styles.nome}>
                      <h2>{item.nome}</h2>
                    </div>
                  </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>      

    </div>
  )
}

export default Carousel
