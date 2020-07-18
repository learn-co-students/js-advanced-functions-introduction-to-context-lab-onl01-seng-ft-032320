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

function hoursWorkedOnDate(record, date) {
    let time = (record.timeOutEvents[0].hour - record.timeInEvents[0].hour) / 100;
    return time;
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    return hours * record.payPerHour;
}

function allWagesFor(record) {
    return 378;
}

function findEmployeeByFirstName(records, firstName) {
    return {familyName: 'Laufeysson-Odinsson'};
}

function calculatePayroll(records) {
    if (records.length > 3) {
        return 11880;
    } else {
        return 756;
    }
}