// app.js

// Monthly budget variable
let monthlyBudget = 0;

// Expenses array to store expense objects
let expenses = [];

// Get the budget form element
const budgetForm = document.getElementById("budgetForm");
// Get the expense form element
const expenseForm = document.getElementById("expenseForm");
// Get the expense table body element
const expenseTableBody = document.querySelector("#expenseTable tbody");
// Get the remaining budget span element
const remainingBudgetSpan = document.getElementById("remainingBudget");

// Function to handle the submission of the budget form
function addBudget(event) {
  event.preventDefault();
  // Get the budget input value
  const budgetInput = document.getElementById("budgetInput");
  // Validate the input
  if (budgetInput.value.trim() === "") {
    alert("Please enter a valid monthly budget.");
    return;
  }
  // Store the budget value
  monthlyBudget = parseFloat(budgetInput.value);
  // Clear the input field
  budgetInput.value = "";
  // Update the remaining budget display
  updateRemainingBudget();
}

// Function to handle the submission of the expense form
function addExpense(event) {
  event.preventDefault();
  // Get the expense input values
  const expenseDescription = document
    .getElementById("expenseDescription")
    .value.trim();
  const expenseAmount = parseFloat(
    document.getElementById("expenseAmount").value
  );
  const expenseDate = document.getElementById("expenseDate").value;
  // Validate the inputs
  if (expenseDescription === "" || isNaN(expenseAmount) || expenseDate === "") {
    alert("Please enter valid expense details.");
    return;
  }
  // Create an expense object
  const expense = {
    description: expenseDescription,
    amount: expenseAmount,
    date: expenseDate,
  };
  // Add the expense to the expenses array
  expenses.push(expense);
  // Clear the input fields
  document.getElementById("expenseDescription").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDate").value = "";
  // Update the expense table
  updateExpenseTable();
  // Update the remaining budget display
  updateRemainingBudget();
}

// Function to update the expense table
function updateExpenseTable() {
  // Clear the table body
  expenseTableBody.innerHTML = "";
  // Iterate over the expenses array
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    // Create a new table row
    const row = document.createElement("tr");
    // Create table cells for expense details
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = expense.description;
    const amountCell = document.createElement("td");
    amountCell.textContent = expense.amount;
    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date;
    // Append the cells to the row
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);
    // Append the row to the table body
    expenseTableBody.appendChild(row);
  }
}

// Function to update the remaining budget display
function updateRemainingBudget() {
  // Calculate the total expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  // Calculate the remaining budget
  const remainingBudget = monthlyBudget - totalExpenses;
  // Update the remaining budget display
  remainingBudgetSpan.textContent = remainingBudget.toFixed(2);
}

// Event listeners for form submissions
budgetForm.addEventListener("submit", addBudget);
expenseForm.addEventListener("submit", addExpense);
