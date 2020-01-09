import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import { logout } from '../actions/authActions';

const Header = ({ auth, logout }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href={`${process.env.REACT_APP_SERVER}/auth/google`}>
              Login with Google
            </a>
          </li>
        );
      default:
        return (
          <>
            <li key="1">
              <Payments />
            </li>
            <li key="3" style={{ margin: '0 10px' }}>
              Credits: {auth.credits}
            </li>
            <li key="2">
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
          Survey Sender
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { logout })(Header);
