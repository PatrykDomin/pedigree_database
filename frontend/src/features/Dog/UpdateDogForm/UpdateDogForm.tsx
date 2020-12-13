import { Button } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DogType } from '../../../core/apiTypes/apiType';
import { CustomTextField } from '../../../shared/Input/Input';
import { CustomModal } from '../../../shared/Modal';
import { CustomAutocomplete } from '../../../shared/Select/Select';
import useStyles from './UpdateDogFrom.style';

interface UpdateDogFromProps {
  open: boolean;
  close: () => void;
  dog: DogType;
  callback: (pkr: string) => Promise<void>;
  dogs: DogType[];
}

export const UpdateDogFrom: React.FC<UpdateDogFromProps> = ({
  open,
  close,
  dog,
  callback,
  dogs,
}) => {
  const styles = useStyles();

  const { handleSubmit, control, errors, setValue } = useForm<{
    momPkr: number;
    dadPkr: number;
    name: string;
    phisical: string;
  }>({
    mode: 'onBlur',
  });

  const { pkr, dad, mom, name, phisical } = dog ?? {};

  const onSubmit = async (data: {
    momPkr: string;
    dadPkr: string;
    name: string;
    phisical: string;
  }) => {
    try {
      await fetch(`http://localhost:4200/dog/${pkr}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      callback(pkr);
      close();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <CustomModal title={dog?.name ?? ''} open={open} close={close}>
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
          rules={{
            required: 'Podaj nowe imię',
            minLength: {
              value: 3,
              message: 'Podaj co najmniej 3 litery',
            },
            maxLength: {
              value: 30,
              message: 'Podaj co najwyżej 30 liter',
            },
            pattern: {
              value: /^[^0-9]+$/i,
              message: 'Nazwa nie powinna zawierać cyfr i znaków specjalnych',
            },
          }}
          control={control}
          defaultValue={name ?? ''}
        />
        <Controller
          name="momPkr"
          as={
            <CustomAutocomplete
              label="Matka"
              options={dogs
                .filter(d => !d.sex && d.pkr !== dog.pkr)
                .map(dog => {
                  return { name: dog.name, value: dog.pkr };
                })}
              setValue={value => setValue('momPkr', value)}
              disabled={mom?.name}
            />
          }
          control={control}
          defaultValue={mom?.pkr ?? ''}
        />
        <Controller
          name="dadPkr"
          as={
            <CustomAutocomplete
              label="Ojciec"
              options={dogs
                .filter(d => d.sex && d.pkr !== dog.pkr)
                .map(dog => {
                  return { name: dog.name, value: dog.pkr };
                })}
              setValue={value => setValue('dadPkr', value)}
              disabled={dad?.name}
            />
          }
          control={control}
          defaultValue={dad?.pkr ?? ''}
        />
        <Controller
          name="phisical"
          as={
            <CustomTextField
              placeholder="Badania (link)"
              error={Boolean(errors.phisical?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.phisical?.message}
            />
          }
          rules={{
            required: 'Podaj link do aktualnych badań',
            minLength: {
              value: 3,
              message: 'Podaj co najmniej 3 litery',
            },
          }}
          control={control}
          defaultValue={phisical ?? ''}
        />
        <div className={styles.btnWrapper}>
          <Button color="primary" variant="outlined" onClick={close}>
            Zamknij
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Edytuj dane
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
