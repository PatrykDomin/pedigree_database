import React from 'react'
import Navbar from '../Navbar'
import useStyles from './AppWrapper.style'

export const AppWrapper: React.FC = ({ children }) => {
  const styles = useStyles()
  return (
    <div className={styles.appWrapper}>
      <Navbar />
      <div className={styles.children}>{children}</div>
    </div>
  )
}
