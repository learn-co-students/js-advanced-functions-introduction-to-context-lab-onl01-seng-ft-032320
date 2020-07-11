function createEmployeeRecord(arr) {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employees) {
    return employees.map(function(e) { return createEmployeeRecord(e) } )
}

function createTimeInEvent(emp,dateTime) {
    let timeIn = {
        type: "TimeIn",
        date: dateTime.split( ' ' )[0],
        hour: parseInt(dateTime.split( ' ' )[1])
    }
    emp.timeInEvents.push(timeIn)
    return emp
}

function createTimeOutEvent(emp,dateTime) {
    let timeOut = {
        type: "TimeOut",
        date: dateTime.split( ' ' )[0],
        hour: parseInt(dateTime.split( ' ' )[1])
    }
    emp.timeOutEvents.push(timeOut)
    return emp
}

function hoursWorkedOnDate(emp, date) {
    let eventOnDate = function(event) { return event.date === date },
        inTime = emp.timeInEvents.find(eventOnDate).hour,
        outTime = emp.timeOutEvents.find(eventOnDate).hour;
    return (outTime - inTime) / 100
}

function wagesEarnedOnDate(emp, date) {
    return hoursWorkedOnDate(emp, date) * emp.payPerHour
}

function allWagesFor(emp) {
    const reducer = (wageTotal, event) => {
        return wageTotal + wagesEarnedOnDate(emp, event.date)
    }
    return emp.timeInEvents.reduce(reducer, 0)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(emp => {
        return emp.firstName === name
    });
}

function calculatePayroll(employees) {
    const reducer = (wagesTotal, emp) => {
        return wagesTotal + allWagesFor(emp)
    }
    return employees.reduce(reducer, 0)
}
