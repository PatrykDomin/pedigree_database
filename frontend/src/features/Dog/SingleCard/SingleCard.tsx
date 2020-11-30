import React, { useState } from 'react';
import useStyles from './SingleCard.style';
import { ReactComponent as DogSVG } from '../../../images/icons/dog.svg';
import { DataCell } from '../../../shared/DataCell';
import { useTheme, Theme, Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { DogType } from '../../../core/apiTypes/apiType';
import { CustomModal } from '../../../shared/Modal';

interface SingleCardProps {
  header: string;
  data: { name: string; link: string };
  width?: number | string;
  toggleLitters?: (close?: boolean) => void;
  selected?: boolean;
  litter?: DogType[];
}

export const SingleCard: React.FC<SingleCardProps> = ({
  header,
  data,
  width,
  toggleLitters,
  selected,
  litter,
}) => {
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const history = useHistory();

  const [showLitterModal, setShowLitterModal] = useState(false);

  return (
    <div
      className={`${styles.card} ${selected && styles.selectedCard} ${
        litter && styles.litterCard
      }`}
      style={width ? { width } : {}}
    >
      <>
        <div className={styles.topRow}>
          <div className={styles.img}>
            <DogSVG />
          </div>
          <DataCell
            header={header}
            content={data?.name || 'Nie podano'}
            smallContent={Boolean(litter)}
            color={theme.palette.common.white}
            customMargin={theme.spacing(0)}
          />
        </div>
        <div className={styles.btnWrapper}>
          {data.link && (
            <Button
              className={styles.btn}
              variant="contained"
              onClick={() => {
                toggleLitters && toggleLitters(true);
                history.push(`/psy/${data.link}`);
              }}
            >
              Zobacz psa
            </Button>
          )}
          {toggleLitters && (
            <Button
              className={styles.btn}
              variant="contained"
              color="primary"
              onClick={() => toggleLitters()}
            >
              {selected ? 'Ukryj mioty' : 'Pokaż mioty'}
            </Button>
          )}
        </div>
        {litter && (
          <Button
            className={styles.btnLitter}
            variant="text"
            color="primary"
            onClick={() => setShowLitterModal(true)}
          >
            Pokaż dzieci
          </Button>
        )}
      </>
      {litter && (
        <CustomModal
          open={showLitterModal}
          close={() => setShowLitterModal(false)}
          title={`Miot: ${litter[0].litter}`}
          closeButton={
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setShowLitterModal(false)}
            >
              Zamknij
            </Button>
          }
          maxWidth="md"
        >
          {litter.map((dog, i) => (
            <Grid
              key={dog.pkr}
              container
              direction="row"
              style={
                i % 2 === 0
                  ? { backgroundColor: theme.palette.secondary.light }
                  : {}
              }
            >
              <Grid item xs={3}>
                <DataCell header="Nr PKR" content={dog.pkr} smallContent />
              </Grid>
              <Grid item xs={3}>
                <DataCell header="Imię" content={dog.name} smallContent />
              </Grid>
              <Grid item xs={5}>
                <DataCell
                  header="Imię rodowodowe"
                  content={dog.pedigreeName}
                  smallContent
                />
              </Grid>
              <Grid item xs={1}>
                <Link to={`/psy/${dog.pkr}`}>Zobacz</Link>
              </Grid>
            </Grid>
          ))}
        </CustomModal>
      )}
    </div>
  );
};
