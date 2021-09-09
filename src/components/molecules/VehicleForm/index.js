import React, { useState, useEffect, Fragment } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import { useForm } from '../../../utils'
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import firebase from '../../../config/firebase';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    image: {
      maxWidth: 310,
    },
    input: {
      display: "none"
    },
  });

const VehicleForm = () => {
    const dispatch = useDispatch();
    let totalVehicle = useSelector(state => state.totalVehicle);
    let vehicles = useSelector(state => state.vehicles);

    const classes = useStyles();

    const tempImage = "data:image/png;base64,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";

    const [nomorMesin, setNomorMesin] = useState("")

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const handleClickAlert = (message, severity) => {
        setSeverity(severity);
        setAlertMessage(message);
        setOpenAlert(true);
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenAlert(false);
    };

    useEffect(() => {
        // firebase
        //     .database()
        //         .ref(`/_TotalVehicle/`)
        //             .once('value')
        //             .then(res => {
        //                 dispatch({type: 'TOTAL_VEHICLE', value:res.val()})
                        
        //                 console.log("totalVehicle: ", res.val())})
    }, [])

    const [form, setForm] = useForm({
        name: '',
        id: '',
        category: '',
        image: tempImage,
        productUnit: '',
        price: '',
        discount: '',
        detail: '',
      });

    const handleSubmit = (e) => {
        console.log("submit: ", form)

        // let orderKey = firebase.database().ref(`products/`).push().getKey()
        // form["id"] = orderKey;

        // firebase.database().ref(`products/${orderKey}`).set(form)

        // console.log("form: ", form)
        // form["NOMOR_MESIN"] = nomorMesin;
        // form["ID"] = nomorMesin;
        // form["NO"] = totalVehicle + 1;
        // console.log("form: ", form)

        firebase
        .database()
        .ref(`vehicles/${totalVehicle}/`)
        .set(form)
        .then(() => {
            firebase
            .database()
            .ref(`/_TotalVehicle/`)
            .set(totalVehicle + 1)
                    .then(() => {
                        firebase
                        .database()
                        .ref(`/_TotalVehicle/`)
                            .once('value')
                            .then(res => {
                                form["index"] = vehicles.length;
                                console.log("form: ", form)
                                dispatch({type: 'TOTAL_VEHICLE', value: res.val()})
                                dispatch({type: 'ADD_VEHICLE', value: form})
                                setForm('reset')
                                setNomorMesin('')
                                handleClickAlert("Vehicle Submitted.", "success")
                            })
                            .catch(error => {
                                handleClickAlert(error.message, "error")
                                console.log(error.message);
                            });
                    })

            })

        e.preventDefault(); 
    }

    const handleChangePicture = async e => {
        var file = e.target.files[0]
        console.log("image: ", file)

        const base64 = await convertBase64(file);

        console.log("base64: ", base64)

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

    // const onChangeNomorMesin = (e) => {
    //     const ID = e;
    //     setForm('ID', ID);
    //     setForm('NOMOR_MESIN', e);
    // }

    return(
        <>
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>

                <Typography variant="h4" gutterBottom>
                Add Products
                </Typography>
                <Grid container spacing={2}>
                    <Grid container spacing={2} item xs={4}>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={handleChangePicture}
                            />
                            <label htmlFor="contained-button-file">
                            <CardActionArea component="span">
                                <CardMedia
                                    className={classes.image}
                                    src={form.image}
                                    component="img"
                                    title={"Upload"}    
                                    />
                            </CardActionArea>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={2} item xs={8}>

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
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        onChange={(e) => setForm('discount', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required  id="productUnit" label="Unit" fullWidth value={form.productUnit}
                        onChange={(e) => setForm('productUnit', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                        </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" required multiline rows={4} id="detail" label="Detail" fullWidth value={form.detail}
                        onChange={(e) => setForm('detail', e.target.value)} InputLabelProps={{ required: false }}/>
                    </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained"> Submit </Button>
                </Grid>
                  </Grid>
                </form>
            </CardContent>
        </Card>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={severity}>
                {alertMessage}
            </Alert>
      </Snackbar>
        </>
    )
}

export default VehicleForm