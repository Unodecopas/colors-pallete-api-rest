import React from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo.svg'
const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo Color Picker" />
      <h1>Color pallete generator</h1>
    </header>
  )
}

export default Header
