import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EmployeeListContext from '../../../context/employeeList/employeeListContext';
import PaymentCalenderContext from '../../../context/paymentCalender/paymentCalenderContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '1rem',
    width: '100%',
  },
}));

export default function EmployeesList() {
  const classes = useStyles();

  const employeeListContext = useContext(EmployeeListContext);
  const paymentCalenderContext = useContext(PaymentCalenderContext);
  const { employees, setEmp, loadEmployees } = employeeListContext;
  const { payments, loadPayments } = paymentCalenderContext;

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    if (e.target.value) {
      loadPayments(e.target.value);
      setEmp(e.target.value);
    }
    // setId(e.target.value);
  };

  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>
          Employees
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          onChange={handleChange}
          label='Employees'
        >
          <MenuItem value=''>Select Employee</MenuItem>
          {employees?.map((emp) => (
            <MenuItem value={emp._id} key={emp._id}>
              {emp.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
