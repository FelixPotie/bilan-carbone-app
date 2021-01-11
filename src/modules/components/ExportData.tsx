import { Box, Checkbox, Container, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux';
import { loadAdmin } from '../../redux/admin/actions';
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
        admin: state.admin
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        loadAdmin: () => dispatch(loadAdmin()) //REPLACE BY FONCTION WHICH EXPORT THE REEL DATA
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function ExportDataContainer(props: Props) {
    const classes = useStyles();

    const [stateDepartment, setStateDepartment] = React.useState({
        IG: true,
        GBA: true,
        MEA: true,
        MI: true,
        STE: true,
        MAT: true,
        SE: true,
        DOP: true,
        MSI: true,
        EGC: true,

    });

    const [stateSchlooYear, setStateSchoolYear] = React.useState({
        trois: { checked : true, value: 3},
        quatre: { checked : true, value: 4},
        cinq: { checked : true, value: 5}
    })

    const [stateYear, setStateYear] = React.useState({
        vingt: { checked : true, value: 2020},
    })

    const [allSelector, setAllSelector] = React.useState({
        allYear: true,
        allDepartment: true,
        allSchoolYear: true,
    })

    const { IG, GBA, MEA, MI, STE, MAT, SE, DOP, MSI, EGC } = stateDepartment;

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
        setStateSchoolYear({ ...stateSchlooYear, [event.target.value]:  { checked: event.target.checked }}); //[event.target.value]: {checked : event.target.checked,  });
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
            if(!state[1]){
                checkedStates.push(state[0]);
            }
        })
        return checkedStates;
    }

    const exportMobility = () => {
       const test  = {
        derpartmentTypeName : getCheckedState(stateDepartment), 
        departmentStatus : [], 
        schoolYear : getCheckedState(stateSchlooYear),
        startYear : getCheckedState(stateYear), 
        mobilityType : []

       }
    }

    return !props.admin.isLoggedIn ? (
        <UnauthorizedAdminContainer />
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
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={IG} name="ig" />} label="IG" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={GBA} name="gba" />} label="GBA" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={MEA} name="mea" />} label="MEA" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={MI} name="mi" />} label="MI" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={STE} name="ste" />} label="STE" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={MAT} name="mat" />} label="MAT" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={SE} name="se" />} label="SE" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={DOP} name="dop" />} label="DO" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={MSI} name="msi" />} label="MSI" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={EGC} name="egc" />} label="EGC" />
                            </FormGroup>
                        </Container>
                        <Container className={classes.subtitle}>
                            <Typography variant="h6" marked="center" align="center">
                                Choisir les années d'études :
                        </Typography>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox onChange={selectAllSchoolYear} checked={allSchoolYear} name="allSchoolYear" />} label="Toutes les années" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={trois.checked} value={trois} />} label="3A" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={quatre.checked} value={quatre} />} label="4A" />
                                <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={cinq.checked} value={cinq} />} label="5A" />
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