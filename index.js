// Your code here

function createEmployeeRecord(array=[string,string2,string3,num]){

  return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
         
  
}

function createEmployeeRecords(arrays){

    let record = arrays.map(array =>{
      
        return createEmployeeRecord(array)
    })
  
    return record
    
}

function createTimeInEvent(record, d){

    
    let h = d.split(" ").splice(0,1).join("")
    let year = d.split(" ").splice(1).join("")
    let y = parseInt(year)
    let obj = {type: "TimeIn", hour: y, date: h}
    record.timeInEvents.push(obj)
  
    return record
}

function createTimeOutEvent(record, d){

    let h = d.split(" ").splice(0,1).join("")
    let year = d.split(" ").splice(1).join("")
    let y = parseInt(year)
    let obj = {type: "TimeOut", hour: y, date: h}
    record.timeOutEvents.push(obj)
  
    return record

}

function hoursWorkedOnDate(record, formDate){

   
    let inTime = record.timeInEvents.find(e =>{
        if(e.date === formDate){
          return e
        }
     
     })
 
     let outTime = record.timeOutEvents.find(e =>{
        if(e.date === formDate){
          return e
        }
     
     })
 
   
 
    let hours = (outTime.hour - inTime.hour) / 100  
    
   
 
   return hours
 
   
 
 }

 function wagesEarnedOnDate(record, formDate){
    let hours = hoursWorkedOnDate(record, formDate)

    let pay = record.payPerHour
  
      return (pay * hours)

 }
 
 function allWagesFor(record){

    let dates = record.timeInEvents.map(x =>
        x.date)
    
    
    
       let result = dates.reduce(function(sum, date){
            
           return sum + wagesEarnedOnDate(record, date)
        },0)
    
        return result
 }


 function findEmployeeByFirstName(srcc,firstName){
     
    let employs = srcc

    return employs.find(function(emp) {
      return emp.firstName === firstName
    })
    
 }

 function calculatePayroll(employees){
    let all = employees.reduce(function(sum, emp){
        return sum + allWagesFor(emp)
   
      },0)
   
      return all
 }