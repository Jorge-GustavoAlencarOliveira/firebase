import React from 'react';
import {FiSearch} from 'react-icons/Fi';
import styles from './Search.module.css';

const Search = ({onChange, value}) => { 
  return (
    <div className={styles.search}>
      <input 
        type="search" 
        onChange={onChange}
        placeholder='Buscar'
        value={value}
      />
      <button>
        <FiSearch />
      </button>
    </div>
  )
}

export default Search
