import {
    Container,
    Box,
    Button,
    TableContainer,
    TableHead,
    makeStyles,
    createStyles,
    TableCell,
    Theme,
    withStyles,
    InputBase, IconButton, Select
} from '@material-ui/core';
import { Paper, Table, TableRow, TableBody } from'@material-ui/core';
import Typography from '../../components/Typography';
import React, {useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import withRoot from '../../withRoot';
import { Link, useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { loadAdmin } from '../../../redux/admin/actions';
import { getAllMobilities } from '../../../redux/mobility/actions';
import { getAppSettings } from '../../../redux/appSettings/actions';
import SearchIcon from "@material-ui/icons/Search";


const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    searchBarContainer:{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    searchBar:{
        backgroundColor: theme.palette.secondary.light,
        padding: '1% 2% 1% 2%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "10px",

    },
    textField:{
        borderBottom: 'none',
        width: '40%'
    },
    searchIcon: {
        width: '10%',
    },
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        justifyContent: 'center',
        textDecoration: 'none'
    },
    container: {
        padingLeft: theme.spacing(4),
        padingRight: theme.spacing(4),
        marginBottom: theme.spacing(4),

    },
    tableContainer: {
        maxHeight: 500,
    },
    table: {
        minWidth: 700,
    },
}));

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#005988',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const mapState = (state: RootState) => {
    return {
        appSettingsData: state.appSettings,
        allMobilitiesData: state.mobility,
        admin: state.admin
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getAppSettings: () => dispatch(getAppSettings()),
        getAllMobility: () => dispatch(getAllMobilities()),
        loadAdmin: () => dispatch(loadAdmin())
    }
}

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function SearchStudent(props: Props) {
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        mobilitiesSelected: [{}]
    });

    const {firstName, lastName, mobilitiesSelected } = state;

    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        props.getAppSettings();
        props.getAllMobility();
    }, []);

    const handleSearch = () => {
        const mobilitySelected = props.allMobilitiesData.mobilites.filter((mobility:any) => {
            return mobility.userId.includes(firstName.toLocaleLowerCase()) && mobility.userId.includes(lastName.toLocaleLowerCase());
        });
        setState({ ...state, mobilitiesSelected: mobilitySelected });
    };

    const classes = useStyles();
    const { t } = useTranslation('mobility');

    function displayDate(date: string): string {
        return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }

    function carbon(travels: any): number {
        var sum = 0;
        travels.forEach((travel: any) => {
            travel.steps.forEach((step: any) => {
                sum = sum + step.carboneEmission;
            })
        });
        return sum;
    }
    
    function travelType(travels: any) {
        return travels.map((travel: any) => travel.type)
    }

    function getMobilityRow(mobility: any) {
        return (
            (Object.keys(mobility).length === 0 && mobility.constructor === Object) ?
                <React.Fragment>
                    <TableRow>
                        <StyledTableCell colSpan={8} align="center">Essayer une recherche</StyledTableCell>
                    </TableRow>
                </React.Fragment>
                :
            <React.Fragment>
                <TableRow key={mobility.id}>
                    <StyledTableCell align="center">{mobility.userId}</StyledTableCell>
                    <StyledTableCell align="center">{t(mobility.type)}</StyledTableCell>
                    <StyledTableCell align="center">{mobility.place}</StyledTableCell>
                    <StyledTableCell align="center">{mobility.year}</StyledTableCell>
                    <StyledTableCell align="center">{displayDate(mobility.startDate)}</StyledTableCell>
                    <StyledTableCell align="center">{displayDate(mobility.endDate)}</StyledTableCell>
                    <StyledTableCell align="center">{travelType(mobility.travels).toString()}</StyledTableCell>
                    <StyledTableCell align="center">{(carbon(mobility.travels) / 1000).toFixed(2)} kg</StyledTableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        <div>
            <React.Fragment>
                    <Container className={classes.title}>
                        <Box display="flex">
                            <Box m="auto">
                                <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                    Recherche de mobilitées
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h5" gutterBottom marked="center" align="center">
                            Entrez le nom, le prénom ou les deux pour rechercher les mobilitées correspondantes
                        </Typography>
                    </Container>
                    <Container className={classes.searchBarContainer}>
                        <div className={classes.searchBar} >
                            <InputBase className={classes.textField}
                                       name="firstName"
                                       placeholder="Prénom"
                                       value={firstName}
                                       onChange={handleChange}
                                       onKeyDown={(event) => {
                                           if (event.key === 'Enter') {
                                               handleSearch();
                                           }
                                       }}
                                       />
                            <InputBase className={classes.textField}
                                       name="lastName"
                                       placeholder="Nom"
                                       value={lastName}
                                       onChange={handleChange}
                                       onKeyDown={(event) => {
                                           if (event.key === 'Enter') {
                                               handleSearch();
                                           }
                                       }}
                                        />
                            <IconButton onClick={handleSearch} type="submit" className={classes.searchIcon} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </div>
                    </Container>
                    <Container className={classes.container}>
                        <TableContainer className={classes.tableContainer} component={Paper}>
                            <Table stickyHeader className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow key="head">
                                        <StyledTableCell align="center">Étudiant</StyledTableCell>
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">{t("CITY")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("STUDY_YEAR")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("START_DATE")}</StyledTableCell>
                                        <StyledTableCell align="center">{t("END_DATE")}</StyledTableCell>
                                        <StyledTableCell align="center">Type de trajets</StyledTableCell>
                                        <StyledTableCell align="center">{t("CARBON")}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mobilitiesSelected.map(mobility => getMobilityRow(mobility))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </React.Fragment>
        </div>
        
    );
}

export default connector(SearchStudent);