import React, { useEffect, useState } from 'react';
import useStyles from './Breeding.style';
import { ListWrapper } from '../../shared/ListWrapper';
import { Button, Fade, Grid } from '@material-ui/core';
import { SingleBreeding } from './SingleBreeding';
import { useStore } from '../../core/store/store';
import { AddBreedingForm } from './AddBreedingForm';
import { TextField } from '../../shared/Input/Input';

export const Breeding: React.FC = () => {
  const styles = useStyles();

  const [nameFilter, setNameFilter] = useState('');
  const [breederFilter, setBreederFilter] = useState('');

  const breedingsLength = useStore(state => state.breedings.length);
  const filteredBreedings = useStore(state =>
    state.breedings
      .filter(br => br.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .filter(br =>
        br.breeder.toLowerCase().includes(breederFilter.toLowerCase())
      )
  );
  const getBreedings = useStore(state => state.fetchBreedings);

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    if (!breedingsLength) {
      getBreedings();
    }
  }, [getBreedings, breedingsLength]);

  return (
    <ListWrapper
      title="Lista hodowli"
      filter={
        <>
          <TextField
            style={{ width: 280 }}
            color="secondary"
            variant="outlined"
            label="Nazwa hodowli"
            value={nameFilter}
            onChange={e => {
              setNameFilter(e.target.value);
            }}
          />
          <TextField
            style={{ width: 280 }}
            color="secondary"
            variant="outlined"
            label="Hodowca"
            value={breederFilter}
            onChange={e => {
              setBreederFilter(e.target.value);
            }}
          />
        </>
      }
      additionalBtn={
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Dodaj hodowlę
        </Button>
      }
    >
      <Fade in={Boolean(breedingsLength)} {...{ timeout: 800 }}>
        <Grid
          container
          justify="flex-end"
          spacing={6}
          className={styles.wrapper}
        >
          {filteredBreedings.map(el => {
            return (
              <Grid key={el.id} item xs={12} md={6} lg={4}>
                <SingleBreeding name={el.name} breeder={el.breeder} />
              </Grid>
            );
          })}
        </Grid>
      </Fade>
      <AddBreedingForm open={openModal} close={closeModal} />
    </ListWrapper>
  );
};
