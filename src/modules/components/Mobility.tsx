import { Box, Button, Container, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { getMobilitiesByUser } from '../../redux/mobility/actions';
import { loadUser } from '../../redux/user/actions';
import Typography from './Typography';


const mapState = (state: RootState) => {
    return {
        mobilityData: state.mobility,
        user: state.user
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        getMobilitiesByUser: (username: string) => dispatch(getMobilitiesByUser(username)),
        loadUser : () => dispatch(loadUser()),
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

  
function MobilitiesContainer(props: Props) {
    const classes = useStyles();
    useEffect(()=> {
        if(props.user.isLoggedIn) props.getMobilitiesByUser(props.user.user.username)
    }, [props.user.isLoggedIn])
    return  !props.user.isLoggedIn ? (
            <div>Vous devez être connecté pour acceder à cette page</div>
        ) : props.mobilityData.error ? (
            <h2>{props.mobilityData.error}</h2>
        ) : (
        <React.Fragment>
            <Container className={classes.title}>
                <Box display="flex">
                    <Box m="auto">
                        <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                            Mes mobilités
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h5" gutterBottom marked="center" align="center">
                    Retrouvez vos différentes expériences à l'étranger effectuées durant vos études à Polytech Montpellier
                </Typography>
                <Box display="flex">
                    <Box m="auto">
                        <Button
                            variant="contained"
                            className={classes.button}
                            href="/add-mobility"
                        >
                            Ajouter une mobilité
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Container className={classes.tableContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Type</StyledTableCell>
                            <StyledTableCell align="center">Ville, Pays</StyledTableCell>
                            <StyledTableCell align="center">Année d'étude</StyledTableCell>
                            <StyledTableCell align="center">Date de début</StyledTableCell>
                            <StyledTableCell align="center">Date de fin</StyledTableCell>
                            <StyledTableCell align="center">Emissions carbones</StyledTableCell>
                            <StyledTableCell align="center">Ajouter un trajet</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.mobilityData.mobilites.map((row:any) => (
                            <TableRow key={row.id}>
                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                            <StyledTableCell align="center">{row.place}</StyledTableCell>
                            <StyledTableCell align="center">{row.year}A</StyledTableCell>
                            <StyledTableCell align="center">{row.start_date}</StyledTableCell>
                            <StyledTableCell align="center">{row.end_date}</StyledTableCell>
                            <StyledTableCell align="center">500 kg</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    href="/"
                                >
                                    +
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

export default connector(MobilitiesContainer);
