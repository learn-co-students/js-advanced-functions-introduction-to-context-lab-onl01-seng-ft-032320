// Your code here
let employees = []
function createEmployeeRecord(testSubject) {
    const employee = {
        firstName: testSubject[0],
        familyName: testSubject[1],
        title: testSubject[2],
        payPerHour: testSubject[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(testSubject){
    //1. run each index in the array through createEmployeeRecord()
    //2. save to employees array
    employees = testSubject.map(x => createEmployeeRecord(x));
    return employees
}

function createTimeInEvent(employeeObject, timeStampIn){
    let timeObject = {}
    //let timeIn = "TimeIn"
    timeObject.type = "TimeIn"
    timeObject.hour = parseInt(timeStampIn.slice(11, 13))*100
    timeObject.date = timeStampIn.slice(0, 10)
    employeeObject.timeInEvents.push(timeObject)
      //1.sets the following object into the timeInEvents Array
      // {type: TimeIn,
              //hour: 800,
  //            date: YYYY-MM-DD       
            //}
      //2. returns employee record
      return employeeObject
  }
  
    function createTimeOutEvent(employeeObject, timeStampOut){
      let timeObject = {}
      timeObject.type = "TimeOut"
      timeObject.hour = parseInt(timeStampOut.slice(11, 13))*100
      timeObject.date = timeStampOut.slice(0, 10)
      employeeObject.timeOutEvents.push(timeObject)
        //1.sets the following object into the timeInEvents Array
        // {type: TimeIn,
          //hour: 800,
          // date: YYYY-MM-DD       
          //}
        //2. returns employee record
        return employeeObject
    }

  
  function hoursWorkedOnDate(employeeObject, timeStamp){
    
        let timeInResult = employeeObject.timeInEvents.find( ({ date }) => date === timeStamp );
        let timeOutResult = employeeObject.timeOutEvents.find( ({ date }) => date === timeStamp );
        let hoursWorked = (timeOutResult.hour - timeInResult.hour)/100
        return hoursWorked
  }



  function wagesEarnedOnDate(employeeObject, stamp){
    let hours = hoursWorkedOnDate(employeeObject, stamp)
    let rate = employeeObject.payPerHour
    let dailyPay = (hours * rate)
    return dailyPay
    //1. use hoursWorkedOnDate
    //2. multiply hours by payrate
    //returns pay owed as a number
  }


  function allWagesFor(employeeObject2){
    let datesWorked = []
    let wages = []
    employeeObject2.timeInEvents.map(function ({date}) {
        datesWorked.push(date)
    });

    datesWorked.map(function(index){
      wages.push(wagesEarnedOnDate(employeeObject2, index))
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalWages = wages.reduce(reducer)
    return totalWages
  }

function calculatePayroll(employees){
    let totalPayroll = []
    employees.map(function(index){
        totalPayroll.push(allWagesFor(index))
    })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let payroll = totalPayroll.reduce(reducer)
    return payroll
}

 function findEmployeeByFirstName(employees, data){
    //createEmployeeRecords(testSubject);
   let employee = employees.find( ({ firstName }) => firstName === data );
   return employee
   }