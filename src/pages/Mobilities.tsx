import { Box, Button, Container, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles } from '@material-ui/core';
import React from 'react'
import withRoot from '../modules/withRoot'
import Typography from '../modules/components/Typography';


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

function createData(id: number, type: string, place: string, year: number, start_date: string, end_date: string) {
    return { id, type, place, year, start_date, end_date };
}

const rows = [
    createData(1,'Semestre', 'Trondheim, Norvège', 4, '11/01/2020', '10/06/2020'),
    createData(2,'Stage', 'Ottawa, Canada', 4, '15/06/2020', '18/08/2020'),
];

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

  
function Mobilities() {
    const classes = useStyles();

    return (
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
                            href="/"
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
                        {rows.map((row) => (
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

export default withRoot(Mobilities);
