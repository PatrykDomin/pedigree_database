import React, { useEffect } from 'react'
import useStyles from './AddDogForm.style'
import { useForm, Controller } from 'react-hook-form'
import { useStore } from '../../../core/store/store'
import { Button } from '@material-ui/core'
import { isEmpty } from 'ramda'
import { CustomTextField } from '../../../shared/Input/Input'
import { CustomModal } from '../../../shared/Modal'
import { CustomSelect } from '../../../shared/Select/Select'
// import { CustomAutocomplete } from '../../../shared/Calendar/Calendar'
import { format, parseJSON } from 'date-fns'

type FormInputs = {
  pkr: string
  sex: boolean
  birth: Date
  name: string
  pedigreeName: string
  litter: string
  breedingName: string
  momPkr?: string
  dadPkr?: string
}

enum sex {
  bitch,
  dog,
}

interface IAddDogForm {
  open: boolean
  close: () => void
}

export const AddDogForm: React.FC<IAddDogForm> = ({ open, close }) => {
  const styles = useStyles()

  const dogs = useStore(state => state.dogs)
  const breedings = useStore(state => state.breedings)
  const getDogs = useStore(state => state.fetchDogs)
  const getBreedings = useStore(state => state.fetchBreedings)

  const { handleSubmit, control, errors, formState } = useForm<FormInputs>({
    mode: 'onChange',
  })

  useEffect(() => {
    if (isEmpty(breedings)) {
      getBreedings()
    }
  }, [getBreedings, breedings])

  const onSubmit = async (values: FormInputs) => {
    try {
      await fetch('http://localhost:4200/dog', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, sex: Boolean(values.sex) }),
      })
      await getDogs()
    } catch (err) {
      console.log('err: ', err)
    }
  }

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
          rules={{ required: 'Podaj imię psa' }}
          control={control}
          defaultValue=""
        />
        <Controller
          name="pedigreeName"
          as={
            <CustomTextField
              placeholder="Imię rodowodowe psa"
              error={Boolean(errors.pedigreeName?.message)}
              color="primary"
              autoComplete="off"
              helperText={errors.pedigreeName?.message}
            />
          }
          rules={{ required: 'Podaj imię rodowodowe psa' }}
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
          rules={{ required: 'Podaj literę miotu' }}
          control={control}
          defaultValue=""
        />
        <Controller
          name="sex"
          as={
            <CustomSelect
              label="Płeć"
              options={[
                { name: 'Pies', val: sex.dog },
                { name: 'Suka', val: sex.bitch },
              ]}
            />
          }
          rules={{ required: true }}
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
          rules={{ required: 'Podaj datę narodzin' }}
          control={control}
          defaultValue={format(parseJSON(new Date()), 'yyyy-MM-dd')}
        />
        <Controller
          name="momPkr"
          as={
            <CustomSelect
              label="Matka"
              options={dogs
                .filter(dog => !dog.sex)
                .map(dog => {
                  return { name: dog.name, val: dog.pkr }
                })}
              displayEmpty
            />
          }
          control={control}
          defaultValue=""
        />
        <Controller
          name="dadPkr"
          as={
            <CustomSelect
              label="Ojciec"
              options={dogs
                .filter(dog => dog.sex)
                .map(dog => {
                  return { name: dog.name, val: dog.pkr }
                })}
              displayEmpty
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
                <CustomSelect
                  label="Hodowla"
                  options={breedings.map(br => {
                    return { name: br.name, val: br.name }
                  })}
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
        <br />
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
            onClick={() => {
              if (formState.isSubmitSuccessful) {
                setTimeout(() => close(), 400)
              }
            }}
          >
            Dodaj psa
          </Button>
        </div>
      </form>
    </CustomModal>
  )
}
