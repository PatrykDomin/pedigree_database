import { Button } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { IDog } from '../../core/apiTypes/apiType';
import { useStore } from '../../core/store/store';
import { CustomTextField } from '../../shared/Input/Input';
import { CustomModal } from '../../shared/Modal';
import { CustomSelect } from '../../shared/Select/Select';

export const Dog: React.FC = () => {
  const { pkr } = useParams<{ pkr: string }>();

  const dogs = useStore(state => state.dogs);
  const getDogs = useStore(state => state.fetchDogs);

  const [shoWModal, setShowModal] = useState(false);
  const [dogData, setDogData] = useState<{
    dog: IDog;
    litters: {
      parent: string;
      children: IDog[];
    }[];
  }>();

  const onSubmit = async (data: {
    momId: number;
    dadId: number;
    name: string;
  }) => {
    try {
      await fetch(`http://localhost:4200/dog/${pkr}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      await getDogWithChildren(pkr);
      setShowModal(false);
    } catch (err) {
      console.log('err: ', err);
    } finally {
    }
  };

  const getDogWithChildren = useCallback(async (pkr: string) => {
    const response = await fetch(`http://localhost:4200/dog/${pkr}`);
    const data: {
      dog: IDog;
      litters: {
        parent: string;
        children: IDog[];
      }[];
    } = await response.json();
    setDogData(data);
  }, []);

  useEffect(() => {
    if (pkr) {
      getDogWithChildren(pkr);
    }
  }, [pkr, getDogWithChildren]);

  const { dog, litters } = dogData ?? {};

  const { handleSubmit, control, errors } = useForm<{
    momPkr: number;
    dadPkr: number;
    name: string;
  }>({
    mode: 'onChange',
  });

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 16,
      }}
    >
      <div>
        <p>{dog?.name}</p>
        <p>{dog?.breeding.name}</p>
        <p>{dog?.mom?.name}</p>
        <p>{dog?.dad?.name}</p>
      </div>
      <br />
      <div style={{ display: 'flex' }}>
        {litters?.map((group, i) => {
          return (
            <div style={{ margin: '0 50px' }} key={i}>
              <p style={{ fontWeight: 600 }}>{group.parent}</p>
              {group.children.map((child, i, arr) => {
                return (
                  <div key={child.pkr}>
                    {(i === 0 ||
                      (i > 0 && child.birth !== arr[i - 1].birth)) && (
                      <p style={{ marginLeft: 12 }}>
                        {format(parseISO(child.birth), 'dd.MM.yyyy')}
                      </p>
                    )}
                    <span style={{ marginLeft: 24 }}>{child.name}</span>
                  </div>
                );
              })}
              <br />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          !dogs.length && getDogs();
          setShowModal(true);
        }}
      >
        edytuj psa
      </button>
      <CustomModal
        title={dog?.name ?? ''}
        open={shoWModal}
        close={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            as={
              <CustomTextField
                placeholder="Imię"
                error={Boolean(errors.name?.message)}
                color="primary"
                autoComplete="off"
                helperText={errors.name?.message}
              />
            }
            rules={{ required: 'Podaj numer PKR' }}
            control={control}
            defaultValue={dog?.name ?? ''}
          />
          <Controller
            name="momPkr"
            as={
              <CustomSelect
                label="Matka"
                options={dogs
                  .filter(d => !d.sex && d.pkr !== dog?.pkr)
                  .map(dog => {
                    return { name: dog.name, val: dog.pkr };
                  })}
              />
            }
            control={control}
            defaultValue={dog?.mom?.pkr ?? ''}
          />
          <Controller
            name="dadPkr"
            as={
              <CustomSelect
                label="Ojciec"
                options={dogs
                  .filter(d => d.sex && d.pkr !== dog?.pkr)
                  .map(dog => {
                    return { name: dog.name, val: dog.pkr };
                  })}
              />
            }
            control={control}
            defaultValue={dog?.dad?.pkr ?? ''}
          />
          <div
            style={{
              display: 'flex',
              alignSelf: 'center',
              width: '80%',
              margin: '0 auto',
              justifyContent: 'space-between',
              padding: '20px 0 0 ',
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setShowModal(false)}
            >
              Zamknij
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Edytuj psa
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};
