import { withStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './modules/components/navBar/NavBar';
import routes from './routes/routes.admin';

class Main extends React.PureComponent { 


    state = {
    }
    
    render() {
        //const { classes } = this.props;

        return (
            <div>
                <NavBar />
                <Switch>
                {routes.map((prop,key) => {
                    return <Route path={prop.path} exact component={prop.component} key={key} />
                })
                }
                </Switch>
            </div>
            
        )
    }
}

const styles = () => ({
});


export default withStyles(styles, { withTheme: true })(Main);