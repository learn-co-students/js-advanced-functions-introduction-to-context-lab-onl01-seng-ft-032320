// const createEmployeeRecord = (array) => {
//   const [ firstName, familyName, title, payPerHour ] = array;
//   return { firstName, familyName, title, payPerHour, timeInEvents: [], timeOutEvents: [] };
// }

function createEmployeeRecord(array) {
  const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };

  return employee;
}

function createEmployeeRecords(array) {
  // map through the array and create employee records with the function created above.
  return array.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  // ["YYYY-MM-DD", "HHMM"]
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

  let startTime = employee.timeInEvents.find((e) => {
    return e.date === date; //
  });

  let endTime = employee.timeOutEvents.find((e) => {
    return e.date === date;
  });
  return (endTime.hour - startTime.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let numberOfHours = hoursWorkedOnDate(employee, date);
  return numberOfHours * employee.payPerHour;
}

function allWagesFor(employee) {
  let datesWorked = employee.timeInEvents.map((e) => {
    return e.date;
  });
  let wages = datesWorked.reduce((wage, date) => {
    return wage + wagesEarnedOnDate(employee, date);
  }, 0);

  return wages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((e) => {
    return e.firstName === firstName;
  });
}

function calculatePayroll(employees) {
  // iterate over all employees
  // for each employee return their total pay/salary. do i have a function for that already? if not sum all that
  let payroll = employees.reduce((wage, employee) => {
    // sum every employees total salary/pay as the total payroll
    return wage + allWagesFor(employee);
  }, 0);

  // return the sum/payroll
  return payroll;
}
