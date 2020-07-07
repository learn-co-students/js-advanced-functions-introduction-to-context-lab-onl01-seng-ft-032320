// Your code here
function createEmployeeRecord(info) {
    return {firstName: info[0], familyName: info[1], title: info[2], payPerHour: info[3], timeInEvents: [], timeOutEvents: []}
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, event) {
    let hour = parseInt(event.split(" ")[1],10)
    let date = event.split(" ")[0]
    let timeIn = {type: "TimeIn", hour: hour, date: date}
    
    employee.timeInEvents.push(timeIn)
    return employee
}

function createTimeOutEvent(employee, event) {
    let hour = parseInt(event.split(" ")[1],10)
    let date = event.split(" ")[0]
    let timeOut= {type: "TimeOut", hour: hour, date: date}
    
    employee.timeOutEvents.push(timeOut)
    return employee
}

function hoursWorkedOnDate(employee, eventDate) {
    let timeIn = employee.timeInEvents.find(shift => shift.date === eventDate).hour
    let timeOut = employee.timeOutEvents.find(shift => shift.date === eventDate).hour
    return ((timeOut - timeIn)/100)
}

function wagesEarnedOnDate(employee, eventDate) {
    return (hoursWorkedOnDate(employee,eventDate) * employee.payPerHour)
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, shift) => (total + wagesEarnedOnDate(employee, shift.date)),0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
    return employees.reduce((total,employee) => (total + allWagesFor(employee)),0)
}