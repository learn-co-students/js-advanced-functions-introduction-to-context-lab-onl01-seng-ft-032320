// Your code here

// Assume that employees always check-in and check-out.
// Assume employees always check-in and out on the hour

// The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world

// When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300"

// Employees will never work across days i.e. in at 2200 and out at 0400 the next day.


let createEmployeeRecord = (array) => {
   const [firstName, familyName, title, payPerHour] = array
   let employee = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
   }
   return employee
}

let createEmployeeRecords = (arrays) => {
   let records = arrays.map (arr => {
      return createEmployeeRecord(arr)
   })
   return records
}

let createTimeInEvent = (employee, date) => {
   let hourFromDate = date.split(" ")[1]
   let dateFromDate = date.split(" ")[0]
   let timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hourFromDate),
      date: dateFromDate
   }

   employee.timeInEvents.push(timeInEvent)
   
   return employee
}

let createTimeOutEvent = (employee, date) => {
   let hourFromDate = date.split(" ")[1]
   let dateFromDate = date.split(" ")[0]
   let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hourFromDate),
      date: dateFromDate
   }

   employee.timeOutEvents.push(timeOutEvent)
   
   return employee
}

let hoursWorkedOnDate = (employee, date) => {
   let dayIn = employee.timeInEvents.find(event => event.date === date.split(" ")[0])
   let dayOut = employee.timeOutEvents.find(event => event.date === date.split(" ")[0])
   return (dayOut.hour - dayIn.hour) / 100
}
let wagesEarnedOnDate = (employee, date) => {
   return hoursWorkedOnDate(employee,date) * employee.payPerHour
}

let allWagesFor = (employee) => {
   let timeIns = employee.timeInEvents
   let totalWages = timeIns.map(worked => {
      return wagesEarnedOnDate(employee, worked.date)
   })
   return totalWages.reduce((wageForDay, curr) => {
      return curr += wageForDay
   }, 0)
}

let findEmployeeByFirstName = (employees, name) => {
   return employees.find(employee => employee.firstName === name)
}

let calculatePayroll = (employees) => {
   let wages = employees.map(employee => {
      return allWagesFor(employee)
   })
   return wages.reduce((wagesForEmployee,curr) => {
      return curr += wagesForEmployee
   })
}