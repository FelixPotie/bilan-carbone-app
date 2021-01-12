import { Box, Checkbox, Container, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import { TurnedInNotSharp } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { loadAdmin } from '../../redux/admin/actions';
import { getAppSettings } from '../../redux/appSettings/actions';
import Button from './Button';
import Typography from './Typography';
import UnauthorizedAdminContainer from './UnauthorizedAdmin';

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
        admin: state.admin
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getAppSettings: () => dispatch(getAppSettings()),
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
        if(props.appSettingsData.success){
            createDepartmentSelector();
        }
    }, [props.appSettingsData.success]);

    const [stateDepartment, setStateDepartment] = React.useState({});

    const createDepartmentSelector = () => {     
            const departments = props.appSettingsData.appSettings.department;
            // const stateDepartmentAcc: { [x: string]: boolean; } = {};
            departments.forEach((department: { [x: string]: string; }) => {      
                setStateDepartment((prevState) => ({ ...prevState, [department.name]: true })); 
            })
    }

    const [stateSchlooYear, setStateSchoolYear] = React.useState({
        trois: true,
        quatre: true,
        cinq: true,
    })

    const matchingSchoolYear = new Map([['trois', 3], ['quatre', 4], ['cinq', 5]]);

    const [stateYear, setStateYear] = React.useState({
        vingt: { checked: true, value: 2020 },
    })

    const [allSelector, setAllSelector] = React.useState({
        allYear: true,
        allDepartment: true,
        allSchoolYear: true,
    })

    const { trois, quatre, cinq } = stateSchlooYear;

    const { vingt } = stateYear;

    const { allYear, allSchoolYear, allDepartment } = allSelector;

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

    const selectAllYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllSelector({ ...allSelector, [event.target.name]: event.target.checked });
        for (const property in stateYear) {
            setStateYear((prevState) => ({ ...prevState, [property]: event.target.checked }));
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

    const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setAllSelector({ ...allSelector, ["allYear"]: event.target.checked });
        }
        setStateYear({ ...stateYear, [event.target.value]: event.target.checked });
    };

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
        console.log(props.appSettingsData);
        const test2 = {
            derpartmentTypeName: getCheckedState(stateDepartment),
            departmentStatus: [],
            schoolYear: getCheckedState(stateSchlooYear).map(key => matchingSchoolYear.get(key)),
            startYear: getCheckedState(stateYear),
            mobilityType: []
        }
        console.log(test2);
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
                            <Typography variant="h6" marked="center" align="center">
                                Choisir les sections :
                        </Typography>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox onChange={selectAllDepartment} checked={allDepartment} name="allDepartment" />} label="Toutes les sections" />
                                {
                                    Object.entries<boolean>(stateDepartment).map((paire) => {
                                        return <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={paire[1]} name={paire[0]} key={paire[0]}/>} label={paire[0]} />
                                    })
                                }
                            </FormGroup>
                        </Container>
                        <Container className={classes.subtitle}>
                            <Typography variant="h6" marked="center" align="center">
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
                            <Typography variant="h6" marked="center" align="center">
                                Choisir les années :
                        </Typography>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox onChange={selectAllYear} checked={allYear} name="allYear" />} label="Toutes les années" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeYear} checked={vingt.checked} value={vingt} />} label="2020" />
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