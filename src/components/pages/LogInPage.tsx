import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import './LogIn.scss';
import { login, logout } from '../../features/authSlice';
import { authenticateUser } from '../utils/authService';
import { RootState } from '../../app/store';

export const LogInPage = () => {
  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();
  const isAuthorized = useSelector<RootState>(
    statment => statment.auth.authorized,
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');

    if (authenticateUser(userName, password)) {
      dispatch(login());
      navigate(state?.pathname || '/', { replace: true });
    } else {
      setLoginError('The username or password you entered is incorrect.');
    }
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setHasUserNameError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setHasPasswordError(false);
  };

  const handleReset = () => {
    setUserName('');
    setPassword('');
    setHasUserNameError(false);
    setHasPasswordError(false);
    setLoginError('');
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      {isAuthorized ? (
        <div className="logout">
          <h2>You are logged in</h2>
          <br />
          <button className="button is-link" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
          <div className="field">
            <label className="label" htmlFor="username">
              Username
            </label>
            <div
              className={cn('control has-icons-left', {
                'has-icons-right': hasUserNameError,
              })}
            >
              <input
                autoComplete="off"
                id="username"
                className={cn('input', {
                  'is-danger': hasUserNameError,
                })}
                type="text"
                placeholder="Username"
                value={userName}
                onChange={handleUserNameChange}
                onBlur={() => {
                  setHasUserNameError(!userName);
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>

              {hasUserNameError && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}

              {hasUserNameError && (
                <p className="help is-danger">This field must not be empty</p>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div
              className={cn('control has-icons-left', {
                'has-icons-right': hasPasswordError,
              })}
            >
              <input
                id="password"
                className={cn('input', {
                  'is-danger': hasPasswordError,
                })}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setHasPasswordError(!password)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>

              {hasPasswordError && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              )}

              {hasPasswordError && (
                <p className="help is-danger">This field must not be empty</p>
              )}
            </div>
          </div>

          {loginError && <p className="help is-danger">{loginError}</p>}
          <br />
          <div className="buttons">
            <button type="submit" className="button is-link">
              Sign in
            </button>
            <button type="reset" className="button is-link is-light">
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};
