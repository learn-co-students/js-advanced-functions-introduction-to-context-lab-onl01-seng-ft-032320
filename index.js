// Your code here

new_array = ("famel")

function createEmployeeRecord(array) {
    let timeInEvents = [];
    let timeOutEvents = [];
    let object = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    };
    return object;
}

function createEmployeeRecords(arrays) {

    let objects = arrays.map(array => createEmployeeRecord(array));
    return objects;

}

function createTimeInEvent(record, date) {
    let date_object = {
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
    }
    record.timeInEvents.push(date_object);
    return record;
}

function createTimeOutEvent(record, date) {
    let date_object = {
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
    }
    record.timeOutEvents.push(date_object);
    return record;
}

function hoursWorkedOnDate(employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate (employee, dateSought) {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}