import Base from './components/Base.jsx';
import App from './components/App.jsx'
import LoginPage from './containers/LoginPage.jsx'


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: App
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/register',
      component: App
    },

  ]
};

export default routes;