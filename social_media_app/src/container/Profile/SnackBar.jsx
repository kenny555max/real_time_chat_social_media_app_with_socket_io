import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function SnackBar({ snackbar, setSnackBar }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBar({ ...snackbar, open: false });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const { vertical, horizontal, open } = snackbar;

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Profile Image set"
        action={action}
        anchorOrigin={{ vertical, horizontal }}
      />
    </div>
  );
}

SnackBar.prototype = {
    snackbar: PropTypes.object.isRequired,
    setSnackBar: PropTypes.func.isRequired,
}