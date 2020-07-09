//arr = [firstName, familyName, title, payRate]

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

//arrofArr [["moe", "sizlak", "barkeep", 2], ["bartholomew", "simpson", "scamp", 3]]
//Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(n => createEmployeeRecord(n));
}

//Add an Object with keys to the timeInEvents Array on the record Object:
//type: Set to "TimeIn"
//hour: Derived from the argument
//date: Derived from the argument
//timeInEvents: [type: "TimeIn", hour: dateStamp, date: dateStamp]
function createTimeInEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return record;
}

//record:
//firstName: arr[0],
//familyName: arr[1],
//title: arr[2],
//payPerHour: arr[3],
//timeInEvents: [type: "TimeIn", hour: 0800, date: DDMMYYYY], [type: "TimeIn", hour: 0800, date: DDMMYYYY]
//timeOutEvents: [type: "TimeOut", hour: 0800, date: DDMMYYYY], [type: "TimeOut", hour: 0800, date: DDMMYYYY]

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(function(e) {
        return e.date === date;
    })
    let timeOut = record.timeOutEvents.find(function(e) {
        return e.date === date;
    })
    let hoursWorked = timeOut.hour - timeIn.hour;
    return hoursWorked / 100;
}

function wagesEarnedOnDate(record, date) {
    let wagesEarned = hoursWorkedOnDate(record, date) * record.payPerHour;
    return wagesEarned;
}

//record:
//firstName: arr[0],
//familyName: arr[1],
//title: arr[2],
//payPerHour: arr[3],
//timeInEvents: [type: "TimeIn", hour: 0800, date: DDMMYYYY], [type: "TimeIn", hour: 0800, date: DDMMYYYY]
//timeOutEvents: [type: "TimeOut", hour: 0800, date: DDMMYYYY], [type: "TimeOut", hour: 0800, date: DDMMYYYY]
//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
function allWagesFor(record){
    let dates = record.timeInEvents.map(function(e) {
        return e.date;
    })
    let totalWages = dates.reduce(function(amount, date) {
        return amount + wagesEarnedOnDate(record, date)
    }, 0);
    return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    let name = srcArray.find(element => element = firstName);
    return name;
}

function calculatePayroll(arr) {
    return arr.reduce(function(amount, employee) {
        return amount + allWagesFor(employee);
    }, 0)
}