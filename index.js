// Your code here

let createEmployeeRecord = function(infoArray) {
  return {
    firstName: infoArray[0],
    familyName: infoArray[1],
    title: infoArray[2],
    payPerHour: infoArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeArray) {
  return employeeArray.map(function (employee) {
    return createEmployeeRecord(employee);
  })
}

let createTimeInEvent = function(employee, workDate) {
  let [date, hour] = workDate.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })
  return employee;
}

let createTimeOutEvent = function(employee, workDate) {
  let [date, hour] = workDate.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return employee;
}

let hoursWorkedOnDate = function(employee, workDay) {
  let inTime = employee.timeInEvents.find(function(e) {
    return e.date === workDay;
  })

  let outTime = employee.timeOutEvents.find(function(e) {
    return e.date === workDay;
  })
  let hoursWorked = outTime.hour - inTime.hour;
  return hoursWorked / 100;
}

let wagesEarnedOnDate = function(employee, workDay) {
  let hours = hoursWorkedOnDate(employee, workDay);
  return hours * employee.payPerHour
}

let allWagesFor = function(employee) {
  let workDays = employee.timeInEvents.map(function(e) {
    return e.date;
  })
  let toPayOut = workDays.reduce(function(amount, day) {
    return amount + wagesEarnedOnDate(employee, day)
  }, 0);
  return toPayOut;
}

let findEmployeeByFirstName = function(employeeRecords, firstName) {
  return employeeRecords.find(firstName => firstName);
}

let calculatePayroll = function(employeeArray) {
  return employeeArray.reduce(function(amount, employee) {
    return amount + allWagesFor(employee);
  }, 0)
}
