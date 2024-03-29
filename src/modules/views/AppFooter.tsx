import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import { FormControl, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
//locales
import LANGUAGES from '../../locales/Languages'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#004978",
    minHeight: '330px'
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    color: 'white'
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
    fontSize: 'small',
    color: 'white'
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
  navigation: {
    fontSize: 'small'
  },
  Link: {
    color: 'white',
    textDecoration: 'none',

  },
  title: {
    fontSize: theme.typography.h4.fontSize,
    color: 'white'
  },
  text: {
    marginTop: '2%',
    color: 'secondary',
    textAlign:"justify"
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    minWidth: 100,
  },

  select: {
    color:"white",
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    }
  },
  icon: {
    fill: 'white',
  },

}));

function AppFooter() {
  const classes = useStyles();

  const { t, i18n } = useTranslation()

  const changeLanguage = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    i18n.changeLanguage(target.value);
  }

  const [languageLoaded, setLanguageLoaded] = React.useState("fr-FR"); //use default language instead of setting it her arbitrarily

  i18n.on('loaded', function(loaded) { if (loaded) console.log(i18n.language);setLanguageLoaded(i18n.language) });

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid style={{width:'100%', margin: '0px'}} container spacing={5}>
          <Grid style={{padding:'0px'}} item xs={12} sm={12} md={5} >
            <Typography variant="h5" marked="left" className={classes.title}>
              {t("FOOTER.TITLE")}
            </Typography>
            <div className={classes.item}>
              <Typography className={classes.text}  >
                {t('FOOTER.TEXT')}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h5" gutterBottom>
              {t("NAVIGATION")}
            </Typography>
            <ul className={classes.list}>
              <li >
                <Link className={classes.Link} to="/home">{t("HOME")}</Link>
              </li>
              <li >
                <Link className={classes.Link} to="/simulation">{t("SIMULATE")}</Link>
              </li>
              <li >
                <Link className={classes.Link} to="/statistics">{t("STATISTICS")}</Link>
              </li><li >
                <Link className={classes.Link} to="/hypothesis">{t("HYPOTHESIS")}</Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h5" gutterBottom>
              {t("LEGAL")}
            </Typography>
            <ul className={classes.list}>
              <li>
                <Link className={classes.Link} to="/terms">{t("TERMS")}</Link>
              </li>
              <li>
                <Link className={classes.Link} to="/privacy">{t("PRIVACY")}</Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <Typography variant="h5" gutterBottom>
              {t("LANGUAGE")}
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                type="text"
                value={languageLoaded}
                onChange={changeLanguage}
                className={classes.select}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                  },
                }}
              >
                {LANGUAGES.map((language) => (
                  <MenuItem value={language.code} key={language.code}>
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <React.Fragment>
              {'© '}{t("MADE_BY")} Bourrat Mathis, Potié Félix, Gayet Simon.{' '}
              {new Date().getFullYear()}
            </React.Fragment>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}


export default AppFooter;
