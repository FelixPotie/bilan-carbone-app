import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './modules/views/NavBar';
import AppFooter from './modules/views/AppFooter';
import { Provider } from 'react-redux';
import routes from './routes/routes';
import { store } from './redux';
import Auth from './modules/components/Auth';

class App extends React.PureComponent {

  state = {
  }


  render() {
    
    return (
      <div>
        <Provider store={store}>
          <Auth/>
          <NavBar />
          <Router>
            <Switch>
              {routes.map((prop,key) => {
                return <Route path={prop.path} exact component={prop.component} key={key} />
              })
              }
            </Switch>
          </Router>
          <AppFooter />
        </Provider>
      </div>
    );

  }
}


export default App;
