import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import useStyles from './Modal.style';

interface CustomModalProps {
  open: boolean;
  close: () => void;
  title: string;
  confirmButton?: JSX.Element;
  closeButton?: JSX.Element;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  close,
  title,
  confirmButton,
  closeButton,
  maxWidth,
  children,
}) => {
  const styles = useStyles();

  return (
    <Dialog
      open={open}
      classes={{ paper: styles.dialog }}
      onClose={close}
      fullWidth
      maxWidth={maxWidth ?? 'sm'}
    >
      <DialogTitle classes={{ root: styles.title }} disableTypography>
        {title}
      </DialogTitle>
      <DialogContent classes={{ root: styles.content }}>
        {children}
      </DialogContent>
      {(closeButton || confirmButton) && (
        <DialogActions classes={{ root: styles.actions }}>
          {closeButton}
          {confirmButton}
        </DialogActions>
      )}
    </Dialog>
  );
};
