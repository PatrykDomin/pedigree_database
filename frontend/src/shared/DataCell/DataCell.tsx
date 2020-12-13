import React from 'react';
import useStyles from './DataCell.style';
import { useTheme, Theme } from '@material-ui/core';

interface DataCellProps {
  header: string;
  content: string;
  smallContent?: boolean;
  contentAsAnchor?: boolean;
  color?: string;
  customMargin?: string | number;
}

export const DataCell: React.FC<DataCellProps> = ({
  header,
  content,
  smallContent,
  contentAsAnchor,
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
        margin: customMargin ? customMargin : theme.spacing(1),
      }}
    >
      <h3 className={styles.header}>{header}</h3>
      {contentAsAnchor ? (
        <a className={styles.anchor} href={content} target="__blank">
          {content}
        </a>
      ) : (
        <p style={{ fontSize: smallContent ? 16 : 17 }}>{content}</p>
      )}
    </div>
  );
};
