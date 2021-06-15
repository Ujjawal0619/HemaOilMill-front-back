import React, { useState, useContext, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RecordContext from '../../context/record/recordContext';
import InputContext from '../../context/input/inputContext';
import PaymentCalenderContext from '../../context/paymentCalender/paymentCalenderContext';
import EmployeeListContext from '../../context/employeeList/employeeListContext';
import Button from '@material-ui/core/Button';

const FetchRecord = () => {
  const recordContext = useContext(RecordContext);
  const inputContext = useContext(InputContext);
  const paymentCalenderContext = useContext(PaymentCalenderContext);
  const {
    records,
    getRecords,
    loadInputForm,
    deleteRecord,
    trigger,
    setPaymentToRecord,
  } = recordContext;
  const employeeListContext = useContext(EmployeeListContext);
  const { type } = inputContext;
  const { employeeId, payments, loadPayments, deletePayment } =
    paymentCalenderContext;
  const { currentImp } = employeeListContext;

  useEffect(() => {
    if (type === 'payments') {
      if (payments) setPaymentToRecord(payments);
    } else {
      getRecords(type);
    }
  }, [type, trigger, payments]);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3f51b5',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles(() => ({
    dataBox: {
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#fff',
      color: '#999',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    tableContainer: {},
    table: {
      width: '100%',
    },
    noDues: {
      color: '#02a802',
      background: '#009e0038',
      borderRadius: '10px',
    },
    dues: {
      color: 'red',
      background: '#ff00002e',
      borderRadius: '10px',
    },
    btn: {
      marginLeft: '1rem',
      marginTop: '1rem',
    },
    expense: {
      color: '#fff',
      background: '#ff0000',
      padding: '2px 5px',
      borderRadius: '5px',
    },
  }));

  const classes = useStyles();

  let head = null;
  if (records) {
    head = records[0];
  }

  const formateDate = (date) => {
    const options = {
      weekday: undefined,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    let dt = new Date(date);

    //return dt.toLocaleDateString("en-US"); // 9/17/2016
    return dt.toLocaleDateString('en-US', options); // Saturday, September 17, 2016
    // return dt.toLocaleDateString('hi-IN', options); // शनिवार, 17 सितंबर 2016
    // return dt.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
  };

  const update = (e) => {
    loadInputForm(e.currentTarget.value); // populate input
  };

  const onDelete = (e) => {
    if (type === 'payments') {
      deletePayment(e.currentTarget.value);
    } else {
      deleteRecord(type, e.currentTarget.value);
    }
    e.disable = true;
  };

  return (
    <div className={classes.dataBox}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label='customized table'>
          <caption>
            {records
              ? `last ${records.length} records.`
              : 'no data in this field'}
          </caption>
          {head ? (
            <>
              <TableHead>
                <TableRow>
                  {head.date && <StyledTableCell>Date</StyledTableCell>}
                  {head.name && <StyledTableCell>Name</StyledTableCell>}
                  {head.mobile && <StyledTableCell>Mobile</StyledTableCell>}
                  {head.quantity !== undefined && (
                    <StyledTableCell>Quantity</StyledTableCell>
                  )}
                  {head.rate !== undefined && (
                    <StyledTableCell>Rate</StyledTableCell>
                  )}
                  {head.transport !== undefined && (
                    <StyledTableCell>Trans</StyledTableCell>
                  )}
                  {head.container && (
                    <StyledTableCell>Container</StyledTableCell>
                  )}
                  {head.expenseType && <StyledTableCell>Type</StyledTableCell>}
                  {head.salary !== undefined && (
                    <StyledTableCell>Salary</StyledTableCell>
                  )}
                  {head.amount !== undefined && (
                    <StyledTableCell>Amount</StyledTableCell>
                  )}
                  {head.total !== undefined && (
                    <StyledTableCell> Total</StyledTableCell>
                  )}
                  {head.paid !== undefined && (
                    <StyledTableCell> Paid</StyledTableCell>
                  )}
                  {head.advance !== undefined && (
                    <StyledTableCell> Adv</StyledTableCell>
                  )}
                  {head.due !== undefined && (
                    <StyledTableCell> Due</StyledTableCell>
                  )}
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {records &&
                  records.map((obj, index) => (
                    <StyledTableRow key={obj._id}>
                      {obj.date && (
                        <StyledTableCell>
                          {' '}
                          {formateDate(obj.date)}
                        </StyledTableCell>
                      )}
                      {obj.name && (
                        <StyledTableCell> {obj.name}</StyledTableCell>
                      )}
                      {obj.mobile && (
                        <StyledTableCell> {obj.mobile}</StyledTableCell>
                      )}
                      {obj.quantity !== undefined && (
                        <StyledTableCell> {obj.quantity}</StyledTableCell>
                      )}
                      {obj.rate !== undefined && (
                        <StyledTableCell> {obj.rate}</StyledTableCell>
                      )}
                      {obj.transport !== undefined && (
                        <StyledTableCell> {obj.transport}</StyledTableCell>
                      )}
                      {type === 'containers' && (
                        <StyledTableCell>
                          {obj.container.type && obj.container.type}
                        </StyledTableCell>
                      )}
                      {type === 'oil' && (
                        <StyledTableCell>
                          {obj.container.count &&
                            `5(${obj.container.count.five}) 10(${obj.container.count.ten}) 15(${obj.container.count.fifteen})`}
                        </StyledTableCell>
                      )}
                      {obj.expenseType && (
                        <StyledTableCell>{obj.expenseType}</StyledTableCell>
                      )}
                      {obj.salary !== undefined && (
                        <StyledTableCell>{obj.salary}</StyledTableCell>
                      )}
                      {obj.amount !== undefined && (
                        <StyledTableCell>{obj.amount}</StyledTableCell>
                      )}
                      {obj.paid !== undefined && (
                        <StyledTableCell>{obj.paid}</StyledTableCell>
                      )}
                      {obj.advance !== undefined && (
                        <StyledTableCell>{obj.advance}</StyledTableCell>
                      )}
                      {obj.due !== undefined && (
                        <StyledTableCell>
                          <span className={obj.due > 0 ? classes.expense : ''}>
                            {obj.due}
                          </span>
                        </StyledTableCell>
                      )}
                      {((type === 'payments' && index === 0) ||
                        (type !== 'payments' && type !== 'transactions')) && (
                        <StyledTableCell align='center'>
                          <Button
                            value={obj._id}
                            variant='contained'
                            onClick={update}
                            className={classes.btn}
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                      )}
                      {type !== 'payments' && type !== 'transactions' && (
                        <StyledTableCell align='center'>
                          <Button
                            variant='contained'
                            color='secondary'
                            value={obj._id}
                            onClick={onDelete}
                            className={classes.btn}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </>
          ) : (
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>No Data To Show!</StyledTableCell>
              </StyledTableRow>
            </TableHead>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default FetchRecord;
