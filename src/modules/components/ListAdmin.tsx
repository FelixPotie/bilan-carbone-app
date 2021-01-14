import { Box, Button, Container, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import Typography from './Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAdmin, getAdmins } from '../../redux/admin/actions';
import UnauthorizedAdminContainer from './UnauthorizedAdmin';



const mapState = (state: RootState) => {
    return {
        admin: state.admin
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        getAdmins: () => dispatch(getAdmins()),
        deleteAdmin: (id: number) => dispatch(deleteAdmin(id))
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
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        justifyContent: 'center',
    },
    tableContainer:{
        padingLeft: theme.spacing(4),
        padingRight: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    table: {
        minWidth: 700,
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

  
function ListAdminContainer(props: Props) {
    const classes = useStyles();

    useEffect(()=> {
        props.getAdmins()
    }, [])
    
    return  !props.admin.isLoggedIn ? (
        <UnauthorizedAdminContainer/>
        ) : props.admin.failure ? (
            <h2>{props.admin.failure}</h2>
        ) : (
        <React.Fragment>
            <Container className={classes.title}>
                <Box display="flex">
                    <Box m="auto">
                        <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                            List des administateurs
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex">
                    <Box m="auto">
                        <Button
                            variant="contained"
                            className={classes.button}
                            href="/admin/add"
                        >
                            Ajouter un administrateur
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Container className={classes.tableContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Identifiant</StyledTableCell>
                            <StyledTableCell align="center">Supprimer</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.admin.admins.map((row:any) => (
                            <TableRow key={row.id}>
                            <StyledTableCell align="center">{row.username}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    onClick={() => props.deleteAdmin(row.id)}
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

export default connector(ListAdminContainer);
