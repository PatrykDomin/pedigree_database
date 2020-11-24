import React from 'react';
import {
  withStyles,
  Theme,
  Select as SelectMaterialUI,
  withTheme,
  makeStyles,
  SelectProps,
  MenuItem,
} from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab'
// import { TextField } from '../Input/Input'

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
  },
  select: {
    width: '100%',
  },
}));

type SelectOptions = {
  label: string;
  options: { name: string; val: string | number }[];
  displayEmpty?: boolean;
};

export const CustomSelect = React.forwardRef(
  (props: SelectOptions | SelectProps, ref) => {
    const styles = useStyles();
    const { label, options, displayEmpty } = props as SelectOptions;
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>{label}</label>
        <Select
          displayEmpty={displayEmpty}
          ref={ref}
          {...props}
          className={styles.select}
        >
          {displayEmpty && <MenuItem value="">—</MenuItem>}
          {options.map(option => (
            <MenuItem key={option.name} value={option.val}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
);

// type AutocompleteOptions = {
//   label: string
//   options: string[]
//   onChange: (e: any, data: any) => void
//   error?: string
// }

// export const CustomAutocomplete = React.forwardRef(
//   (props: AutocompleteOptions | SelectProps, ref) => {
//     const styles = useStyles()
//     const { label, options, error } = props as AutocompleteOptions
//     return (
//       <div className={styles.wrapper}>
//         <label className={styles.label}>{label}</label>
//         <Autocomplete
//           options={options}
//           ref={ref}
//           renderInput={params => (
//             <TextField {...params} error={Boolean(error)} helperText={error} />
//           )}
//           className={styles.select}
//         />
//       </div>
//     )
//   }
// )
