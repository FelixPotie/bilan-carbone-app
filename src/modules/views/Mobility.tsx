import { Box, Button, Collapse, Container, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { deleteMobility, deleteTravel, getMobilitiesByUser } from '../../redux/mobility/actions';
import { loadUser } from '../../redux/user/actions';
import Typography from '../components/Typography';
import UnauthorizedContainer from './Unauthorized';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import classes from '*.module.css';
import { initTravel } from '../../redux/travel/actions';


const mapState = (state: RootState) => {
    return {
        mobilityData: state.mobility,
        user: state.user
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getMobilitiesByUser: (username: string) => dispatch(getMobilitiesByUser(username)),
        deleteMobility: (id: number) => dispatch(deleteMobility(id)),
        loadUser: () => dispatch(loadUser()),
        deleteTravel: (id: number, mobilityId: number) => dispatch(deleteTravel(id, mobilityId)),
        initTravel: () => dispatch(initTravel())
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
        textDecoration: 'none'
    },
    tableContainer: {
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

function TravelRow(props: any) {


    const { row, deleteMobility, deleteTravel } = props
    const [open, setOpen] = useState(false)

    const history = useHistory();


    const { t } = useTranslation('mobility');

    function carbone(travels: any): number {
        var sum = 0;
        travels.forEach((travel: any) => {
            travel.steps.forEach((step: any) => {
                sum = sum + step.carboneEmission;
            })
        });
        return sum;
    }

    function displayDate(date: string): string {
        return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }

    function displayAddTravelButton() {
        if (row.travels.find((go: any) => go.type === "GO") && row.travels.find((back: any) => back.type === "BACK")) {
            return (<div></div>)
        } else {
            return (
                <Link
                to={`/${row.id}/add-journey`}>
                    <Button
                        variant="contained"
                        // onClick={() => history.push("/" + row.id + "/add-journey")}
                    >
                        <AddIcon />
                    </Button>
                </Link>
            )
        }
    }
    return (
        <React.Fragment>

            <TableRow key={row.id}>
                <StyledTableCell align="center" onClick={() => {
                    setOpen(!open)
                }
                }>{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</StyledTableCell>
                <StyledTableCell align="center">{t(row.type)}</StyledTableCell>
                <StyledTableCell align="center">{row.place}</StyledTableCell>
                <StyledTableCell align="center">{row.year}A</StyledTableCell>
                <StyledTableCell align="center">{displayDate(row.startDate)}</StyledTableCell>
                <StyledTableCell align="center">{displayDate(row.endDate)}</StyledTableCell>
                <StyledTableCell align="center">{(carbone(row.travels) / 1000).toFixed(2)} kg</StyledTableCell>
                <StyledTableCell align="center">
                    {displayAddTravelButton()}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <Button
                        variant="contained"
                        onClick={() => deleteMobility(row.id)}
                    >
                        <DeleteIcon />
                    </Button>
                </StyledTableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                {t("TRAJECT")}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">{t("DATE")}</StyledTableCell>
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">{t("STEPS")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("DELETE_TRAJECT")}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.travels.map((travel: any) => (
                                        <TableRow>
                                            <StyledTableCell align="center" component="th" scope="row">{displayDate(travel.date)}</StyledTableCell>
                                            <StyledTableCell align="center">{t(travel.type)}</StyledTableCell>
                                            <StyledTableCell align="center">{travel.steps.sort((a: any, b: any) => { return a.rank - b.rank }).map((step: any) => (<div>{step.rank + 1}. {t("FROM")} {step.departure} {t("TO")} {step.arrival}</div>))}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => deleteTravel(travel.id, row.id)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

function MobilitiesContainer(props: Props) {
    const classes = useStyles();
    const { t } = useTranslation('mobility');
    const history = useHistory();

    useEffect(() => {
        if (props.user.isLoggedIn) {
            props.getMobilitiesByUser(props.user.user.username);
            props.initTravel();
        }
    }, [props.user.isLoggedIn])

    useEffect(() => {
        
    }, [])

    return !props.user.isLoggedIn ? (
        <UnauthorizedContainer />
    ) : props.mobilityData.error ? (
        <h2>{props.mobilityData.error}</h2>
    ) : (
                <React.Fragment>
                    <Container className={classes.title}>
                        <Box display="flex">
                            <Box m="auto">
                                <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                    {t("MY_MOBILITIES")}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h5" gutterBottom marked="center" align="center">
                            {t("INFO_MOBILITIES")}
                        </Typography>
                        <Box display="flex">
                            <Box m="auto">
                                <Link
                                    to="/add-mobility"
                                    className={classes.button}
                                >
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                    >
                                        {t("ADD_MOBILITY")}
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Container>
                    <Container className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center" />
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">{t("CITY")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("STUDY_YEAR")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("START_DATE")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("END_DATE")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("CARBON")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("ADD_TRAJECT")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("DELETE_TRAJECT")}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.mobilityData.mobilites.map((row: any) => (<React.Fragment><TravelRow row={row} deleteMobility={props.deleteMobility} deleteTravel={props.deleteTravel}></TravelRow></React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </React.Fragment>
            )
}

export default connector(MobilitiesContainer);
