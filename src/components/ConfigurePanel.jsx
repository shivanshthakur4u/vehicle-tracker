import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';

const ConfigurePanel = ({ show, setShow, handleRouteSelection }) => {
  return (
    <Dialog open={show} onClose={() => setShow(false)}>
      <DialogTitle>Configure</DialogTitle>
      <DialogContent>
        <Select fullWidth defaultValue="" onChange={handleRouteSelection}>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="yesterday">Yesterday</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfigurePanel;
