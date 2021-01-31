import React, { useEffect } from 'react';
import useStyles from './AddDogForm.style';
import { useForm, Controller } from 'react-hook-form';
import { useStore } from '../../../core/store/store';
import { Button } from '@material-ui/core';
import { isEmpty } from 'ramda';
import { CustomTextField } from '../../../shared/Input/Input';
import { CustomModal } from '../../../shared/Modal';
import {
  CustomAutocomplete,
  CustomSelect,
} from '../../../shared/Select/Select';
import { format, parseJSON } from 'date-fns';

type FormInputs = {
  pkr: string;
  sex: boolean;
  birth: Date;
  name: string;
  pedigreeName: string;
  breed: string;
  litter: string;
  breedingName: string;
  momPkr?: string;
  dadPkr?: string;
};

enum sex {
  bitch,
  dog,
}

interface AddDogFormProps {
  open: boolean;
  close: () => void;
  defParents?: {
    dadPkr?: string;
    momPkr?: string;
  };
  defBreedingName?: string;
}

export const AddDogForm: React.FC<AddDogFormProps> = ({
  open,
  close,
  defParents,
  defBreedingName,
}) => {
  const styles = useStyles();

  const dogs = useStore(state => state.dogs);
  const breedings = useStore(state => state.breedings);
  const getDogs = useStore(state => state.fetchDogs);
  const getBreedings = useStore(state => state.fetchBreedings);

  const { handleSubmit, control, errors, setValue } = useForm<FormInputs>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (defParents) {
      setValue('dadPkr', defParents.dadPkr ?? '');
      setValue('momPkr', defParents.momPkr ?? '');
    }
    if (defBreedingName) {
      setValue('breedingName', defBreedingName);
    }
  }, [defParents, defBreedingName, setValue]);

  useEffect(() => {
    if (isEmpty(breedings)) {
      getBreedings();
    }
  }, [getBreedings, breedings]);

  const onSubmit = async (values: FormInputs) => {
    try {
      await fetch('http://localhost:4200/dog', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          litter: values.litter.toUpperCase(),
          sex: Boolean(values.sex),
        }),
      });
      await getDogs();
      close();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <CustomModal title="Dodaj psa" open={open} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="pkr"
          as={
            <CustomTextField
              placeholder="Numer PKR"
              error={Boolean(errors.pkr?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.pkr?.message}
            />
          }
          rules={{ required: 'Podaj numer PKR' }}
          control={control}
          defaultValue=""
        />
        <Controller
          name="name"
          as={
            <CustomTextField
              placeholder="Imię psa"
              error={Boolean(errors.name?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.name?.message}
            />
          }
          rules={{
            required: 'Podaj imię psa',
            minLength: {
              value: 3,
              message: 'Podaj co najmniej 3 litery',
            },
            maxLength: {
              value: 20,
              message: 'Podaj co najwyżej 20 liter',
            },
            pattern: {
              value: /^[^0-9]+$/i,
              message: 'Nazwa nie powinna zawierać cyfr i znaków specjalnych',
            },
          }}
          control={control}
          defaultValue=""
        />
        <Controller
          name="pedigreeName"
          as={
            <CustomTextField
              placeholder="Imię rodowodowe"
              error={Boolean(errors.pedigreeName?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.pedigreeName?.message}
            />
          }
          rules={{
            required: 'Podaj imię rodowodowe',
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
          defaultValue=""
        />
        <Controller
          name="breed"
          as={
            <CustomTextField
              placeholder="Rasa"
              error={Boolean(errors.breed?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.breed?.message}
            />
          }
          rules={{
            required: 'Podaj rasę psa',
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
          defaultValue=""
        />
        <Controller
          name="litter"
          as={
            <CustomTextField
              placeholder="Miot"
              error={Boolean(errors.litter?.message)}
              autoComplete="off"
              helperText={errors.litter?.message}
            />
          }
          rules={{
            required: 'Podaj pojedynczą literę',
            pattern: {
              value: /^[A-Z]{1}$/i,
              message: 'Podaj pojedynczą literę',
            },
          }}
          control={control}
          defaultValue=""
        />
        <Controller
          name="sex"
          as={
            <CustomSelect
              label="Płeć"
              options={[
                { name: 'Pies', value: sex.dog },
                { name: 'Suka', value: sex.bitch },
              ]}
            />
          }
          control={control}
          defaultValue={sex.dog}
        />
        <Controller
          name="birth"
          as={
            <CustomTextField
              placeholder="Data narodzin"
              error={Boolean(errors.birth?.message)}
              color="primary"
              helperText={errors.birth?.message}
              type="date"
            />
          }
          rules={{
            required: 'Podaj datę narodzin',
            validate: value => {
              return (
                value <= format(parseJSON(new Date()), 'yyyy-MM-dd') ||
                'Data nie powinna być w przyszłości'
              );
            },
          }}
          control={control}
          defaultValue={format(parseJSON(new Date()), 'yyyy-MM-dd')}
        />
        <Controller
          name="momPkr"
          as={
            <CustomAutocomplete
              label="Matka"
              options={dogs
                .filter(dog => !dog.sex)
                .map(dog => {
                  return { name: dog.pedigreeName, value: dog.pkr };
                })}
              setValue={value => setValue('momPkr', value)}
            />
          }
          control={control}
          defaultValue=""
        />
        <Controller
          name="dadPkr"
          as={
            <CustomAutocomplete
              label="Ojciec"
              options={dogs
                .filter(dog => dog.sex)
                .map(dog => {
                  return { name: dog.pedigreeName, value: dog.pkr };
                })}
              setValue={value => setValue('dadPkr', value)}
            />
          }
          control={control}
          defaultValue=""
        />
        {!isEmpty(breedings) ? (
          <>
            <Controller
              name="breedingName"
              as={
                <CustomAutocomplete
                  label="Hodowla"
                  options={breedings.map(br => ({
                    name: br.name,
                    value: br.name,
                  }))}
                  setValue={value => setValue('breedingName', value)}
                  defaultValue={{
                    name: breedings[0].name,
                    value: breedings[0].name,
                  }}
                  disableClearable
                />
              }
              control={control}
              defaultValue={breedings[0].name}
            />
          </>
        ) : (
          <span>
            Brak hodowli w bazie. Możesz ją dodać w zakładce "Hodowle"
          </span>
        )}
        <span>
          Nie widzisz swojej hodowli? Dodaj ją na zakładce "Hodowle" :)
        </span>
        <div className={styles.btnWrapper}>
          <Button color="primary" variant="outlined" onClick={close}>
            Zamknij
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={isEmpty(breedings)}
          >
            Dodaj psa
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
