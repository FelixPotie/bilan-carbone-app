// React
import React, {useEffect} from 'react'
import { useTranslation } from 'react-i18next';
// Redux
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { loadAdmin } from '../../../redux/admin/actions';
import { getAllMobilities } from '../../../redux/mobility/actions';
// Material UI
import SearchIcon from "@material-ui/icons/Search";
import {
    Container,
    Box,
    TableContainer,
    TableHead,
    makeStyles,
    createStyles,
    TableCell,
    Theme,
    withStyles,
    InputBase, IconButton
} from '@material-ui/core';
import { Paper, Table, TableRow, TableBody } from'@material-ui/core';
// Component
import UnauthorizedAdminContainer from "./UnauthorizedAdmin";
import Typography from '../../components/Typography';
// Utils
import { displayMobilityDate, mobilityCarbonEmission, mobilityTravelsType } from  '../../../utils/mobilityTools'


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
        allMobilitiesData: state.mobility,
        admin: state.admin
    }
}

const mapDispatch = (dispatch: any) => {
    return {
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

    function getMobilityRow(mobility: any) {
        return (
            (Object.keys(mobility).length === 0 && mobility.constructor === Object) ?
                <React.Fragment>
                    <TableRow key={'emptyRow'}>
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
                    <StyledTableCell align="center">{displayMobilityDate(mobility.startDate)}</StyledTableCell>
                    <StyledTableCell align="center">{displayMobilityDate(mobility.endDate)}</StyledTableCell>
                    <StyledTableCell align="center">{mobilityTravelsType(mobility.travels).toString()}</StyledTableCell>
                    <StyledTableCell align="center">{(mobilityCarbonEmission(mobility.travels) / 1000).toFixed(2)} kg</StyledTableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        !props.admin.isLoggedIn ? (
                <UnauthorizedAdminContainer />
            ) :
            (
        <div>
            <React.Fragment>
                    <Container className={classes.title}>
                        <Box display="flex">
                            <Box m="auto">
                                <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                    Recherche de mobilités
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h5" gutterBottom marked="center" align="center">
                            Entrez le nom d'un étudiant, le prénom ou les deux pour rechercher les mobilités correspondantes
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
                                        <StyledTableCell key={'student'} align="center">Étudiant</StyledTableCell>
                                        <StyledTableCell key={'type'} align="center">Type</StyledTableCell>
                                        <StyledTableCell key={'city'} align="center">{t("CITY")}</StyledTableCell>
                                        <StyledTableCell key={'year'} align="center">{t("STUDY_YEAR")}</StyledTableCell>
                                        <StyledTableCell key={'startDate'} align="center">{t("START_DATE")}</StyledTableCell>
                                        <StyledTableCell key={'endDate'} align="center">{t("END_DATE")}</StyledTableCell>
                                        <StyledTableCell key={'typeTraject'} align="center">Type de trajets</StyledTableCell>
                                        <StyledTableCell key={'carbon'} align="center">{t("CARBON")}</StyledTableCell>
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
        
    ));
}

export default connector(SearchStudent);