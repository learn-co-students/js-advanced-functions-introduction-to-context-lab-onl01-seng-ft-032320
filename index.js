function createEmployeeRecord(srcArr) {
    let employee = {
        firstName: srcArr[0],
        familyName: srcArr[1],
        title: srcArr[2],
        payPerHour: srcArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(src) {
    return src.map(createEmployeeRecord)
}

function createTimeInEvent(obj, dateStamp) { 
    let timeIn = {
        type: "TimeIn",
        hour: Number(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    obj.timeInEvents.push(timeIn)
    return obj
}

function createTimeOutEvent(obj, dateStamp) { 
    let timeOut = {
        type: "TimeOut",
        hour: Number(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    obj.timeOutEvents.push(timeOut)
    return obj
}

function hoursWorkedOnDate(obj, formDate) {
    let start = obj.timeInEvents.find(e => e.date === formDate).hour
    let end = obj.timeOutEvents.find(e => e.date === formDate).hour
    let hoursWorked = ((end - start) / 100)
    return hoursWorked
}

function wagesEarnedOnDate(obj, formDate) {
    return hoursWorkedOnDate(obj, formDate) * obj.payPerHour
}

function allWagesFor(obj) {
    let eligibleDates = obj.timeInEvents.map(function(e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, formDate) {
        return memo + wagesEarnedOnDate(obj, formDate)
    }, 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(srcArr) {
    return srcArr.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}


