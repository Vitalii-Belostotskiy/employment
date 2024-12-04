import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { NewsListPage } from './components/pages/NewsListPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { PageNotFound } from './components/pages/PageNotFound';
import { LogInPage } from './components/pages/LogInPage';
import { RequireAuth } from './components/store/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsListPage />} />

          <Route path="profile" element={<RequireAuth />}>
            <Route index element={<ProfilePage />} />
          </Route>

          <Route path="login" element={<LogInPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
