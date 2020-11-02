import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './Navbar.style'

export const Navbar: React.FC = () => {
  const styles = useStyles()
  return (
    <div className={styles.navbar}>
      <h1 className={styles.header}>Baza rodowodowa</h1>
      <div className={styles.navigation}>
        <Link to="/psy">Psy</Link>
        <Link to="/hodowle">Hodowle</Link>
        <Link to="/informacje">Informacje</Link>
      </div>
    </div>
  )
}
