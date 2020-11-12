import React from 'react'
import useStyles from './ListWrapper.style'

interface ListWrapperProps {
  title: string
  additionalBtn?: JSX.Element
}

export const ListWrapper: React.FC<ListWrapperProps> = ({
  title,
  additionalBtn,
  children,
}) => {
  const styles = useStyles()
  return (
    <div className={styles.listWrapper}>
      <h1 className={styles.header}>{title}</h1>
      <div className={styles.filtersAndBtn}>
        <div> TUTAJ BĘDĄ OPCJE SORTOWANIA (osobny komponent) </div>
        <div>{additionalBtn}</div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}
