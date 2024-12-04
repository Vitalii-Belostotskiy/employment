import { Link, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import './App.scss';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import newsImage from './logo/news.png';

export const App: React.FC = () => {
  const linkIsActive = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'is-active': isActive });

  const isAuthorized = useSelector<RootState>(state => state.auth.authorized);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brend">
          <Link to="/" className="navbar-item">
            <img src={newsImage} alt="NewsLogo" className="logo" />
          </Link>
          <NavLink to="/" className={linkIsActive}>
            Home
          </NavLink>
          <NavLink to="/news" className={linkIsActive}>
            News
          </NavLink>
          <NavLink to="/profile" className={linkIsActive}>
            Profile
          </NavLink>

          <NavLink to="/login" className={linkIsActive}>
            {!isAuthorized ? <p>Login</p> : <p>Log out</p>}
          </NavLink>
        </div>
      </nav>

      <div className="section">
        <Outlet />
      </div>
    </>
  );
};
