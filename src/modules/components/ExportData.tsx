import { Box, Checkbox, Container, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { loadAdmin } from '../../redux/admin/actions';
import { getAppSettings } from '../../redux/appSettings/actions';
import Button from './Button';
import Typography from './Typography';
import UnauthorizedAdminContainer from './UnauthorizedAdmin';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { getMobilitiesWithFilter } from '../../redux/mobility/actions';
import { ExportToCsv } from 'export-to-csv';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    subtitle: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    }

}));


const mapState = (state: RootState) => {
    return {
        appSettingsData: state.appSettings,
        mobilityFiltered: state.mobility,
        admin: state.admin
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getAppSettings: () => dispatch(getAppSettings()),
        getMobilityFiltered: (body: object) => dispatch(getMobilitiesWithFilter(body)),
        loadAdmin: () => dispatch(loadAdmin()) //REPLACE BY FONCTION WHICH EXPORT THE REEL DATA
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function ExportDataContainer(props: Props) {
    const classes = useStyles();

    useEffect(() => {
        props.getAppSettings();
    }, []);

    useEffect(() => {
        if (props.appSettingsData.success) {
            createDepartmentSelector();
            createMobilityTypeSelector();
        }
    }, [props.appSettingsData.success]);

    // useEffect(() => {
    //     if (props.mobilityFiltered.success) {
    //         console.log(props.mobilityFiltered.mobilites);
    //         const options = { 
    //             fieldSeparator: ',',
    //             filename: 'carbonEmissionReport',
    //             quoteStrings: '"',
    //             decimalSeparator: '.',
    //             showLabels: true, 
    //             showTitle: true,
    //             title: 'My Awesome CSV',
    //             useTextFile: false,
    //             useBom: true,
    //             useKeysAsHeaders: true,
    //             // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    //           };
            
    //         const csvExporter = new ExportToCsv(options);
 
    //         csvExporter.generateCsv(props.mobilityFiltered.mobilites);

    //     }
    // }, [props.mobilityFiltered.success]);


    ////// SELECTOR LOGIC ///////////////////////////////////////////////////

    const [stateDepartment, setStateDepartment] = React.useState({});

    const createDepartmentSelector = () => {
        const departments = props.appSettingsData.appSettings.department;
        // const stateDepartmentAcc: { [x: string]: boolean; } = {};
        departments.forEach((department: { [x: string]: string; }) => {
            setStateDepartment((prevState) => ({ ...prevState, [department.name]: true }));
        })
    }

    const [stateMobilityType, setStateMobilityType] = React.useState({});

    const createMobilityTypeSelector = () => {
        const mobilityTypes = props.appSettingsData.appSettings.mobilityType;
        mobilityTypes.forEach((mobilityType: string) => {
            setStateMobilityType((prevState) => ({ ...prevState, [mobilityType]: true }));
        })
    }

    const [stateSchlooYear, setStateSchoolYear] = React.useState({
        trois: true,
        quatre: true,
        cinq: true,
    })

    const matchingSchoolYear = new Map([['trois', 3], ['quatre', 4], ['cinq', 5]]);

    const [allSelector, setAllSelector] = React.useState({
        allDepartment: true,
        allSchoolYear: true,
        allMobilityType: true
    })

    const { trois, quatre, cinq } = stateSchlooYear;

    const { allSchoolYear, allDepartment, allMobilityType } = allSelector;

    const selectAllDepartment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllSelector({ ...allSelector, [event.target.name]: event.target.checked });
        for (const property in stateDepartment) {
            setStateDepartment((prevState) => ({ ...prevState, [property]: event.target.checked }));
        }
    };

    const selectAllSchoolYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllSelector({ ...allSelector, [event.target.name]: event.target.checked });
        for (const property in stateSchlooYear) {
            setStateSchoolYear((prevState) => ({ ...prevState, [property]: event.target.checked }));
        }
    };

    const selectAllMobilityType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllSelector({ ...allSelector, [event.target.name]: event.target.checked });
        for (const property in stateMobilityType) {
            setStateMobilityType((prevState) => ({ ...prevState, [property]: event.target.checked }));
        }
    };

    const handleChangeDepartment = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setAllSelector({ ...allSelector, ["allDepartment"]: event.target.checked });
        }
        setStateDepartment({ ...stateDepartment, [event.target.name]: event.target.checked });
    };

    const handleChangeSchoolYear = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!event.target.checked) {
            setAllSelector({ ...allSelector, ["allSchoolYear"]: event.target.checked });
        }
        setStateSchoolYear({ ...stateSchlooYear, [event.target.value]: event.target.checked });
    };

    const handleChangeMobilityType = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setAllSelector({ ...allSelector, ["allMobilityType"]: event.target.checked });
        }
        setStateMobilityType({ ...stateMobilityType, [event.target.name]: event.target.checked });
    };

    /////// DATE PICKER ////////////////////////////////////////

    const [startDate, setSartDate] = React.useState<Date | null>(
        new Date('1970-01-01T00:00:00+00:00'),
    );

    const [endDate, setEndDate] = React.useState<Date | null>(
        new Date(),
    );

    const handleStartDateChange = (date: Date | null) => {
        setSartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    /////// EXPORT LOGIC ///////////////////////////////////////////

    const getCheckedState = (states: any) => {
        const checkedStates: any[] = [];
        Object.entries(states).forEach(state => {
            if (state[1]) {
                checkedStates.push(state[0]);
            }
        })
        return checkedStates;
    }

    const exportMobility = () => {
        const body = {
            derpartmentTypeName: getCheckedState(stateDepartment),
            departmentStatus: ["FISA", "FISE"],
            schoolYear: getCheckedState(stateSchlooYear).map(key => matchingSchoolYear.get(key)),
            startDate: startDate,
            endDate: endDate,
            mobilityType: getCheckedState(stateMobilityType)
        }
        props.getMobilityFiltered(body);
        while(props.mobilityFiltered.loading){}
        
        if (props.mobilityFiltered.success) {
            console.log(props.mobilityFiltered.mobilites);
            const options = { 
                fieldSeparator: ',',
                filename: 'carbonEmissionReport',
                quoteStrings: '"',
                decimalSeparator: '.',
                showLabels: true, 
                showTitle: true,
                title: 'My Awesome CSV',
                useTextFile: false,
                useBom: true,
                useKeysAsHeaders: true,
                // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
              };
            
            const csvExporter = new ExportToCsv(options);
 
            csvExporter.generateCsv(props.mobilityFiltered.mobilites);

        }
        
    }


    

    return !props.admin.isLoggedIn ? (
        <UnauthorizedAdminContainer />
    ) :
        !props.appSettingsData.success ? (
            <UnauthorizedAdminContainer /> /// Replace with loading ! 
        ) : (
                <React.Fragment>
                    <Container className={classes.title}>
                        <Box display="flex">
                            <Box m="auto">
                                <Typography variant="h3" marked="center" align="center">
                                    Exporter les données des mobilitées internationales
                                </Typography>
                            </Box>
                        </Box>
                        <Container className={classes.subtitle}>
                            <Typography variant="h5" marked="center" align="center">
                                Renseigner les filtres voulus puis exporter les données sous forme de csv
                            </Typography>
                        </Container>
                    </Container>
                    <Box display="flex">
                        <Box m="auto">
                            <Container className={classes.subtitle}>
                                <Typography key="section" variant="h6" marked="center" align="center">
                                    Choisir les sections :
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel control={<Checkbox onChange={selectAllDepartment} checked={allDepartment} name="allDepartment" key="allDepartment" />} label="Toutes les sections" />
                                    {
                                        Object.entries<boolean>(stateDepartment).map((paire) => {
                                            return <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={paire[1]} name={paire[0]} key={paire[0]} />} label={paire[0]} />
                                        })
                                    }
                                </FormGroup>
                            </Container>

                            <Container className={classes.subtitle}>
                                <Typography key="type" variant="h6" marked="center" align="center">
                                    Choisir le type de mobilitées :
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel control={<Checkbox onChange={selectAllMobilityType} checked={allMobilityType} name="allMobilityType" />} label="Tout les types de mobilitées" />
                                    {
                                        Object.entries<boolean>(stateMobilityType).map((paire) => {
                                            return <FormControlLabel control={<Checkbox onChange={handleChangeMobilityType} checked={paire[1]} name={paire[0]} key={paire[0]} />} label={paire[0]} />
                                        })
                                    }
                                </FormGroup>
                            </Container>
                            <Container className={classes.subtitle}>
                                <Typography key="schoolYear" variant="h6" marked="center" align="center">
                                    Choisir les années d'études :
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel control={<Checkbox onChange={selectAllSchoolYear} checked={allSchoolYear} name="allSchoolYear" />} label="Toutes les années" />
                                    <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={trois} name="trois" />} label="3A" />
                                    <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={quatre} name="quatre" />} label="4A" />
                                    <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={cinq} name="cinq" />} label="5A" />
                                </FormGroup>
                            </Container>
                            <Container className={classes.subtitle}>
                                <Typography key="dates" variant="h6" marked="center" align="center">
                                    Choisir la période :
                                </Typography>
                                <FormGroup row>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="start-date-picker-dialog"
                                                label="Date de début"
                                                format="dd/MM/yyyy"
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="end-date-picker-dialog"
                                                label="Date de fin"
                                                format="dd/MM/yyyy"
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </FormGroup>
                            </Container>
                        </Box>
                    </Box>
                    <Box display="flex">
                        <Box m="auto">
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={exportMobility}
                            // href="/"
                            >
                                Exporter
                    </Button>
                        </Box>
                    </Box>
                </React.Fragment>
            )
}



export default connector(ExportDataContainer);