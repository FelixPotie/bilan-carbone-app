import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './modules/components/navBar/NavBar';
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
          <Router>
            <main>
              {/* <Auth/> */}
              <NavBar />
              <Switch>
                {routes.map((prop, key) => {
                  return <Route path={prop.path} exact component={prop.component} key={key} />
                })
                }
              </Switch>
            </main>
            <AppFooter />
          </Router>
        </Provider>
      </div>
    );

  }
}


export default App;
