
import { Button, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Checkbox, DialogActions, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"
import { connect, useDispatch, useSelector } from "react-redux";
import { FetchCompanyList, FetchUserObj, FunctionAddCompany, FunctionUpdateCompany, RemoveCompany } from "../Redux/ActionCreater";
import { Openpopup } from "../Redux/Action";

const Comapny = (props) => {

    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Phone' },
        { id: 'address', name: 'Address' },
        { id: 'type', name: 'Type' },
        { id: 'action', name: 'Action' }
    ]

    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    const [id, idchange] = useState(0);
    const [name, namechange] = useState('');
    const [email, emailchange] = useState('');
    const [phone, phonechange] = useState('');
    const [address, addresschange] = useState('');
    const [type, typechange] = useState('MNC');

    const [isedit, editchange] = useState(true);
    const [title, titlechange] = useState('Create Company');

    const [agreeterm, agreetermchange] = useState(true);
    const dispatch = useDispatch();

    const Editobj = useSelector((state) => state.company.companyobj
    );


    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }
    const [open, openchange] = useState(false);
    const functionopenpopup = () => {
        dispatch(Openpopup());
        openchange(true);
    }
    const closepopup = () => {
        openchange(false);
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        const _obj = { id, name, email, phone, Address: address, type };
        if (isedit) {
            dispatch(FunctionUpdateCompany(_obj, id));
        } else {
            dispatch(FunctionAddCompany(_obj));
        }
        closepopup();
        // navigate('/user');
    }

    const handledelete = (code) => {
        if (window.confirm('Do you want to remove?')) {
            props.removecompany(code);
            //  props.loaduser();
            //toast.success('User removed successfully.')
        }
    }

    const handleedit = (code) => {
        functionopenpopup();
        editchange(true);
        titlechange('Update company')
        dispatch(FetchUserObj(code));
    }

    const functionAdd = () => {
        functionopenpopup();
        editchange(false);
        titlechange('Create company')
    }

    const handletypechange = (e) => {
        typechange(e.target.value);
    }



    useEffect(() => {
        props.loadcompany();
    }, [])

    useEffect(() => {
        if (Object.keys(Editobj).length>0) {
            idchange(Editobj.id);
            namechange(Editobj.name);
            emailchange(Editobj.email);
            phonechange(Editobj.phone);
            typechange(Editobj.type);
            addresschange(Editobj.Address);
        }else{
            idchange(0);
            namechange('');
            emailchange('');
            phonechange('');
            typechange('MNC');
            addresschange('');
        }
    }, [Editobj])
    return (
        props.list.isloading ? <div><h2>Loading......</h2></div> :
            props.list.errormessage ? <div><h2>{props.list.errormessage}</h2></div> :
                <div>


                    <Paper sx={{ margin: '1%' }}>
                        <div style={{ margin: '1%' }}>
                            <Button onClick={functionAdd} color="primary" variant="contained">Add New (+)</Button>
                        </div>
                        <div style={{ margin: '1%' }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: 'midnightblue' }}>
                                            {columns.map((column) =>
                                                <TableCell style={{ color: 'white' }} key={column.id}>
                                                    {column.name}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.list.companylist && props.list.companylist
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{row.phone}</TableCell>
                                                        <TableCell>{row.Address}</TableCell>
                                                        <TableCell>{row.type}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => { handleedit(row.id) }} variant="contained" color="primary">Edit</Button>
                                                            <Button onClick={() => { handledelete(row.id) }} variant="contained" color="error">Delete</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )

                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[1, 5, 10, 25]}
                                rowsPerPage={rowperpage}
                                page={page}
                                count={props.list.companylist.length}
                                component="div"
                                onPageChange={handlechangepage}
                                onRowsPerPageChange={handleRowsPerPage}
                            >

                            </TablePagination>
                        </div>
                    </Paper>

                    <Dialog
                        // fullScreen 
                        open={open} onClose={closepopup} fullWidth maxWidth="sm">
                        <DialogTitle><span style={{fontWeight:'bold'}}>{title}</span><IconButton onClick={closepopup} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                        <DialogContent>
                            {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}

                            <form onSubmit={handlesubmit}>
                                <Stack spacing={2} margin={2}>
                                    <TextField required error={name.length===0} value={name} onChange={e => namechange(e.target.value)} variant="outlined" label="Name"></TextField>
                                    <TextField required error={email.length===0} value={email} onChange={e => emailchange(e.target.value)} variant="outlined" label="Email"></TextField>
                                    <TextField required error={phone.length===0} value={phone} onChange={e => phonechange(e.target.value)} variant="outlined" label="Phone"></TextField>
                                    <TextField value={address} onChange={e => addresschange(e.target.value)} variant="outlined" multiline maxRows={2} minRows={2} label="Address"></TextField>

                                    <RadioGroup name="cmpnytype" value={type} onChange={handletypechange} row>
                                        <FormControlLabel value="MNC" control={<Radio color="success"></Radio>} label="MNC" ></FormControlLabel>
                                        <FormControlLabel value="DOMESTIC" control={<Radio></Radio>} label="DOMESTIC"></FormControlLabel>

                                    </RadioGroup>

                                    <FormControlLabel control={<Checkbox checked={agreeterm} onChange={e => agreetermchange(e.target.checked)} color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                                    <Button disabled={!agreeterm} color="primary" type="submit" variant="contained">Submit</Button>
                                </Stack>
                            </form>

                        </DialogContent>
                        <DialogActions>
                            {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                        </DialogActions>
                    </Dialog>

                </div>
    );
}
const mapStateToProps = (state) => {
    return {
        list: state.company
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadcompany: () => dispatch(FetchCompanyList()),
        removecompany: (code) => dispatch(RemoveCompany(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comapny);