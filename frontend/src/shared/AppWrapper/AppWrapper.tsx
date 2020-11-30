import React from 'react';
import { Navbar } from '../Navbar';
import useStyles from './AppWrapper.style';

export const AppWrapper: React.FC = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.appWrapper}>
      <Navbar />
      <div className={styles.children}>{children}</div>
      <div className={styles.footer}>
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/freepik"
          target="__blank"
          title="Freepik"
        >
          Freepik{' '}
        </a>
        from{' '}
        <a href="https://www.flaticon.com/" target="__blank" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};
