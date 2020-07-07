// Your code here
 let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeArrInfo) {
    return employeeArrInfo.map(function(arr) {
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

let hoursWorkedOnDate = function(obj, dateYMD) {
    const timeIn = obj.timeInEvents.find((e) => e.date ===dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date ===dateYMD).hour
    return (timeOut - timeIn)/100
}

let wagesEarnedOnDate = function(obj, dateYMD) {
    const wage = obj.payPerHour 
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}