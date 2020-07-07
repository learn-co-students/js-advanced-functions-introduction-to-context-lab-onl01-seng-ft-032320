// Your code here

let  createEmployeeRecord = function(ray) {
    return {
        firstName: ray[0],
        familyName: ray[1],
        title: ray[2],
        payPerHour: ray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(ray) {
        return createEmployeeRecord(ray)
    })
}

let createTimeInEvent = function(employee, stamp) {
    let date = stamp.split(' ')[0]
    let hour = stamp.split(' ')[1]

    employee.timeInEvents.push(
        {
            type: 'TimeIn',
            hour: parseInt(hour, 10),
            date
        }
    )
    return employee
}

let createTimeOutEvent = function(employee, stamp) {
    let [date, hour] = stamp.split(' ')

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10), 
        date
    })
    return employee
}

let hoursWorkedOnDate = function(record, date) {
    let inEvent = record.timeInEvents.find(function(event) {
        return event.date === date
    })

    let outEvent = record.timeOutEvents.find(function(event) {
        return event.date === date
    })

    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(record, date) {
    let wage = hoursWorkedOnDate(record, date) * record.payPerHour
    return wage
}

let allWagesFor = function(record) {
    let allDates = record.timeInEvents.map(function(event) {
        return event.date
    })

    let payment = allDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(record, date)
    }, 0)
    
    return payment
}

let findEmployeeByFirstName = function(ray, firstName) {
    return ray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(ray){
    return ray.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
