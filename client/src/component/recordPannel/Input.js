import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputContext from '../../context/input/inputContext';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ContainerInput from './inputs/ContainerInput';
import PaymentCalender from '../layout/PaymentCalender';
import EmployeesList from './inputs/EmployeesList';
import EmployeeListContext from '../../context/employeeList/employeeListContext';
import RecordContext from '../../context/record/recordContext';
import PaymentCalenderContex from '../../context/paymentCalender/paymentCalenderContext';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const Input = () => {
  const emptyState = {
    type: null,
    name: null,
    mobile: null,
    quantity: null,
    rate: null,
    transport: null,
    address: null,
    desc: null,
    container: {
      type: '',
      count: {
        ten: 0,
        five: 0,
        fifteen: 0,
      },
    },
    transactionType: 'buy',
    employee: null,
    employeeType: 'daily',
    active: true,
    amount: null,
    expenseType: '',
    advance: null,
    paid: null,
    due: null,
  };

  const containers = [
    {
      value: null,
      label: '',
    },
    {
      value: '5 ltr',
      label: '5 ltr',
    },
    {
      value: '10 ltr',
      label: '10 ltr',
    },
    {
      value: '15 ltr',
      label: '15 ltr',
    },
    {
      value: '15 ltr recycle',
      label: '15 ltr recycle',
    },
  ];

  const initContainer = {
    type: '',
    count: {
      ten: 0,
      five: 0,
      fifteen: 0,
    },
  };

  const expenses = [
    {
      value: null,
      label: '',
    },
    {
      value: 'Electric Bill',
      label: 'Electric Bill',
    },
    {
      value: 'Bag',
      label: 'Bag',
    },
    {
      value: 'Machinary',
      label: 'Machinary',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  const initCalender = {
    advance: 0,
    due: 0,
    amount: 0,
    mobile: '-',
    employeeType: '-',
    active: '-',
  };

  const validationData = {
    name: {
      isValid: true,
      errorMsg: '',
    },
    mobile: {
      isValid: true,
      errorMsg: '',
    },
    quantity: {
      isValid: true,
      errorMsg: '',
    },
    quintal: {
      isValid: true,
      errorMsg: '',
    },
    rate: {
      isValid: true,
      errorMsg: '',
    },
    transport: {
      isValid: true,
      errorMsg: '',
    },
    amount: {
      isValid: true,
      errorMsg: '',
    },
    paid: {
      isValid: true,
      errorMsg: '',
    },
    container: {
      isValid: true,
      errorMsg: '',
    },
    expenseType: {
      isValid: true,
      errorMsg: '',
    },
    advance: {
      isValid: true,
      errorMsg: '',
    },
    clearPrev: {
      isValid: true,
      errorMsg: '',
    },
    all: {
      isValid: true,
      errorMsg: '',
    },
  };

  const [container, setContainer] = useState(initContainer);

  const [formData, setFormData] = useState(emptyState);

  const [weight, setWeight] = useState({
    kg: '',
    qtl: '',
  });
  const [calender, setCalender] = useState(initCalender);

  const [validate, setValidte] = useState(validationData);

  const [disableSave, setDisableSave] = useState();

  const inputContext = useContext(InputContext);
  const recordContext = useContext(RecordContext);
  const paymentCalenderContex = useContext(PaymentCalenderContex);
  const employeeListContext = useContext(EmployeeListContext);

  const { type, postInput, updateInput } = inputContext;
  const { loadInput, clearLoadInput, records, clearRecords } = recordContext;
  const { postPayment, updatePayment, clearCalender, employeeId } =
    paymentCalenderContex;
  const { currentEmp, loadEmployees, setEmp } = employeeListContext;

  useEffect(() => {
    if (loadInput) {
      if (type === 'oil') {
        const box = loadInput.container.count;
        loadInput.amount =
          loadInput.amount - (box.five + box.ten + box.fifteen);
      }
      setWeight({
        kg: parseFloat(loadInput.quantity) % 100,
        qtl: Math.floor(parseFloat(loadInput.quantity) / 100),
      });
      setContainer({ ...container, ...loadInput.container }); // object type is needed

      setFormData(loadInput);
    } else {
      setWeight({
        kg: '',
        qtl: '',
      });
      setContainer(initContainer);
      setFormData({ ...formData, ['type']: type });
    }
    setValidte(validationData);
  }, [type, loadInput, records]);

  useEffect(() => {
    const {
      name,
      mobile,
      quantity,
      rate,
      transport,
      amount,
      paid,
      expenseType,
      container,
      clearPrev,
    } = validate;
    setDisableSave(
      !(
        name.isValid &&
        mobile.isValid &&
        quantity.isValid &&
        rate.isValid &&
        transport.isValid &&
        amount.isValid &&
        paid.isValid &&
        expenseType.isValid &&
        container.isValid &&
        clearPrev.isValid
      )
    );
  }, [validate]);

  useEffect(() => {
    setDisableSave(true);
  }, [type]);

  useEffect(() => {
    setFormData({
      ...formData,
      ['container']: container,
    });
  }, [container]);

  useEffect(() => {
    if (employeeId) setEmp(employeeId);
    if (currentEmp) {
      setCalender(currentEmp);
      setFormData({
        ...formData,
        ['amount']: currentEmp.amount + currentEmp.due - currentEmp.advance,
      });
    }
  }, [currentEmp, employeeId]);

  const onChange = (e) => {
    if (e.target.name === 'quintal' || e.target.name === 'quantity') {
      const kg = document.getElementsByName('quantity')[0].value;
      const qtl = document.getElementsByName('quintal')[0]?.value;
      setWeight({ ...weight, kg, qtl });
      setFormData({
        ...formData,
        ['quantity']:
          parseFloat(kg ? parseFloat(kg) : 0) +
          parseFloat(qtl ? parseFloat(qtl) : 0) * 100,
      });
    } else if (e.target.name === 'container') {
      setContainer({ ...container, ['type']: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    checkValidation(e.target.name, e.target.value);
  };

  const checkValidation = (field, value) => {
    switch (field) {
      case 'name':
        const nameRegex = /^[a-zA-Z ]{2,50}$/gm; ///^[a-zA-Z]+([\sa-zA-Z])*[a-zA-Z]+$/gm
        if (value.match(nameRegex)) {
          setValidte({
            ...validate,
            ['name']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['name']: {
              isValid: false,
              errorMsg: 'please enter a valid name',
            },
          });
        }
        break;
      case 'mobile':
        const mobileRegex = /^\d{10}$/;
        if (value.match(mobileRegex)) {
          setValidte({
            ...validate,
            ['mobile']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['mobile']: {
              isValid: false,
              errorMsg: 'mobile number need to be 10 digits',
            },
          });
        }
        break;
      case 'quantity':
        const quantityRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positiv decimal number
        if (value.match(quantityRegex)) {
          setValidte({
            ...validate,
            ['quantity']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['quantity']: {
              isValid: false,
              errorMsg: 'please fill valid value',
            },
          });
        }
        break;
      case 'quintal':
        const quintalRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positive decimal number
        if (value.match(quintalRegex)) {
          setValidte({
            ...validate,
            ['quintal']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['quintal']: {
              isValid: false,
              errorMsg: 'please fill valid value',
            },
          });
        }
        break;
      case 'rate':
        const rateRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positive decimal number
        if (value.match(rateRegex)) {
          setValidte({
            ...validate,
            ['rate']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['rate']: {
              isValid: false,
              errorMsg: 'please fill valid rate',
            },
          });
        }
        break;
      case 'transport':
        const transportRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positive decimal number
        if (value.match(transportRegex)) {
          setValidte({
            ...validate,
            ['transport']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['transport']: {
              isValid: false,
              errorMsg: 'please fill valid transport charge',
            },
          });
        }
        break;
      case 'amount':
        const amountRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positive decimal number
        if (value.match(amountRegex)) {
          setValidte({
            ...validate,
            ['amount']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['amount']: {
              isValid: false,
              errorMsg: 'please fill valid amount charge',
            },
          });
        }
        break;
      case 'paid':
        const paidRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positive decimal number
        if (
          value.match(paidRegex) &&
          parseFloat(value) <= parseFloat(formData.amount)
        ) {
          setValidte({
            ...validate,
            ['paid']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['paid']: {
              isValid: false,
              errorMsg: 'price should be less or equal to total amount',
            },
          });
        }
        break;
      case 'container':
        {
          setValidte({
            ...validate,
            ['container']: { isValid: true, errorMsg: '' },
          });
        }
        break;
      case 'expenseType':
        {
          setValidte({
            ...validate,
            ['expenseType']: { isValid: true, errorMsg: '' },
          });
        }
        break;
      case 'advance':
        const advanceRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/; // positive decimal number
        if (value.match(advanceRegex) && value <= currentEmp.amount) {
          setValidte({
            ...validate,
            ['advance']: { isValid: true, errorMsg: '' },
          });
        } else {
          setValidte({
            ...validate,
            ['advance']: {
              isValid: false,
              errorMsg: 'advance should not exceed salary',
            },
          });
        }
        break;
      default:
        console.log(field, 'not match to validate');
    }
    if (!validate.all.isValid) {
      setValidte({ ...validate, ['all']: { isValid: true, errorMsg: '' } });
    }
  };

  const isValid = (type) => {
    switch (type) {
      case 'mustard':
        return (
          formData.name &&
          formData.mobile &&
          formData.quantity &&
          formData.rate &&
          formData.transport &&
          formData.amount &&
          formData.paid &&
          formData.due
        );
      case 'oil':
        return (
          formData.name &&
          formData.mobile &&
          formData.quantity &&
          formData.rate &&
          formData.transport &&
          formData.amount &&
          formData.paid &&
          formData.due
        );
      case 'containers':
        return (
          formData.name &&
          formData.mobile &&
          formData.quantity &&
          formData.rate &&
          formData.transport &&
          (formData.container.type != '' || formData.container.count != null) &&
          formData.amount &&
          formData.paid &&
          formData.due
        );
      case 'employees':
        return formData.name && formData.mobile;
      case 'payments':
        return (
          formData.amount >= 0 &&
          formData.advance &&
          formData.paid &&
          formData.due &&
          formData.amount ===
            currentEmp.amount - currentEmp.advance + currentEmp.due
        );
      case 'cake':
        return (
          formData.name &&
          formData.mobile &&
          formData.quantity &&
          formData.rate &&
          formData.transport &&
          formData.amount &&
          formData.paid &&
          formData.due
        );
      case 'other':
        return formData.amount && formData.expenseType;
      default: {
        console.warn(type, 'not match on submit for validation');
        return false;
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid(type)) {
      // setDisableSave(true);
      if (type === 'containers' && formData.container.type === '') {
        setValidte({
          ...validate,
          ['container']: {
            isValid: false,
            errorMsg: 'container type is empty',
          },
        });
      } else if (type === 'other' && formData.expenseType === '') {
        setValidte({
          ...validate,
          ['expenseType']: {
            isValid: false,
            errorMsg: 'expanse type is empty',
          },
        });
      } else {
        setValidte({
          ...validate,
          ['all']: { isValid: false, errorMsg: 'some fields are empty' },
        });
      }
      console.log(type, ' validation on Submit');
      return;
    }
    if (loadInput) {
      if (type === 'payments') updatePayment(formData);
      else updateInput(formData, type);
    } else {
      if (type === 'payments') postPayment(formData);
      else postInput(formData, type);
    }
    clearAll();
  };

  const clearAll = () => {
    setValidte(validationData);
    clearRecords();
    clearLoadInput();
    setWeight({
      kg: '',
      qtl: '',
    });
    setContainer(initContainer);
    if (type === 'payments') {
      if (currentEmp) {
        loadEmployees();
      } else {
        setCalender(initCalender);
      }
    }
    setFormData(emptyState);
  };

  const updateContainer = (box) => {
    setContainer({
      ...container,
      ['count']: box,
    });
  };

  const isValidNumber = (value) => {
    // return 0 if false else number itself
    return typeof parseFloat(value) === 'number' &&
      Number.isNaN(parseFloat(value)) === false
      ? parseFloat(value)
      : 0;
  };

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    dataBox: {
      // minWidth: '23rem',
      borderRadius: '8px',
      padding: '15px 15px 1rem 15px',
      backgroundColor: '#fff',
      color: '#999',
      boxShadow:
        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    inputField: {
      marginTop: '1rem',
    },
    btnContainer: {
      overflow: 'hidden',
    },
    btn: {
      float: 'right',
      marginLeft: '1rem',
      marginTop: '1rem',
    },
    radioContainer: {
      display: 'inline',
      marginLeft: '8px',
    },
    radio: {
      padding: '13px 0',
      margin: '0',
    },
  }));

  const classes = useStyles();

  // Main Input Components
  return (
    <div className={classes.dataBox}>
      <form noValidate autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            {/* name */}
            {[
              'mustard',
              'oil',
              'containers',
              'employees',
              'cake',
              'dues',
            ].includes(type) && (
              <TextField
                fullWidth
                error={!validate.name.isValid}
                helperText={validate.name.errorMsg}
                onChange={onChange}
                className={classes.inputField}
                id='outlined-error-helper-text'
                value={formData.name ? formData.name : ''}
                label='Name'
                name='name'
                type='text'
                variant='outlined'
              />
            )}

            {/* mobile */}
            {[
              'mustard',
              'oil',
              'containers',
              'cake',
              'dues',
              'employees',
            ].includes(type) && (
              <TextField
                fullWidth
                error={!validate.mobile.isValid}
                helperText={validate.mobile.errorMsg}
                onChange={onChange}
                className={classes.inputField}
                id='outlined-error-helper-number'
                value={formData.mobile ? formData.mobile : ''}
                label='Phone'
                name='mobile'
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            )}

            {/* Payment Calender */}
            {['payments'].includes(type) && (
              <PaymentCalender
                prevStatus={calender}
                setPrevStatus={setCalender}
              />
            )}

            {/* quantity validation validation*/}
            {['mustard', 'oil', 'cake', 'containers'].includes(type) && (
              <FormControl
                fullWidth
                // className={clsx(classes.inputField)}
                variant='outlined'
              >
                <FormHelperText id='outlined-weight-helper-text'>
                  {type !== 'containers' ? 'Weight(kg)' : 'Quantity'}
                </FormHelperText>
                <OutlinedInput
                  error={!validate.quantity.isValid}
                  id='outlined-error-helper-adornment-weight'
                  onChange={onChange}
                  value={weight.kg}
                  name='quantity'
                  endAdornment={
                    <InputAdornment position='end'>kg</InputAdornment>
                  }
                  aria-describedby='outlined-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  labelWidth={0}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.quantity.errorMsg}
                </FormHelperText>
              </FormControl>
            )}

            {['mustard', 'cake'].includes(type) && (
              <FormControl
                fullWidth
                // className={clsx(classes.inputField)}
                variant='outlined'
              >
                <FormHelperText id='outlined-weight-helper-text'>
                  Weight(Quintal)
                </FormHelperText>
                <OutlinedInput
                  error={!validate.quintal.isValid}
                  id='outlined-error-helper-adornment-weight'
                  onChange={onChange}
                  value={weight.qtl}
                  name='quintal'
                  endAdornment={
                    <InputAdornment position='end'>q</InputAdornment>
                  }
                  aria-describedby='outlined-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  labelWidth={0}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.quintal.errorMsg}
                </FormHelperText>
              </FormControl>
            )}

            {/* expenseType */}
            {['other'].includes(type) && (
              <TextField
                fullWidth
                className={classes.inputField}
                id='outlined-select-currency-native'
                select
                label='Expense Type'
                value={formData.expenseType}
                name='expenseType'
                onChange={onChange}
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
              >
                {expenses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* Employees List */}
            {['payments'].includes(type) && <EmployeesList />}

            {/* rate validation */}
            {['mustard', 'oil', 'containers', 'cake'].includes(type) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Rate
                </InputLabel>
                <OutlinedInput
                  error={!validate.rate.isValid}
                  // need ERROR Text
                  id='outlined-error-helper-adornment-amount'
                  value={formData.rate ? formData.rate : ''}
                  onChange={onChange}
                  name='rate'
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={34}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.rate.errorMsg}
                </FormHelperText>
              </FormControl>
            )}

            {/* transport validation */}
            {['mustard', 'oil', 'containers', 'cake'].includes(type) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Transport Charge
                </InputLabel>
                <OutlinedInput
                  error={!validate.transport.isValid}
                  id='outlined-error-helper-adornment-amount'
                  value={formData.transport ? formData.transport : ''}
                  onChange={onChange}
                  name='transport'
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={130}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.transport.errorMsg}
                </FormHelperText>
              </FormControl>
            )}

            {/* address */}
            {['mustard', 'oil', 'containers', 'employees', 'cake'].includes(
              type
            ) && (
              <TextField
                fullWidth
                onChange={onChange}
                className={classes.inputField}
                id='outlined-multiline-static'
                label='Address'
                name='address'
                value={formData.address ? formData.address : ''}
                multiline
                rows={1}
                defaultValue=''
                variant='outlined'
              />
            )}

            {/* container  */}
            {['containers'].includes(type) && (
              <TextField
                fullWidth
                onChange={onChange}
                name='container'
                className={classes.inputField}
                id='outlined-select-currency-native'
                select
                label='Container Type'
                value={container.type}
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
              >
                {containers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            )}

            {['oil'].includes(type) && (
              <ContainerInput
                trigger={updateContainer}
                count={container.count}
              />
            )}

            {/* amount */}
            {['mustard', 'oil', 'containers', 'cake', 'dues'].includes(
              type
            ) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Total Amount
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  value={parseFloat(
                    (formData.amount =
                      (isValidNumber(formData.quantity) +
                        isValidNumber(container.count.fifteen) * 15 +
                        isValidNumber(container.count.ten) * 10 +
                        isValidNumber(container.count.five) * 5) *
                        isValidNumber(formData.rate) +
                      isValidNumber(formData.transport))
                  ).toFixed(2)}
                  readOnly
                  name='amount'
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={90}
                />
              </FormControl>
            )}

            {/* custome amount  */}
            {['other', 'employees', 'payments'].includes(type) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  {type === 'employees' || type === 'payments'
                    ? 'Salary'
                    : 'Amount'}
                </InputLabel>
                <OutlinedInput
                  error={!validate.amount.isValid}
                  id='outlined-adornment-amount'
                  value={formData.amount ? formData.amount : ''}
                  onChange={onChange}
                  name='amount'
                  readOnly={type === 'payments' ? true : false}
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={50}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.amount.errorMsg}
                </FormHelperText>
              </FormControl>
            )}

            {/* Advance payment */}
            {['payments'].includes(type) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  {'Advance'}
                </InputLabel>
                <OutlinedInput
                  error={!validate.advance.isValid}
                  id='outlined-adornment-advance'
                  value={formData.advance ? formData.advance : ''}
                  onChange={onChange}
                  name='advance'
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={60}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.advance.errorMsg}
                </FormHelperText>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* payed  vaidation */}
            {['mustard', 'oil', 'containers', 'payments', 'cake'].includes(
              type
            ) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Paid Amount
                </InputLabel>
                <OutlinedInput
                  error={!validate.paid.isValid}
                  // nedd ERROR Text
                  id='outlined-error-helper-adornment-amount'
                  value={formData.paid ? formData.paid : ''}
                  name='paid'
                  onChange={onChange}
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={90}
                />
                <FormHelperText error id='outlined-weight-helper-text'>
                  {validate.paid.errorMsg}
                </FormHelperText>
              </FormControl>
            )}

            {/* duse */}
            {['mustard', 'oil', 'containers', 'payments', 'cake'].includes(
              type
            ) && (
              <FormControl
                fullWidth
                className={classes.inputField}
                variant='outlined'
              >
                <InputLabel htmlFor='outlined-adornment-amount'>
                  Due Amount
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  value={
                    (formData.due = (
                      isValidNumber(formData.amount) -
                      isValidNumber(formData.paid)
                    ).toFixed(2))
                  }
                  name='due'
                  readOnly
                  startAdornment={
                    <InputAdornment position='start'>&#8377;</InputAdornment>
                  }
                  labelWidth={85}
                />
              </FormControl>
            )}

            {/* desc */}
            {[
              'mustard',
              'oil',
              'containers',
              'employees',
              'payments',
              'cake',
              'other',
              'dues',
            ].includes(type) && (
              <TextField
                fullWidth
                onChange={onChange}
                name='desc'
                value={formData.desc ? formData.desc : ''}
                className={classes.inputField}
                id='outlined-multiline-static'
                label='Description'
                multiline
                rows={2}
                defaultValue=''
                variant='outlined'
              />
            )}

            {/* error msg on submit */}
            <FormHelperText error id='outlined-weight-helper-text'>
              {!validate.container.isValid ? validate.container.errorMsg : ''}
              {!validate.expenseType.isValid
                ? validate.expenseType.errorMsg
                : ''}
              {!validate.all.isValid ? validate.all.errorMsg : ''}
              {!validate.clearPrev.isValid ? validate.clearPrev.errorMsg : ''}
            </FormHelperText>

            {/* buy or sell */}
            <div className={classes.btnContainer}>
              {['mustard', 'oil'].includes(type) && (
                <RadioGroup
                  className={classes.radioContainer}
                  row
                  onChange={onChange}
                  aria-label='position'
                  name='transactionType'
                  // defaultValue={'buy'}
                  value={formData.transactionType}
                >
                  <FormControlLabel
                    className={classes.radio}
                    value='buy'
                    control={<Radio color='primary' />}
                    label='Buy'
                  />
                  <FormControlLabel
                    className={classes.radio}
                    value='sell'
                    control={<Radio color='primary' />}
                    label='Sell'
                  />
                </RadioGroup>
              )}

              {/* employee active & deactive */}
              {['employees'].includes(type) && (
                <RadioGroup
                  className={classes.radioContainer}
                  row
                  onChange={onChange}
                  aria-label='position'
                  name='active'
                  // defaultValue={'buy'}
                  value={
                    formData.active == 'true' || formData.active === true
                      ? true
                      : false
                  }
                >
                  <FormControlLabel
                    className={classes.radio}
                    value={true}
                    control={<Radio color='primary' />}
                    label='Active'
                  />
                  <FormControlLabel
                    className={classes.radio}
                    value={false}
                    control={<Radio />}
                    label='Deactive'
                  />
                </RadioGroup>
              )}

              {/* employee type daily or monthly */}
              {['employees'].includes(type) && (
                <RadioGroup
                  className={classes.radioContainer}
                  row
                  onChange={onChange}
                  aria-label='position'
                  name='employeeType'
                  value={formData.employeeType}
                >
                  <FormControlLabel
                    className={classes.radio}
                    value={'daily'}
                    control={<Radio color='primary' />}
                    label='Daily'
                  />
                  <FormControlLabel
                    className={classes.radio}
                    value={'monthly'}
                    control={<Radio color='primary' />}
                    label='Monthly'
                  />
                </RadioGroup>
              )}

              {/* Button */}
              <Button
                variant='contained'
                onClick={clearAll}
                className={classes.btn}
              >
                Reset
              </Button>
              <Button
                disabled={disableSave}
                variant='contained'
                color='primary'
                onClick={onSubmit}
                className={classes.btn}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Input;
