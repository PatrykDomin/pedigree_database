import React from 'react';
import useStyles from './AddBreedingForm.style';
import { Controller, useForm } from 'react-hook-form';
import { useStore } from '../../../core/store/store';
import { Button } from '@material-ui/core';
import { CustomTextField } from '../../../shared/Input/Input';
import { CustomModal } from '../../../shared/Modal';

type FormInputs = {
  name: string;
  webPage: string;
};

interface IAddBreedingForm {
  open: boolean;
  close: () => void;
}

export const AddBreedingForm: React.FC<IAddBreedingForm> = ({
  open,
  close,
}) => {
  const styles = useStyles();

  const getBreedings = useStore(state => state.fetchBreedings);

  const { handleSubmit, control, errors, formState } = useForm<FormInputs>({
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormInputs) => {
    try {
      await fetch('http://localhost:4200/breeding', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      await getBreedings();
      close();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <CustomModal title="Dodaj hodowlę" open={open} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          as={
            <CustomTextField
              placeholder="Nazwa hodowli"
              error={Boolean(errors.name?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.name?.message}
            />
          }
          rules={{
            required: 'Podaj nazwę hodowli',
            minLength: {
              value: 3,
              message: 'Podaj co najmniej 3 litery',
            },
            maxLength: {
              value: 36,
              message: 'Podaj co najwyżej 36 liter',
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
          name="webPage"
          as={
            <CustomTextField
              placeholder="Adres internetowy hodowli"
              error={Boolean(errors.webPage?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.webPage?.message}
            />
          }
          rules={{
            required: 'Podaj adres strony internetowej hodowli',
            minLength: {
              value: 3,
              message: 'Podaj co najmniej 3 litery',
            },
            maxLength: {
              value: 36,
              message: 'Podaj co najwyżej 36 liter',
            },
          }}
          control={control}
          defaultValue=""
        />
        <div className={styles.btnWrapper}>
          <Button color="primary" variant="outlined" onClick={close}>
            Zamknij
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => {
              if (formState.isSubmitSuccessful) {
                setTimeout(() => close(), 400);
              }
            }}
          >
            Dodaj hodowlę
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
