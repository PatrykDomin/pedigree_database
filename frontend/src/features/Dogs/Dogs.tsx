import React, { useEffect, useState } from 'react';
import useStyles from './Dogs.style';
import { ListWrapper } from '../../shared/ListWrapper';
import { Button, Grid, TextField, useTheme, Theme } from '@material-ui/core';
import { DataCell } from '../../shared/DataCell';
import { useStore } from '../../core/store/store';
import { AddDogForm } from './AddDogForm';
import { format, parseISO } from 'date-fns';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { DOGS_PER_PAGE } from './Dogs.utils';
import { SizeMe } from 'react-sizeme';
import { ReactComponent as DiagramSVG } from '../../images/icons/diagram.svg';
import { isEmpty } from 'ramda';

// const mocked: IDog[] = [
//   ...new Array(40)
//     .fill({
//       birth: '2020-10-27T00:00:00.000Z',
//       breeding: { id: 1, name: 'Bahaticca', breeder: 'Alicja Paździerkiewicz' },
//       breedingId: 1,
//       dad: null,
//       dadId: null,
//       id: 1,
//       litter: 'T',
//       mom: null,
//       momId: null,
//       name: 'Ticca',
//       pedigreeName: 'Autobot Ticca',
//       pkr: 'TiccaPKR',
//       sex: false,
//     })
//     .map((el, index) => ({
//       ...el,
//       id: index,
//       pkr: `Nazwa psa ${index}`,
//     })),
// ];

export const Dogs: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme<Theme>();

  const history = useHistory();
  const { state } = useLocation<{ breeding?: string }>();

  const [tableHeight, setTableHeight] = useState(0);

  const [startingIndex, setStartingIndex] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [breedingNameFilter, setBreedingNameFilter] = useState(
    state?.breeding ?? ''
  );
  const [parentNameFilter, setParentNameFilter] = useState('');
  const [filteredLength, setFilteredLength] = useState(0);

  const dogsLength = useStore(state => state.dogs.length);
  const filteredDogs = useStore(state =>
    state.dogs
      .filter(dog =>
        dog.pedigreeName.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .filter(dog =>
        dog.breeding.name
          .toLowerCase()
          .includes(breedingNameFilter.toLowerCase())
      )
      .filter(dog =>
        parentNameFilter
          ? dog.mom?.name
              .toLowerCase()
              .includes(parentNameFilter.toLowerCase()) ||
            dog.dad?.name.toLowerCase().includes(parentNameFilter.toLowerCase())
          : dog
      )
  );

  const getDogs = useStore(state => state.fetchDogs);

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    if (state && state.breeding) {
      history.replace({ state: {} });
    }
  }, [state, history]);

  useEffect(() => {
    if (!dogsLength) {
      getDogs();
    }
  }, [getDogs, dogsLength]);

  useEffect(() => {
    setFilteredLength(filteredDogs.length);
  }, [filteredDogs, setFilteredLength]);

  useEffect(() => {
    if (filteredLength) {
      setStartingIndex(0);
    }
  }, [filteredLength]);

  return (
    <ListWrapper
      title="Lista psów"
      filter={
        <>
          <TextField
            color="secondary"
            variant="outlined"
            label="Imię rodowodowe"
            value={nameFilter}
            onChange={e => {
              setNameFilter(e.target.value);
            }}
          />
          <TextField
            color="secondary"
            variant="outlined"
            label="Imię rodzica"
            value={parentNameFilter}
            onChange={e => {
              setParentNameFilter(e.target.value);
            }}
          />
          <TextField
            color="secondary"
            variant="outlined"
            label="Hodowla"
            value={breedingNameFilter}
            onChange={e => setBreedingNameFilter(e.target.value)}
          />
        </>
      }
      additionalBtn={
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Dodaj psa
        </Button>
      }
    >
      <Grid
        container
        direction="column"
        className={styles.table}
        style={{ height: tableHeight }}
      >
        <SizeMe monitorHeight>
          {({ size }) => {
            setTimeout(() => {
              size.height && setTableHeight(size.height + 12);
            }, 50);
            return (
              <Grid container direction="column">
                {isEmpty(filteredDogs) ? (
                  <div className={styles.emptyList}>
                    Brak wyników wyszukiwania
                  </div>
                ) : (
                  filteredDogs
                    .slice(
                      startingIndex * DOGS_PER_PAGE,
                      startingIndex * DOGS_PER_PAGE + DOGS_PER_PAGE
                    )
                    .map(
                      ({ pkr, birth, pedigreeName, mom, dad, breeding }, i) => {
                        return (
                          <Grid
                            key={pkr}
                            container
                            direction="row"
                            style={
                              i % 2 === 0
                                ? {
                                    backgroundColor:
                                      theme.palette.primary.light,
                                  }
                                : {}
                            }
                            className={styles.row}
                          >
                            <Grid item xs={2}>
                              <DataCell header="Nr PKR" content={pkr} />
                            </Grid>
                            <Grid item xs={1}>
                              <DataCell
                                header="Narodziny"
                                content={format(parseISO(birth), 'dd.MM.yyyy')}
                                smallContent
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <DataCell
                                header="Imię rodowodowe"
                                content={pedigreeName}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <DataCell
                                header="Matka"
                                content={mom?.name ?? 'Nie podano'}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <DataCell
                                header="Ojciec"
                                content={dad?.name ?? 'Nie podano'}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <DataCell
                                header="Hodowla"
                                content={breeding.name}
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <Link
                                to={`/psy/${pkr}`}
                                className={styles.treeBtn}
                              >
                                <DiagramSVG />
                              </Link>
                            </Grid>
                          </Grid>
                        );
                      }
                    )
                )}
              </Grid>
            );
          }}
        </SizeMe>
      </Grid>
      {Math.ceil(filteredLength / DOGS_PER_PAGE) > 1 && (
        <Pagination
          className={styles.pagination}
          color="secondary"
          count={Math.ceil(filteredLength / DOGS_PER_PAGE)}
          page={startingIndex + 1}
          onChange={(e, page) => {
            setStartingIndex(page - 1);
          }}
        />
      )}
      <AddDogForm open={openModal} close={closeModal} />
    </ListWrapper>
  );
};
