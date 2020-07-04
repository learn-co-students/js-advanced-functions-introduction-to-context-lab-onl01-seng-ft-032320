// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    let array = []
    arr.map(el => array.push(createEmployeeRecord(el)))
    return array
}

function createTimeInEvent(obj, date) {
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
    })
    return obj
}

function createTimeOutEvent(obj, date) {
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
    })

    return obj
}

function hoursWorkedOnDate(obj, date) {
    let inEvent = obj.timeInEvents.find(function(e) {
        return e.date === date
    })

    let outEvent = obj.timeOutEvents.find(function(e) {
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(obj, date) {
    let wage = hoursWorkedOnDate(obj, date) * obj.payPerHour
    return parseInt(wage)
}

function allWagesFor(obj) {
    let dates = obj.timeInEvents.map(e => e.date)
        // let wages = []
        // dates.forEach(d => {
        //     wages.push(wagesEarnedOnDate(obj, d))
        // })
        // return wages.reduce((a, b) => a + b)
    let wages = dates.reduce((total, d) => {
        return total + wagesEarnedOnDate(obj, d)
    }, 0)
    return wages
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(e => {
        return e.firstName === name
    })
}

function calculatePayroll(arr) {
    console.log(arr)
    return arr.reduce((a, b) => {
        return a + allWagesFor(b)
    }, 0)
}