import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  InputAdornment,
  LinearProgress,
  SvgIcon,
  TextField,
  TableBody,
  Collapse,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon } from 'react-feather';
import { makeStyles } from '@material-ui/styles';
import useTable from "../../components/useTable";
import firebase from '../../config/firebase';
import { OrderItem } from '../../components/molecules';
import { useDispatch, useSelector } from "react-redux";   
import { orderBy } from 'lodash-es';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 220,
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
  backDrop: {
  },
  order: {
    flexGrow: 1,
  },
});

const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])

  let vehicles = useSelector(state => state.vehicles);
  let vehiclesStatus = useSelector(state => state.vehiclesStatus);
  const dispatch = useDispatch();

  const [callStatus, setCallStatus] = useState(false)
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  const [isChecked, setIsChecked] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => (x.name + x.category + x.detail + price).toLowerCase().includes(target.value.toLowerCase()))
        }
    })
  }

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };

  const handleDebugOrder = () => {
    var dummy = {totalPrice: 80085, status: "PENDING"}

    let orderKey = firebase.database().ref(`orders/`).push().getKey()
    dummy["id"] = orderKey;

    firebase.database().ref(`orders/${orderKey}`).set(dummy)
      .then(() => {console.log("Dummy Added.")})
  }

  function ProductsDetail(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleYes = () => {
      console.log("handleYes: ", props.selectedValue)
    }
  
    return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.backDrop}
        >
          <Card className={classes.root}>
            <CardActionArea onClick={() => handleClickOpen()}>
              <Box className={classes.discountContainer}>
                <Typography className={classes.discountText}>{selectedValue.discount}%</Typography>
              </Box>
              <CardMedia
                className={classes.media}
                image={selectedValue.image}
                title={selectedValue.name}
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {selectedValue.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {selectedValue.category}
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
        </Dialog>
    );
  }

  useEffect(()=>{
    firebase
      .database()
      .ref(`/orders/`)
      .on('value', (res)=>{
        console.log("res.val(): ", res.val())
        setOrders(Object.values(res.val()))
      })

  }, [])

  useEffect(()=>{
    console.log("orders: ", orders)
  }, [orders])

  return(
    <>
      <Helmet>
        <title>Batibo Admin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
      <Container maxWidth={false}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
            <Button color="primary" variant="contained" onClick={handleDebugOrder} >
              {"[DEBUG] ADD DUMMY ORDER"}
            </Button>
          </Box>
        <Box> 
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action" >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Find Orders"
                    variant="outlined"
                    onChange={handleSearch}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={3} container spacing={2} className={classes.order}>
              {orders.filter(order=> order.status == "PENDING").map(order => { return( <OrderItem order={order} key={order.id}/> ) })}
            </Grid>
            <Grid item xs={3} container spacing={2} className={classes.order}>
              {orders.filter(order=> order.status == "ON_DELIVERY").map(order => { return( <OrderItem order={order} key={order.id}/> ) })}
            </Grid>
            <Grid item xs={3} container spacing={2} className={classes.order}>
              {orders.filter(order=> order.status == "DELIVERED").map(order => { return( <OrderItem order={order} key={order.id}/> ) })}
            </Grid>
            <Grid item xs={3} container spacing={2} className={classes.order}>
              {orders.filter(order=> order.status == "CANCELLED").map(order => { return( <OrderItem order={order} key={order.id}/> ) })}
            </Grid>
          </Grid>
        </Box>
        </Container>
      </Box>
    </>
)};

export default Orders;
