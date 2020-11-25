import React from 'react';
import useStyles from './ListWrapper.style';

interface ListWrapperProps {
  title: string;
  filter?: JSX.Element;
  additionalBtn?: JSX.Element;
}

export const ListWrapper: React.FC<ListWrapperProps> = ({
  title,
  filter,
  additionalBtn,
  children,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.listWrapper}>
      <h1 className={styles.header}>{title}</h1>
      <div className={styles.filtersAndBtn}>
        <div className={styles.filters}>{filter}</div>
        <div>{additionalBtn}</div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};
