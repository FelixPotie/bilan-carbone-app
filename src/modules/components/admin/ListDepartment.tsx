import { Box, Button, CircularProgress, Container, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import Typography from '../Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import UnauthorizedAdminContainer from './UnauthorizedAdmin';
import { addAppSettings, deleteAppSettings, getAppSettings } from '../../../redux/appSettings/actions';



const mapState = (state: RootState) => {
    return {
        admin: state.admin,
        settingsData: state.appSettings
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        getAppSettings: () => dispatch(getAppSettings()),
        deleteDepartment: (id: string) => dispatch(deleteAppSettings(id)),
        addDepartment: (body: any) => dispatch(addAppSettings(body))
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux


const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    button: {
        margin: 'auto'
    },
    tableContainer:{
        padingLeft: theme.spacing(4),
        padingRight: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    table: {
        minWidth: 700,
    },
    form: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    field: {
        width:'100%',
        margin: 'auto'
    },
    add: {
        width:'80%',
        marginBottom: theme.spacing(4)
    },
    delete: {
        height:'20px',
    },
   
}));

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#96989B',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

  
function ListDepartmentContainer(props: Props) {
    const classes = useStyles();

    useEffect(()=> {
        props.getAppSettings();
    }, [])

    const initialState = {
        name: "",
        status:  "",
    }
     
    const [state, setState] = React.useState(initialState);

    const {name, status} = state;
    
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body ={
            "name": name,
            "status": status
        }
        props.addDepartment(body);
        setState(initialState);
    }
    
    return  !props.admin.isLoggedIn ? (
        <UnauthorizedAdminContainer/>
        ) : props.settingsData.error ? (
            <h2>{props.settingsData.error}</h2>
        ) : props.settingsData.loading ? (
            <CircularProgress disableShrink />
        ) : (
        <React.Fragment>
            <Container className={classes.title}>
                <Box display="flex">
                    <Box m="auto">
                        <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                            List des sections
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <Container className={classes.add}>               
                <form onSubmit={e => onSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item md={4}>
                        <div className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Acronyme de la section"
                                    name="name"
                                    autoComplete="name"
                                    onChange={handleChange}
                                    value={name}
                                    className={classes.button}
                                />
                            </div>
                        </Grid>
                        <Grid item md={4}>
                        <FormControl className={classes.form} variant="outlined">
                                <InputLabel htmlFor="status">Statut de la section</InputLabel>
                                <Select
                                    required
                                    variant="outlined"
                                    fullWidth
                                    id="status"
                                    name="status"
                                    label="Statut de la section"
                                    autoComplete="status"
                                    onChange={handleChange}
                                    value={status}
                                    className={classes.field}
                                >
                                    <MenuItem value={'FISE'}>FISE</MenuItem>
                                    <MenuItem value={'FISA'}>FISA</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                        <div className={classes.button}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Ajouter la section
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container> 
            <Container className={classes.tableContainer}>
                <TableContainer component={Paper}>
                    <Table size="small"></Table>
                    <Table className={classes.table} size="small">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Acronyme</StyledTableCell>
                            <StyledTableCell align="center">Statut</StyledTableCell>
                            <StyledTableCell align="center">Supprimer</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.settingsData.appSettings.department.sort((a:any,b:any)=>((a.status < b.status) ? 1 : ((b.status < a.status) ? -1 : 0)) || ((a.name > b.name) ? 1 :((b.name > a.name) ? -1 : 0))).map((row:any) => (
                            <TableRow key={row.name}>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    className={classes.delete}
                                    onClick={() => props.deleteDepartment(row.name)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </StyledTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    )
}

export default connector(ListDepartmentContainer);
