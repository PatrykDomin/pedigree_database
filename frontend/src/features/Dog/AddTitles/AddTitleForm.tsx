import { Button } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DogType } from '../../../core/apiTypes/apiType';
import { CustomTextField } from '../../../shared/Input/Input';
import { CustomModal } from '../../../shared/Modal';
import useStyles from './AddTitleForm.styles';

interface AddTitleFromProps {
  open: boolean;
  close: () => void;
  dog: DogType;
  callback: (pkr: string) => Promise<void>;
}

export const AddTitleForm: React.FC<AddTitleFromProps> = ({
  open,
  close,
  dog,
  callback,
}) => {
  const styles = useStyles();

  const { handleSubmit, control, errors } = useForm<{
    title: string;
  }>({
    mode: 'onBlur',
  });

  const { pkr } = dog ?? {};

  const onSubmit = async ({ title }: { title: string }) => {
    try {
      await fetch(`http://localhost:4200/dog/${pkr}/title`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      callback(pkr);
      close();
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <CustomModal title={dog?.pedigreeName ?? ''} open={open} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          as={
            <CustomTextField
              placeholder="Tytuł"
              error={Boolean(errors.title?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.title?.message}
            />
          }
          rules={{
            required: 'Podaj osiągnięcie',
            minLength: {
              value: 3,
              message: 'Podaj co najmniej 3 litery',
            },
            maxLength: {
              value: 50,
              message: 'Podaj co najwyżej 50 liter',
            },
          }}
          control={control}
          defaultValue={''}
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
