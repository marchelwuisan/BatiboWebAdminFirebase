import React, { useState, useEffect, Fragment } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  Fab,
  Grid,
  Input,
  InputAdornment,
  InputBase,
  IconButton,
  Snackbar,
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
  FormHelperText,
  Collapse,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TablePagination from "@material-ui/core/TablePagination";
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import firebase from '../../../config/firebase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import shadows from '../../../theme/shadows';
import { useForm } from '../../../utils'


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 220,
  },
  dialogMedia: {
    position: "relative",
    minHeight: 340,
    maxHeight: 340,
    minWidth: 540,
  },
  dialogCard: {
    height: "100%",
    width: "100%"
  },
  discountContainer: {
    width: 42,
    height: 25,
    position: 'absolute',
    backgroundColor: 'green',
    zIndex: 2,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    display: "none"
  },
  backDrop: {
    width: "100%",
    height: "100%"
  },
  EditIcon: {
    position: "absolute",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
  },
  DeleteIcon: {
    position: "absolute",
    left: 1,
  },
  typography: {
    whiteSpace: "nowrap",
  }
});


  
const OrderItem = (props) => {
    const dispatch = useDispatch();
    const { order } = props;
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [Value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    
    
    const handleClickOpen = () => {
      setOpenDialog(true);
    };
    
    const handleClose = () => {
      setOpenDialog(false);
    };
    
    function OrdersDetail(props) {
      
      const [form, setForm] = useForm({
        cart: order.cart,
        deliveryCost: order.deliveryCost,
        id: order.id,
        firstItemPrice: order.firstItemPrice,
        image: order.image,
        firstItemUnit: order.firstItemUnit,
        totalPrice: order.totalPrice,
        title: order.title,
        status: order.status,
      });
      
      const { onClose, selectedValue, open } = props;
      
      const handleClose = () => {
        onClose(selectedValue);
      };
      const handleDelete = () => {
        console.log("delete:", form)
        firebase
          .database()
            .ref(`orders/${form.id}`)
              .set(null)
      };
    
      const handleSave = () => {
        console.log("handleSave: ", form)

        firebase
          .database()
            .ref(`orders/${form.id}`)
              .set(form)
      }

      const handleStatus = (status) => {
        firebase
          .database()
            .ref(`orders/${form.id}/status/`)
              .set(status)
      }


      return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.backDrop}
          >
            <Card className={classes.dialogCard}>
                    <IconButton className={classes.closeIcon} onClick={handleClose}>
                      <CloseIcon/>
                    </IconButton>
                <CardContent>
                  <Grid container spacing={1}>
                    <Typography>Force Status</Typography>
                    <Grid item xs={12}>
                      <Button onClick={() => {handleStatus("PENDING")}} color="primary">
                        PENDING
                      </Button>
                      <Button onClick={() => {handleStatus("ON_DELIVERY")}} color="primary">
                        ON_DELIVERY
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={() => {handleStatus("DELIVERED")}} color="primary">
                        DELIVERED
                      </Button>
                      <Button onClick={() => {handleStatus("CANCELLED")}} color="primary">
                        CANCELLED
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <DialogActions>
                <IconButton className={classes.DeleteIcon} onClick={handleDelete}>
                  <DeleteIcon/>
                </IconButton>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
          </Dialog>
      );
    }

    const handleSubmit = (e) => {
      // console.log("test: ", selectedVehicle)
      // firebase
      //   .database()
      //     .ref(`/vehicles/${selectedVehicle.NO - 1}/`)
      //       .set(selectedVehicle)
      //         .then(() => {
      //           handleClickAlert("Edit Successful.", "success")
      //         //  dispatch({type: 'EDIT_VEHICLE', value:selectedVehicle})
      //         })

      e.preventDefault();
    }
    
    return (
      <Fragment>
        <OrdersDetail selectedValue={order} open={openDialog} onClose={handleClose} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card className={classes.root}>
            <CardActionArea onClick={() => handleClickOpen()}>
              {/* <CardMedia
                className={classes.media}
                image={order.image}
                title={order.title}
                /> */}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs>
                  <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                    {`${order.id}`}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2" align="left" color="#FF8C21">
                    Rp {order.totalPrice}
                    {/* .toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") */}
                  </Typography>
                  <Typography  variant="body2" color="textSecondary" component="p">
                    {order.status}
                  </Typography>
                  </Grid>
                  <Grid item xs>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Fragment>
    )
  }

  export default OrderItem