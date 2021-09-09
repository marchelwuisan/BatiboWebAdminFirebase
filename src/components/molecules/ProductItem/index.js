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
});


  
const ProductItem = (props) => {
    const dispatch = useDispatch();
    const { product } = props;
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
    
    function ProductsDetail(props) {
      
      const [form, setForm] = useForm({
        name: product.name,
        id: product.id,
        category: product.category,
        image: product.image,
        productUnit: product.productUnit,
        price: product.price,
        discount: product.discount,
        detail: product.detail,
      });
      
      const { onClose, selectedValue, open } = props;
      
      const handleClose = () => {
        onClose(selectedValue);
      };
      const handleDelete = () => {
        console.log("delete:", form)
        firebase
          .database()
            .ref(`products/${form.id}`)
              .set(null)
      };
    
      const handleSave = () => {
        console.log("handleSave: ", form)

        firebase
          .database()
            .ref(`products/${form.id}`)
              .set(form)
      }

      const handleChangePicture = async e => {
        var file = e.target.files[0]
        console.log("image: ", file)
        console.log("base64 success", await convertBase64(file))

        form["image"] = await convertBase64(file);
        const base64 = await convertBase64(file);
        console.log("base64: ", base64)
        setImage(base64)
        setForm("image", base64)
        
      }
      
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.backDrop}
          >
            <Card className={classes.dialogCard}>
                    <input 
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={() => {console.log("fuck")}}
                      />
                    <label htmlFor="contained-button-file">
                      <IconButton component="span" color="primary" className={classes.EditIcon}>
                        <EditIcon/>
                      </IconButton>
                    </label>
                    <IconButton className={classes.closeIcon} onClick={handleClose}>
                      <CloseIcon/>
                    </IconButton>
              <Box>
                <CardMedia
                  className={classes.dialogMedia}
                  src={form.image}
                  component="img"
                  title={form.name}
                  />
                </Box>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField size="small" required id="name" label="Name" fullWidth value={form.name}
                        onChange={(e) => setForm('name', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required id="category" label="Category" fullWidth value={form.category}
                        onChange={(e) => setForm('category', e.target.value)} InputLabelProps={{ required: false }}/>
                      {/* <Autocomplete size="small"
                        value={Value}
                        onChange={(e) => {setValue(e)}}
                        inputValue={inputValue}
                        onInputChange={(newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        options={["Sayuran", "Buah", "Rempah", "Karbohidrat"]}
                        renderInput={(params) => <TextField {...params} label="Category" variant="outlined" fullWidth/>}
                        fullWidth
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required type="number" id="price" label="Price" fullWidth value={form.price}
                        onChange={(e) => setForm('price', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required type="number" id="discount" label="Discount" fullWidth value={form.discount}
                        onChange={(e) => setForm('discount', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required  id="productUnit" label="Unit" fullWidth value={form.productUnit}
                        onChange={(e) => setForm('productUnit', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required multiline rows={4} id="detail" label="Detail" fullWidth value={form.detail}
                        onChange={(e) => setForm('detail', e.target.value)} InputLabelProps={{ required: false }}/>
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
        <ProductsDetail selectedValue={product} open={openDialog} onClose={handleClose} />
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.root}>
            <CardActionArea onClick={() => handleClickOpen()}>
              {(product.discount > 0) ?
              <Box className={classes.discountContainer}>
                <Typography className={classes.discountText}>{product.discount}%</Typography>
              </Box>
              : null
              }
              <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
                />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.category}
                  </Typography>
                  </Grid>
                  <Grid item xs>
                  <Typography gutterBottom variant="h5" component="h2" align="right" color="#FF8C21">
                    Rp {product.price}
                    {/* .toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") */}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" align="right">
                    /{product.productUnit}
                  </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Fragment>
    )
  }

  export default ProductItem