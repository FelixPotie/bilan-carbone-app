import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './modules/views/NavBar';
import AppFooter from './modules/views/AppFooter';

import routes from './routes/routes';

class App extends React.PureComponent {

  state = {
  }


  render() {
    
    return (
      <div>
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
      </div>
    );

  }
}


export default App;
