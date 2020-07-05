// Your code here
function createEmployeeRecord(arr){
    let result = {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return result
  }

  function createEmployeeRecords(arr){
  
    let result = []
    for (let i = 0; i < arr.length; i++) {
      result.push(createEmployeeRecord(arr[i]))
    }
    return result
  }

  function createTimeInEvent(obj, dateStamp) {
    let dateArr = dateStamp.split(' ')
    let timeObj =  {
            type: "TimeIn",
            hour: parseInt(dateArr[1]),
            date: dateArr[0]
        } 
  
    obj.timeInEvents.push(timeObj)
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    let dateArr = dateStamp.split(' ')
    let timeObj =  {
            type: "TimeOut",
            hour: parseInt(dateArr[1]),
            date: dateArr[0]
        } 
  
    obj.timeOutEvents.push(timeObj)
    return obj
}

function hoursWorkedOnDate(obj, dateStamp){
    let employeeTimeIn = obj.timeInEvents.find(obj => obj.date === dateStamp)
    let employeeTimeOut = obj.timeOutEvents.find(obj => obj.date === dateStamp)
    if(employeeTimeIn && employeeTimeOut){
      let timeIn = employeeTimeIn.hour
      let timeOut = employeeTimeOut.hour
      return (timeOut - timeIn)/100
    } else {
      return "No matches"
    }
}

function wagesEarnedOnDate(obj, dateStamp){
    let wage = obj.payPerHour
    let hours = hoursWorkedOnDate(obj, dateStamp)
    return wage * hours
}

function allWagesFor(obj){
    let dates = []
    obj.timeInEvents.forEach(obj=> dates.push(obj['date']))
    return dates.map(date => wagesEarnedOnDate(obj,date)).reduce((total, wage)=> total+wage)
}

function findEmployeeByFirstName(array, firstName){
    return array.find(obj => obj.firstName === firstName)
  }

  function calculatePayroll(arr){
    return arr.map(emp => allWagesFor(emp)).reduce((total, wage) => total + wage)
}
