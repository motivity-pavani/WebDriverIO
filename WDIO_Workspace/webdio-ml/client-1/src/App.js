// import logo from './logo.svg';
// import './App.css'
// import Demo from './demo';
// import LoginTab from './LoginTab'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from 'react-redux';
import { applicationStore } from './store';
import { ToastProvider } from 'react-toast-notifications';
import { LoaderProvider } from './Context/LoaderContext';
import Login from './Pages/Login';
import AuthenticatedRoute from './common/AuthenticatedRoute';
import Header from './Pages/Header';
import Dashboard from './Pages/Dashboard';
import TestCaseCreate from './Pages/TestCase/TestCaseCreate';
// import ActionsCreate from './Pages/Actions/ActionsCreate';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import ActionsList from "./Pages/ActionsList/ActionsList";
import Groups from './Pages/Groups';
import SelectedTestCases from './Pages/SelectedTestCases';
import TestCases from "./Pages/TestCase/TestCases";
import User from "./Pages/User";
import Actions from "./Pages/Actions"
import Profile from "./Pages/Profile"


function App() {
  return (
    <Provider store={applicationStore}>
      <LoaderProvider>
        <ToastProvider autoDismiss={true}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/login"></Redirect>
                </Route>
                <Route path="/login" render={() => (
                  <Login />
                )} />
                <AuthenticatedRoute path="/testcase" render={() => (
                  <Header>
                    <TestCases />
                  </Header>
                )} />
                <AuthenticatedRoute path="/action" render={() => (
                  <Header>
                    <Actions />
                  </Header>
                )} />
                {/* <AuthenticatedRoute path="/actionslist" render={() => (
                  <Header>
                    <ActionsList />
                  </Header>
                )} /> */}
                <AuthenticatedRoute path="/TestSuites" render={() => (
                  <Header>
                    <Groups />
                  </Header>
                )} />
                <AuthenticatedRoute path="/selecttestcases" render={() => (
                  <Header>
                    <SelectedTestCases />
                  </Header>
                )} />
                <AuthenticatedRoute path="/User" render={() => (
                  <Header>
                    <User />
                  </Header>
                )} />
                <AuthenticatedRoute path="/Profile" render={() => (
                  <Header>
                    <Profile />
                  </Header>
                )} />

              </Switch>
            </Router>
          </LocalizationProvider>
        </ToastProvider>
      </LoaderProvider>
    </Provider >
  );
}

export default App;
