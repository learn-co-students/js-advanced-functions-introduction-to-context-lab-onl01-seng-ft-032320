// Your code here
let createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (records) => {
    return records.map(employee => createEmployeeRecord(employee));
}

let createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee;
}

let createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee;
}

let hoursWorkedOnDate = (employee, soughtDate) => {
    let inEvent = employee.timeInEvents.find(date => date.date === soughtDate);
    let outEvent = employee.timeOutEvents.find(date => date.date === soughtDate);

    return (outEvent.hour - inEvent.hour) / 100    
}

let wagesEarnedOnDate = (employee, soughtDate) => {
    return hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour;
}

let allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map(date => date.date);
    
    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable;
}

let calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(rec => rec.firstName === firstName);
}