// Create a single employee record from an array of data
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create a function for multiple employee records from an array of multiple records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

//create a fuction that adds a time in event to an employee's record
function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// create a function that adds a time out event to an employee's record
function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Create a fucntion tht calculates hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, soughtDate) {
    let inEvent = employeeRecord.timeInEvents.find(e => e.date === soughtDate);
    let outEvent = employeeRecord.timeOutEvents.find(e => e.date === soughtDate);
    return (outEvent.hour - inEvent.hour) / 100;
}

// create a fuction that calculates wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}


function allWagesFor(employeeRecord) {
    let eligibleDates = employeeRecord.timeInEvents.map(e => e.date);
    return eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(employeeRecord, d), 0);
}

// Calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0);
}

