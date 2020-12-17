import React from 'react';
import {
  withStyles,
  Theme,
  Select as SelectMaterialUI,
  withTheme,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '../Input/Input';

export const Select = withStyles((theme: Theme) => ({
  root: {},
}))(withTheme(SelectMaterialUI));

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'baseline',
    height: 60,
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  label: {
    fontSize: 18,
    width: 200,
    minWidth: 200,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      width: 140,
      minWidth: 140,
      marginRight: theme.spacing(2),
    },
  },
  select: {
    width: '100%',
  },
  disabled: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface CustomSelectProps {
  label: string;
  options: { name: string; value: string | number }[];
}

export const CustomSelect = React.forwardRef(
  (props: CustomSelectProps, ref) => {
    const styles = useStyles();
    const { label, options } = props;
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>{label}</label>
        <Select ref={ref} {...props} className={styles.select}>
          {options.map(option => (
            <MenuItem key={option.name} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
);

interface CustomAutocompleteProps {
  label: string;
  options: { name: string; value: string }[];
  setValue: (value: string) => void;
  disabled?: string;
  defaultValue?: { name: string | undefined; value: string | undefined };
  disableClearable?: boolean;
}

export const CustomAutocomplete = React.forwardRef(
  (props: CustomAutocompleteProps, ref) => {
    const styles = useStyles();
    const {
      label,
      options,
      setValue,
      disabled,
      defaultValue,
      disableClearable = false,
    } = props;
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>{label}</label>
        {disabled ? (
          <span className={styles.disabled}>{disabled}</span>
        ) : (
          <Autocomplete
            onChange={(e, val) => setValue(val?.value ?? '')}
            options={options}
            defaultValue={defaultValue}
            getOptionSelected={(o, v) => o.value === v.value}
            disableClearable={disableClearable}
            getOptionLabel={option => option.name ?? ''}
            renderInput={params => <TextField {...params} />}
            className={styles.select}
            noOptionsText="Brak wyników"
          />
        )}
      </div>
    );
  }
);
