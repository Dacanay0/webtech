var defaultValue = [];

fetch("employee.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    defaultValue = data;

    if (localStorage.getItem("employees") === null) {
      localStorage.setItem("employees", JSON.stringify(defaultValue));
    }

    displayEmployee();
  });

var placeholder = document.getElementById("data_output");

function displayEmployee() {

  var data = localStorage.getItem("employees");

  if (data === null) {
    return;
  }

  var employees = JSON.parse(data);

  placeholder.innerHTML = "";

  for (var i = 0; i < employees.length; i++) {

    var employee = employees[i];

    placeholder.innerHTML +=
      "<tr>" +
      "<td>" +
      employee.employeeID +
      "</td>" +
      "<td>" +
      employee.name +
      "</td>" +
      "<td>" +
      employee.position +
      "</td>" +
      "<td>" +
      employee.salary +
      "</td>" +
      "<td>" +
      "<button onclick='deleteEmployee(" +
      employee.id +
      ")'> Delete </button>" +
      "</td>" +
      "</tr>";
  }
}

/* GET EMPLOYEES */
function getEmployee() {

  var data = localStorage.getItem("employees");

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
}

/* ADD EMPLOYEE */
var addForm = document.querySelector("#add_form");

addForm.onsubmit = function () {

  var employeeID = document.getElementById("e_id").value;
  var name = document.getElementById("e_name").value;
  var position = document.getElementById("e_position").value;
  var salary = document.getElementById("e_salary").value;

  if (employeeID === "" || name === "" || position === "" || salary === "") {
    alert("fill in all the fields");
    return false;
  }

  var employees = getEmployee();

  var newID = 1;

  for (var i = 0; i < employees.length; i++) {

    if (employees[i].id >= newID) {
      newID = employees[i].id + 1;
    }
  }

  var newEmployee = {
    id: newID,
    employeeID: employeeID,
    name: name,
    position: position,
    salary: parseInt(salary),
  };

  employees.push(newEmployee);

  localStorage.setItem("employees", JSON.stringify(employees));

  displayEmployee();

  return false;
};

/* DELETE EMPLOYEE */
function deleteEmployee(id) {

  var confirmed = confirm("Are you sure you want to delete this employee?");

  if (!confirmed) return;

  var employees = getEmployee();

  var newEmployee = employees.filter(function (employee) {
    return employee.id !== id;
  });

  localStorage.setItem("employees", JSON.stringify(newEmployee));

  displayEmployee();
}