import React from 'react'
import useStyles from './DataCell.style'

interface DataCellProps {
  header: string
  content: string
}

export const DataCell: React.FC<DataCellProps> = ({ header, content }) => {
  const styles = useStyles()

  return (
    <div className={styles.cell}>
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  )
}
