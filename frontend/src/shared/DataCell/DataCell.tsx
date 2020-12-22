import React, { useMemo } from 'react';
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

  const webPage = useMemo(() => {
    if (contentAsAnchor) {
      return content.includes('http') ? content : 'http://' + content;
    }
    return undefined;
  }, []);

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
        <a
          className={styles.anchor}
          style={{ fontSize: smallContent ? 14 : 16, color }}
          href={webPage}
          target="__blank"
        >
          {content}
        </a>
      ) : (
        <p style={{ fontSize: smallContent ? 16 : 17 }}>{content}</p>
      )}
    </div>
  );
};
