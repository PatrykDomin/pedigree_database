import React from 'react';
import {
  withStyles,
  Theme,
  TextField as TextFieldMaterialUI,
  withTheme,
  makeStyles,
  TextFieldProps,
} from '@material-ui/core';

export const TextField = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 60,
  },
}))(withTheme(TextFieldMaterialUI));

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'baseline',
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  label: {
    fontSize: 18,
    width: 200,
    minWidth: 200,
  },
}));

export const CustomTextField = React.forwardRef(
  (props: TextFieldProps, ref) => {
    const styles = useStyles();
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>{props.placeholder}</label>
        <TextField inputRef={ref} {...props} style={{ color: 'white' }} />
      </div>
    );
  }
);
