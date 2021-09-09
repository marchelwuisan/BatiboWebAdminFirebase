import React, { useState, useEffect, Fragment } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  InputAdornment,
  IconButton,
  SvgIcon,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TableSortLabel,
  Tooltip,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  FormHelperText,
  Collapse,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TablePagination from "@material-ui/core/TablePagination";
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/styles';
import firebase from '../../../config/firebase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import { cardActionAreaClasses } from '@material-ui/core';



const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function DeleteConfirm(props) {

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleYes = () => {
    console.log("handleYes: ", props)
  }

  const handleListItemClick = (value) => {
    onClose(value);
    onClose(selectedValue);
  };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" fontSize={18}>{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleYes} variant="contained" color="primary"> Yes </Button>
          <Button onClick={handleClose} color="primary" autoFocus> No </Button>
        </DialogActions>
      </Dialog>
  );
}
  
const RowUser = (props) => {
  const { users } = props;
  let cart = Object.keys(users.cart).map((k) => users.cart[k])
  console.log("users", users)
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const classes = useRowStyles();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };
  
  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{users.username}</TableCell>
        <TableCell>{users.handphone}</TableCell>
        <TableCell>{users.email}</TableCell>
        <TableCell>{users.uid}</TableCell>
        <TableCell><img src={users.photo}/></TableCell>
        {/* <TableCell> <Button size="small" onClick={() => handleClickOpen(users.uid)}> <DeleteIcon/> </Button> </TableCell> */}
        {/* <DeleteConfirm selectedValue={users.uid} open={openDialog} onClose={handleClose} /> */}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box >
              {/* <Container> */}
                <Grid container spacing={0}>

                {cart.filter(n => {n.id === 0}).map(cart => {
                if(cart == null){
                  cart = []
                }
                return(
                  <Grid item xs={6}>
                  <Card>
                    {/* <CardMedia image = {{uri: cart.FOTO_KENDARAAN['0']}} title="FOTO_KENDARAAN"/> */}
                    <CardContent>
                      <Grid container spacing={3} >
                        <Grid item> 
                          <Typography color="textSecondary" gutterBottom variant="h6" >
                            {cart.name}
                          </Typography>
                          <Typography color="textPrimary" variant="h3" >
                            {cart.price}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          pt: 2,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {/* <Typography sx={{ mr: 1 }} variant="body2">
                          {vehicle.KODE_DAERAH_NOMOR_POLISI + ' ' + vehicle.NOMOR_POLISI + ' ' + vehicle.KODE_LOKASI_NOMOR_POLISI}
                        </Typography> */}
                      </Box>
                    </CardContent>
                  </Card>
                  </Grid>
                 )})}
                </Grid>
              {/* </Container> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default RowUser