import React from 'react';
import useStyles from './DataCell.style';
import { useTheme, Theme } from '@material-ui/core';

interface DataCellProps {
  header: string;
  content: string;
  color?: string;
  customMargin?: string | number;
}

export const DataCell: React.FC<DataCellProps> = ({
  header,
  content,
  color,
  customMargin,
}) => {
  const styles = useStyles();
  const theme = useTheme<Theme>();

  return (
    <div
      className={styles.cell}
      style={{
        color: color ?? 'inherit',
        margin: customMargin ? 0 : theme.spacing(2, 4, 2, 2),
      }}
    >
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
};
