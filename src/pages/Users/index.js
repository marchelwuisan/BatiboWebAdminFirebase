import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Avatar, Box, Container, Button, Card, CardContent, TextField, InputAdornment, SvgIcon,Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Collapse
} from '@material-ui/core';
import customers from 'src/__mocks__/customers';
import { Search as SearchIcon } from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import useTable from "../../components/useTableUsers";
import firebase from '../../config/firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { RowUser } from '../../components/molecules';

const headCells = [
  { id: 'dropdown', label: ''},
  { id: 'username', label: 'Username' },
  { id: 'handphone', label: 'Phone Number' },
  { id: 'email', label: 'Email' },
  { id: 'uid', label: 'UID' },
  { id: 'photo', label: 'Photo'}
]

const Users = () => {
  const [users, setUsers] = useState([])
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => (x.name + x.email + x.handphone).toLowerCase().includes(target.value))
        }
    })
  }

  useEffect(()=>{
    firebase
      .database()
        .ref(`/users/`)
          .on('value', response => {
              const obj = response.val()
              let arr = Object.keys(obj).map((k) => obj[k])
              
              console.log('arr: ', arr)
              setUsers(arr)
            })
    
  }, [])

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(users, headCells, filterFn);

  useEffect(()=>{
    console.log("users: ", users)
  }, [users])

  return (
  <>
    <Helmet>
      <title>Users</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
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
                  placeholder="Cari User"
                  variant="outlined"
                  onChange={handleSearch}
                  />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
        <Box sx={{ pt: 3 }}>
        <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
        <TblContainer>
                      <TblHead />
                      <TableBody>
                          {
                              recordsAfterPagingAndSorting().map(user => {
                                if(typeof user.cart === 'undefined'){
                                  user["cart"] = [];
                                }
                                console.log("user: ", user)
                                return (
                                  <RowUser key={user.uid} users={user}/>
                                )
                              })
                          }
                      </TableBody>
                  </TblContainer>
                  <TblPagination />
        </Box>
      </PerfectScrollbar>
    </Card>
        </Box>
      </Container>
    </Box>
  </>
)};

export default Users;
