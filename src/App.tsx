import Home from './pages/Home'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './modules/views/NavBar';
import AppFooter from './modules/views/AppFooter';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="**" component={NotFound} />
        </Switch>
      </Router>
      <AppFooter />
    </div>
  );
}

export default App;
