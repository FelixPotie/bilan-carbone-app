import { withStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Ecolab from './pages/Ecolab';

class Main extends React.PureComponent { 

    render() {
        //const { classes } = this.props;

        return (
            <Switch>
                <Route path="/admin" component={Ecolab}/>
            </Switch>
        )
    }
}

const styles = () => ({
});


export default withStyles(styles, { withTheme: true })(Main);