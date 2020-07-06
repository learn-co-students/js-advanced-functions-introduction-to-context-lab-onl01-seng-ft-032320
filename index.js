// Your code here
function createEmployeeRecord(fourElmentArray){

    // Initialize an empty array to hold TimeInEvents
    let timeInEvents = [];
    let timeOutEvents = [];

    // create an empty object first 
    let record = {
        firstName: fourElmentArray[0],
        familyName: fourElmentArray[1],
        title: fourElmentArray[2],
        payPerHour: fourElmentArray[3],
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    };
    return record;
}



function createEmployeeRecords(arrayOfArrays){
    let arrayOfObjects = [];
    arrayOfArrays.forEach(record => {
      arrayOfObjects.push(createEmployeeRecord(record))  

    })
    return arrayOfObjects   
}

// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

// createEmployeeRecords(twoRows)


// sounds like the timeIn key holds an array of objects with type, hour and date as keys
function createTimeInEvent(recordObject, date){
    recordObject.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return recordObject
}

// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")


function createTimeOutEvent(recordObject, date){
    recordObject.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return recordObject
}



function hoursWorkedOnDate(recordObject, date){
    // need to find that date in the object 
    if(date === recordObject.timeInEvents[0].date && recordObject.timeOutEvents[0].date ){
         return (recordObject.timeOutEvents[0].hour - recordObject.timeInEvents[0].hour) / 100
        
    } else {
        return "no hours work for this day"
    }
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// hoursWorkedOnDate(cRecord, "0044-03-15")


function wagesEarnedOnDate(recordObject, date){
    // need to use hoursWorkedOnDate function the value from this multiply by the amount they make per hour will provide the answer
    let hoursWorked = hoursWorkedOnDate(recordObject, date);
    return (hoursWorked * recordObject.payPerHour)
}


function allWagesFor(recordObject){
    let allWages = 0;
    // need to be able to iterate based on how many records there is 
    recordObject.timeInEvents.forEach(timeInEvent => {
        allWages += wagesEarnedOnDate(recordObject, timeInEvent.date)
    })
    return allWages
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// 324 + 54

// allWagesFor(cRecord)



function findEmployeeByFirstName(arrayWithRecords, firstname){
    arrayWithRecords.forEach(record => {
        if (record.firstName === firstname){
            return record
        } else {
            return undefined
        }
    })
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]
  let emps = createEmployeeRecords(src)
  let loki = findEmployeeByFirstName(emps, "Loki")