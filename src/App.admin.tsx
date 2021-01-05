import { withStyles } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Auth from './modules/components/Auth';
import NavBarAdmin from './modules/components/navBar/NavBarAdmin';
import { store } from './redux';
import NavBar from './modules/components/navBar/NavBar';
import routes from './routes/routes.admin';

class AppAdmin extends React.PureComponent { 


    state = {
    }
    
    render() {
        //const { classes } = this.props;

        return (
            <div>
                <Provider store={store}>
                <Auth label="admin"/>
                <NavBarAdmin/>
                <Switch>
                {routes.map((prop,key) => {
                    return <Route path={prop.path} exact component={prop.component} key={key} />
                })
                }
                </Switch>
                </Provider>
            </div>
            
        )
    }
}

const styles = () => ({
});


export default withStyles(styles, { withTheme: true })(AppAdmin);