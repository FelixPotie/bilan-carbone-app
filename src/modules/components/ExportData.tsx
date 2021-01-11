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

const mapDispatch = (dispatch:any) => {
    return {
        loadAdmin : () => dispatch(loadAdmin()) //REPLACE BY FONCTION WHICH EXPORT THE REEL DATA
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function ExportDataContainer(props: Props) {
    const classes = useStyles();

    const [stateDepartment, setStateDepartment] = React.useState({
        ig: false,
        gba: false,
        mea: false,
        mi: false,
        ste: false,
        mat: false,
        se: false,
        dop: false,
        msi: false,
        egc: false,
        
    });

    const [stateSchlooYear, setStateSchoolYear] = React.useState({
        trois: false,
        quatre: false,
        cinq: false,
    })

    const [stateYear, setStateYear] = React.useState({
        vingt: false,
    })

    const [allSelector, setAllSelector] = React.useState({
        allYear: false,
        allDepartment: false,
        allSchoolYear: false,
    })

    const {ig, gba, mea, mi, ste, mat, se, dop, msi, egc} = stateDepartment;

    const {trois, quatre, cinq} = stateSchlooYear;

    const {vingt} = stateYear;

    const {allYear, allSchoolYear, allDepartment} = allSelector;

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
        setStateDepartment({ ...stateDepartment, [event.target.name]: event.target.checked });
    };

    const handleChangeSchoolYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateSchoolYear({ ...stateSchlooYear, [event.target.name]: event.target.checked });
    };

    const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateYear({ ...stateYear, [event.target.name]: event.target.checked });
    };

    return !props.admin.isLoggedIn ? (
            <UnauthorizedAdminContainer/>
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
                            <FormControlLabel control={<Checkbox onChange={selectAllDepartment} checked={allDepartment} name="allDepartment"/>} label="Toutes les sections" />  
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={ig} name="ig" />} label="IG" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={gba} name="gba" />} label="GBA" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={mea} name="mea" />} label="MEA" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={mi} name="mi" />} label="MI" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={ste} name="ste" />} label="STE" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={mat} name="mat" />} label="MAT" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={se} name="se" />} label="SE" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={dop} name="dop" />} label="DO" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={msi} name="msi" />} label="MSI" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeDepartment} checked={egc} name="egc" />} label="EGC" />
                        </FormGroup>
                    </Container>
                    <Container className={classes.subtitle}>
                        <Typography variant="h6" marked="center" align="center">
                            Choisir les années d'études :
                        </Typography>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox onChange={selectAllSchoolYear} checked={allSchoolYear} name="allSchoolYear" />} label="Toutes les années" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={trois} name="trois" />} label="3A" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={quatre} name="quatre"/>} label="4A" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeSchoolYear} checked={cinq} name="cinq"/>} label="5A" />
                        </FormGroup>
                    </Container>
                    <Container className={classes.subtitle}>
                        <Typography variant="h6" marked="center" align="center">
                            Choisir les années :
                        </Typography>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox onChange={selectAllYear} checked={allYear} name="allYear" />} label="Toutes les années" />
                            <FormControlLabel control={<Checkbox onChange={handleChangeYear} checked={vingt} name="vingt" />} label="2020" />
                        </FormGroup>
                    </Container>
                </Box>
            </Box>
            <Box display="flex">
                <Box m="auto">
                    <Button 
                        variant="contained"
                        className={classes.button}
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