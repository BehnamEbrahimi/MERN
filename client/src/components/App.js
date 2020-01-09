import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/authActions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const App = ({ fetchUser }) => {
  useEffect(() => {
    const authToken = window.location.search.replace('?authToken=', '');
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      window.location = '/';
    }

    fetchUser();
  }, []);

  return (
    <div className="container">
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
