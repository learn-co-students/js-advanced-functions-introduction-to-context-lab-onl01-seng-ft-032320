// using dot notation to assign attributes
function createEmployeeRecord(arr){
    const obj = {}
    obj.firstName = arr[0]
    obj.familyName = arr[1]
    obj.title = arr[2]
    obj.payPerHour = arr[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}

function createEmployeeRecords(arr){
    return arr.map(createEmployeeRecord)
}

// using key/value to assign attributes
function createTimeInEvent(obj, dateStamp){
    const newObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    obj.timeInEvents.push(newObj)
    return obj
}

function createTimeOutEvent(obj, dateStamp){
    const newObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    obj.timeOutEvents.push(newObj)
    return obj
}

function hoursWorkedOnDate(obj, date){
    let start = obj.timeInEvents.find(e => e.date === date)
    let end = obj.timeOutEvents.find(e => e.date === date)
    
    const hoursWorked = (end.hour - start.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
}

function allWagesFor(obj) {
    let dateArr = obj.timeInEvents.map(function(e) {
        return e.date
    })
    let pay = dateArr.reduce(function(wage, date) {
        return wage + wagesEarnedOnDate(obj, date)
    }, 0)
    return pay
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(arr) {
    return arr.reduce(function(wage, obj) {
        return wage + allWagesFor(obj)
    }, 0)
}
