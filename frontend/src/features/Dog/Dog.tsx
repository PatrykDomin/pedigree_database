import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DogType, DogWithLittersType } from '../../core/apiTypes/apiType';
import { useStore } from '../../core/store/store';
import { UpdateDogFrom } from './UpdateDogForm';
import useStyles from './Dog.styles';
import { SingleCard } from './SingleCard';
import { DataCell } from '../../shared/DataCell';
import {
  Button,
  Collapse,
  Divider,
  Fade,
  Grid,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { isEmpty } from 'ramda';

export const Dog: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { pkr } = useParams<{ pkr: string }>();

  const dogs = useStore(state => state.dogs);
  const getDogs = useStore(state => state.fetchDogs);

  const [showModal, setShowModal] = useState(false);
  const [dogData, setDogData] = useState<DogWithLittersType>();
  const [showLitters, setShowLitters] = useState<number | null>(null);

  const getDogWithChildren = useCallback(async (pkr: string) => {
    const response = await fetch(`http://localhost:4200/dog/${pkr}`);
    const data: DogWithLittersType = await response.json();
    setDogData(data);
  }, []);

  useEffect(() => {
    //reset after dog change
    setShowLitters(null);
  }, [pkr]);

  useEffect(() => {
    if (pkr) {
      getDogWithChildren(pkr);
    }
  }, [pkr, getDogWithChildren]);

  const { dog, litters } = dogData ?? {};

  return (
    <div className={styles.wrapper}>
      <Fade in={Boolean(dog)} {...{ timeout: 800 }}>
        <div className={styles.tree}>
          <Collapse in={showLitters === null}>
            <div className={styles.section}>
              <h1>Rodzice</h1>
              <Grid
                container
                justify="space-around"
                spacing={mediumScreen ? 6 : 10}
              >
                {dog?.mom || dog?.dad ? (
                  <>
                    {dog?.mom && (
                      <Grid item xs={12} md={6}>
                        <SingleCard
                          width={mediumScreen ? '100%' : 320}
                          header="Matka"
                          data={{ name: dog.mom.name, link: dog.mom.pkr }}
                        />
                      </Grid>
                    )}
                    {dog?.dad && (
                      <Grid item xs={12} md={6}>
                        <SingleCard
                          width={mediumScreen ? '100%' : 320}
                          header="Ojciec"
                          data={{ name: dog.dad.name, link: dog.dad.pkr }}
                        />
                      </Grid>
                    )}
                  </>
                ) : (
                  <Grid
                    item
                    xs={12}
                    style={{ fontSize: 20, opacity: 0.8, textAlign: 'center' }}
                  >
                    Nie podano
                  </Grid>
                )}
              </Grid>
            </div>
          </Collapse>
          <div className={styles.section}>
            <h1>Wybrany pies</h1>
            {dog && (
              <SingleCard
                header="Imię"
                width={320}
                data={{ name: dog.name, link: '' }}
              />
            )}
          </div>
          {!isEmpty(litters) && (
            <div className={styles.section}>
              <h1>Mioty</h1>
              <Grid container spacing={mediumScreen ? 6 : 10}>
                {litters &&
                  litters.map((litter, i) => {
                    return (
                      <Grid
                        key={litter.parent?.pkr || i}
                        xs={12}
                        md={6}
                        lg={4}
                        item
                      >
                        <SingleCard
                          header={
                            litter.parent
                              ? dog?.sex
                                ? 'Matka'
                                : 'Ojciec'
                              : 'Rodzic'
                          }
                          data={{
                            name: litter.parent?.name ?? '',
                            link: litter.parent?.pkr ?? '',
                          }}
                          toggleLitters={(close?: boolean) =>
                            close
                              ? setShowLitters(null)
                              : setShowLitters(prev =>
                                  prev === null || prev !== i ? i : null
                                )
                          }
                          selected={showLitters === i}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          )}
          <Collapse in={Boolean(showLitters !== null && !isEmpty(litters))}>
            {litters && showLitters !== null && (
              <div className={styles.section}>
                <h1>
                  Mioty: {dog?.name} i{' '}
                  {litters[showLitters]?.parent?.name ?? 'Nie podano'}
                </h1>
                {console.log(litters, showLitters)}
                <Grid container spacing={mediumScreen ? 6 : 10}>
                  {Object.entries(litters[showLitters].children).map(litter => {
                    const [date, dogs] = litter;
                    return (
                      <Grid key={date} xs={12} md={4} lg={3} item>
                        <SingleCard
                          header="Miot"
                          data={{
                            name: `${dogs[0].litter} - ${date}`,
                            link: '',
                          }}
                          litter={dogs}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            )}
          </Collapse>
        </div>
      </Fade>

      <div className={styles.dogData}>
        <div className={styles.dogDataTitle}>
          <h1>Dane psa</h1>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              !dogs.length && getDogs();
              setShowModal(true);
            }}
          >
            Edytuj
          </Button>
        </div>
        <Collapse in={Boolean(dog)}>
          <DataCell header="Imię" content={dog?.name ?? ''} />
          <Divider />
          <DataCell
            header="Imię rodowodowe"
            content={dog?.pedigreeName ?? ''}
          />
          <Divider />
          <DataCell header="PKR" content={dog?.pkr ?? ''} />
          <Divider />
          <DataCell header="Hodowla" content={dog?.breeding.name ?? ''} />
        </Collapse>
      </div>
      <UpdateDogFrom
        open={showModal}
        close={() => setShowModal(false)}
        dog={dog ?? ({} as DogType)}
        callback={getDogWithChildren}
        dogs={dogs}
      />
    </div>
  );
};
