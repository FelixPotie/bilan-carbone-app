//Material UI
import { Box, Checkbox, Container, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
//React Redux
import React from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { loadAdmin } from '../../../redux/admin/actions';
import { getAppSettings } from '../../../redux/appSettings/actions';
import { getMobilitiesWithFilter } from '../../../redux/mobility/actions';
//component
import Button from '../Button';
import Typography from '../Typography';
import UnauthorizedAdminContainer from './UnauthorizedAdmin';
import Snackbar from '../Snackbar'
//Lib
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
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
    },
    info: {
        color: 'red',
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

    function carbone(travels: any): number {
        var sum = 0;
        travels.forEach((travel: any) => {
            travel.steps.forEach((step: any) => {
                sum = sum + step.carboneEmission;
            })
        });
        return sum;
    }

    useEffect(() => {
        props.getAppSettings();
    }, []);

    useEffect(() => {
        if (props.appSettingsData.success) {
            createDepartmentSelector();
            createMobilityTypeSelector();
        }
    }, [props.appSettingsData.success]);

    useEffect(() => {
        if (props.mobilityFiltered.success) {
            if (props.mobilityFiltered.mobilites.length !== 0) { 
                var exportData = [];
                for(let i=0; i<props.mobilityFiltered.mobilites.length; i++){
                    const m=props.mobilityFiltered.mobilites[i];
                    const row={
                        id: m.id,
                        Nom: m.userId.split('.')[1],
                        Prénom: m.userId.split('.')[0],
                        Département: m.departmentTypeName,
                        Type: m.type,
                        Lieu: m.place,
                        Année: m.year,
                        Début: m.startDate.substring(0,10),
                        Fin: m.endDate.substring(0,10),
                        Carbone: carbone(m.travels)
                    }
                    exportData.push(row); 
                }
                const options = {
                    fieldSeparator: ',',
                    filename: 'rapportDemissionCarbone',
                    quoteStrings: '"',
                    decimalSeparator: '.',
                    showLabels: true,
                    showTitle: false,
                    title: 'listeDesMobilitée',
                    useTextFile: false,
                    useBom: true,
                    useKeysAsHeaders: true,
                };
                
                const csvExporter = new ExportToCsv(options);
                csvExporter.generateCsv(exportData);

            } else {
                setMessagSnackBar("Aucune donnée ne correspond à votre recherche")
                setOpenSnackBar(true);
            }
        }

    }, [props.mobilityFiltered.success, !props.mobilityFiltered.loading]);


    ////// SELECTOR LOGIC ///////////////////////////////////////////////////

    const [stateDepartment, setStateDepartment] = React.useState({});

    const createDepartmentSelector = () => {
        const departments = props.appSettingsData.appSettings.department.sort((a:any,b:any)=>((a.status < b.status) ? 1 : ((b.status < a.status) ? -1 : 0)) || ((a.name > b.name) ? 1 :((b.name > a.name) ? -1 : 0)));
        console.log(departments);
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
            setAllSelector({ ...allSelector, "allDepartment": event.target.checked });
        }
        setStateDepartment({ ...stateDepartment, [event.target.name]: event.target.checked });
    };

    const handleChangeSchoolYear = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (!event.target.checked) {
            setAllSelector({ ...allSelector, "allSchoolYear": event.target.checked });
        }
        setStateSchoolYear({ ...stateSchlooYear, [event.target.value]: event.target.checked });
    };

    const handleChangeMobilityType = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setAllSelector({ ...allSelector, "allMobilityType": event.target.checked });
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

    const [startDateError, setSartDateError] = React.useState(false);

    const [endDateError, setEndDateError] = React.useState(false);

    const handleStartDateChange = (date: Date | null) => {
        if (date === null || isNaN(date.getTime())) {
            setSartDateError(true)
        } else {
            setSartDateError(false)
            setSartDate(date);
        }

    };

    const handleEndDateChange = (date: Date | null) => {
        if (date === null || isNaN(date.getTime())) {
            setEndDateError(true)
        } else {
            setEndDateError(false)
            setEndDate(date);
        }
    };


    /////// SnackBar //////////////////////////////////////////

    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const [messageSnackBar, setMessagSnackBar] = React.useState("");


    const handleClose = () => {
        setOpenSnackBar(false);
    };

    const displayType = (type: string) => {
        return type==="SEMESTER"?"Semestre":type==="INTERNSHIP"?"Stage":type==="DOUBLE_DEGRE"?"Double diplôme":""
    }
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

    const getMobility = () => {
        if (startDateError || endDateError) {
            setMessagSnackBar("Veuillez selectionner des dates valides")
            setOpenSnackBar(true);
        } else {
            const body = {
                derpartmentTypeName: getCheckedState(stateDepartment),
                departmentStatus: ["FISA", "FISE"],   //// SHOULD CHANGE
                schoolYear: getCheckedState(stateSchlooYear).map(key => matchingSchoolYear.get(key)),
                startDate: startDate,
                endDate: endDate,
                mobilityType: getCheckedState(stateMobilityType)
            }
            props.getMobilityFiltered(body);
        }
    }

    return !props.admin.isLoggedIn ? (
        <UnauthorizedAdminContainer />
    ) :
        !props.appSettingsData.success ? (
            <CircularProgress color="secondary" /> /// Replace with loading ! 
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
                                    <FormControlLabel control={<Checkbox onChange={selectAllMobilityType} checked={allMobilityType} name="allMobilityType" />} label="Tous les types de mobilités" />
                                    {
                                        Object.entries<boolean>(stateMobilityType).map((paire) => {
                                            return <FormControlLabel control={<Checkbox onChange={handleChangeMobilityType} checked={paire[1]} name={paire[0]} key={paire[0]} />} label={displayType(paire[0])} />
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
                                                error={startDateError}
                                                margin="normal"
                                                id="start-date-picker-dialog"
                                                label="Date de début"
                                                format="dd/MM/yyyy"
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                helperText={startDateError ? "Date invalide" : "Date valide"}
                                            />
                                            <KeyboardDatePicker
                                                error={endDateError}
                                                margin="normal"
                                                id="end-date-picker-dialog"
                                                label="Date de fin"
                                                format="dd/MM/yyyy"
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                helperText={endDateError ? "Date invalide" : "Date valide"}
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
                                onClick={getMobility}
                            >
                                Exporter
                            </Button>
                        </Box>
                    </Box>
                    <Snackbar
                        open={openSnackBar}
                        closeFunc={handleClose}
                        message={messageSnackBar}
                        classes={classes}
                    />
                </React.Fragment>
            )
}



export default connector(ExportDataContainer);