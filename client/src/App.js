import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './component/layout/Dashboard';
import Login from './component/auth/Login';
import AuthState from './context/auth/AuthState';
import InputState from './context/input/InputState';
import RecordState from './context/record/RecordState';
import EmployeeListState from './context/employeeList/EmployeeListState';
import PaymentCalenderState from './context/paymentCalender/PaymentCalenderState';
import PrivateRoute from './component/routing/PrivateRoute';

function App() {
  return (
    <AuthState>
      <EmployeeListState>
        <PaymentCalenderState>
          <RecordState>
            <InputState>
              <>
                <Router>
                  <Switch>
                    <PrivateRoute exact path='/' component={Dashboard} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </Router>
              </>
            </InputState>
          </RecordState>
        </PaymentCalenderState>
      </EmployeeListState>
    </AuthState>
  );
}

export default App;
