import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import PaymentCalenderContext from '../../context/paymentCalender/paymentCalenderContext';
import EmployeeListContext from '../../context/employeeList/employeeListContext';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 30,
    borderRadius: 25,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 400 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

// const arr = [0,1,2,3,4,5,6,7,8,9,10,11];
const arr = [
  {
    month: 'Jan',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Feb',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Mar',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Apr',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'May',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Jun',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Jly',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Aug',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Sep',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Oct',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Nov',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
  {
    month: 'Dec',
    bonus: 50,
    salary: 2000,
    payment: 2050,
  },
];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: '0px 0px 10px 0px #4b9bff9e',
  },
  month: {
    flex: '20%',
    margin: '5px 10px',
  },
  heading: {
    margin: 0,
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 1000,
    color: '#888',
  },
  amountList: {
    padding: '2px 1px',
  },
  cell: {
    height: '1rem',
    borderRadius: '25px',
    background: ' #ddd',
  },
  MuiLinearProgressBar: {
    borderRadius: '25px',
    height: '1rem',
  },
  listContainer: {
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px #4b9bff9e',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 2rem',
  },
  advance: {
    color: '#fafafa',
    background: '#00c300',
    padding: '2px 5px',
    borderRadius: '4px',
    fontWeight: '800',
  },
  due: {
    color: '#fafafa',
    background: '#ff5555',
    padding: '2px 5px',
    borderRadius: '4px',
    fontWeight: '800',
  },
  salary: {
    color: '#fff',
    background: '#ffc800',
    marginLeft: '6px',
    padding: '2px 5px',
    borderRadius: '4px',
    fontWeight: '800',
  },
  mobile: {
    color: '#fff',
    background: '#3f51b5',
    padding: '2px 5px',
    borderRadius: '4px',
    fontWeight: '800',
  },
});

export default function PaymentCalender(props) {
  const classes = useStyles();

  const [temp, setTemp] = useState(0);

  const paymentCalenderContext = useContext(PaymentCalenderContext);
  const employeeListContext = useContext(EmployeeListContext);
  const { payments, loadPayments, clearCalender } = paymentCalenderContext;
  const { currentEmp, setCurrentEmp } = employeeListContext;
  const { prevStatus, setPrevStatus } = props;
  const { advance, due, amount, mobile, employeeType, active } = prevStatus;

  useEffect(() => {
    return () => {
      clearCalender();
      setPrevStatus({
        advance: 0,
        due: 0,
        amount: 0,
        mobile: '-',
        employeeType: '-',
        active: '-',
      });
    };
  }, []);

  // useEffect(() => {
  //   if (currentEmp) {
  //     setPrevStatus({ advance, due, amount });
  //   }
  // }, [currentEmp]);

  // const onClick = () => {
  //   setTemp(-due + advance);
  //   setCurrentEmp({
  //     ...currentEmp,
  //     amount: amount - advance + due,
  //     advance: 0,
  //     due: 0,
  //   });
  // };

  return (
    <>
      <div className={classes.root}>
        {arr.map((ele, i) => (
          <div key={i} className={classes.month}>
            <p className={classes.heading}>{ele.month}</p>
            <BorderLinearProgress
              className={classes.cell}
              // classes={classes.MuiLinearProgressBar}
              variant='determinate'
              value={i * 10 - 10}
            />
          </div>
        ))}
      </div>
      <div className={classes.listContainer}>
        <div>
          <p className={classes.amountList}>
            adv: <span className={classes.advance}>{advance} ₹</span>
          </p>

          <p className={classes.amountList}>
            due: <span className={classes.due}>{due} ₹</span>
          </p>

          <p className={classes.amountList}>
            sal: <span className={classes.salary}>{amount} ₹</span>
          </p>
        </div>
        <div>
          {/* <Button
            variant='contained'
            color='primary'
            onClick={onClick}
            className={classes.btn}
          >
            Clear
          </Button> */}
          <p className={classes.amountList}>
            mobi: <span className={classes.mobile}>{mobile}</span>
          </p>
          <p className={classes.amountList}>
            basis: <span className={classes.mobile}>{employeeType}</span>
          </p>
          <p className={classes.amountList}>
            state:{' '}
            <span className={active ? classes.advance : classes.due}>
              {active === '-' ? active : active ? 'active' : 'deactive'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

/*
1. payment can be edited only one (most recent)deletion is not allowed (but we have delete route).
2. before any payment previours 'advance' or 'due' need to clear first (automatically added to salary while paying), then a payment can be made.
3. if current entry is wrong fix it immedietly.
4. Advance can not be greater than salary or corresponding employee.
5. IMP: editing old payments entries will loose the current 'advand/due' status of employee.
*/
