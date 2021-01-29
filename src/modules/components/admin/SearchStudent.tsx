import { Container, Box, Button, TableContainer, TableHead, makeStyles, createStyles, TableCell, Theme, withStyles } from '@material-ui/core';
import { Paper, Table, TableRow, TableBody } from'@material-ui/core';
import Typography from '../../components/Typography';
import React from 'react'
import { useTranslation } from 'react-i18next';
import withRoot from '../../withRoot';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'http2';
import { ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { loadAdmin } from '../../../redux/admin/actions';


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
        mobilityFiltered: state.mobility,
        admin: state.admin
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getMobilityFiltered: () => dispatch(getMobilities()),
        loadAdmin: () => dispatch(loadAdmin()) //REPLACE BY FONCTION WHICH EXPORT THE REEL DATA
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function SearchStudent(props: Props) {

    const classes = useStyles();
    const { t } = useTranslation('mobility');
    const history = useHistory();
    
    return (
        <div>
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
                                        <StyledTableCell align="center"># trajets</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    test
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </React.Fragment>
        </div>
        
    );
}

export default connector(SearchStudent);