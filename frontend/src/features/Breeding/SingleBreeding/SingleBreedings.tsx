import React from 'react';
import { Button, useTheme, Theme } from '@material-ui/core';
import { DataCell } from '../../../shared/DataCell';
import { ReactComponent as BreedingSVG } from '../../../images/icons/breeding.svg';
import useStyles from './SingleBreedings.style';
import { useHistory } from 'react-router-dom';

export const SingleBreeding: React.FC<{ name: string; webPage: string }> = ({
  name,
  webPage,
}) => {
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const history = useHistory();

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.img}>
          <BreedingSVG />
        </div>
        <DataCell
          header="Hodowla"
          content={name}
          color={theme.palette.common.white}
          customMargin={theme.spacing(0)}
        />
      </div>
      <DataCell
        header="Strona intenetowa hodowli"
        contentAsAnchor
        content={webPage}
        color={theme.palette.common.white}
        customMargin={theme.spacing(0, 2, 0, 0)}
      />
      <Button
        className={styles.btn}
        variant="contained"
        onClick={() => history.push('/psy', { breeding: name })}
      >
        Zobacz psy z hodowli
      </Button>
    </div>
  );
};
