import { withStyles } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavBar from './modules/views/NavBar';
import { store } from './redux';
import routes from './routes/routes.admin';

class Main extends React.PureComponent { 


    state = {
    }
    
    render() {
        //const { classes } = this.props;

        return (
            <div>
                <Provider store={store}>
                <NavBar />
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


export default withStyles(styles, { withTheme: true })(Main);