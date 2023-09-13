// Initialize total expense
let totalExpense = 0;

// Function to update the total expense display
function updateTotalExpense() {
  document.getElementById("total-expense").textContent =
    "Total Expense: $" + totalExpense.toFixed(2);
}

// Function to add a new expense
function addExpense() {
  let expenseName = document.getElementById("expense-name").value;
  let expenseAmount = parseFloat(
    document.getElementById("expense-amount").value
  );

  // Check if the expenseName is empty or expenseAmount is 0
  if (expenseName === "" || isNaN(expenseAmount) || expenseAmount === 0) {
    alert("Please enter both a valid expense name and a non-zero amount.");
    return;
  }

  let expenseItem = document.createElement("li");
  expenseItem.className = "expense-item";

  let expenseInfo = document.createElement("span");
  expenseInfo.textContent = expenseName + ": $" + expenseAmount.toFixed(2);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.className = "expense-buttons";

  let deleteButton = document.createElement("span");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", function () {
    // Subtract the deleted expense from the total
    totalExpense -= expenseAmount;
    updateTotalExpense();

    expenseItem.remove();
  });

  let editButton = document.createElement("span");
  editButton.className = "edit-btn";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    editExpense(expenseItem, expenseName, expenseAmount);
  });

  buttonsDiv.appendChild(deleteButton);
  buttonsDiv.appendChild(editButton);

  expenseItem.appendChild(expenseInfo);
  expenseItem.appendChild(buttonsDiv);

  document.getElementById("expense-list").appendChild(expenseItem);

  // Update the total expense
  totalExpense += expenseAmount;
  updateTotalExpense();

  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";
}

// Function to edit an existing expense
function editExpense(expenseItem, expenseName, expenseAmount) {
  let newName = prompt("Enter new expense name:", expenseName);
  let newAmount = parseFloat(
    prompt("Enter new expense amount:", expenseAmount)
  );

  // Check if the user didn't cancel and entered valid values
  if (newName !== null && !isNaN(newAmount) && newAmount !== 0) {
    // Subtract the old expense from the total
    totalExpense -= expenseAmount;

    // Update the expense details
    expenseName = newName;
    expenseAmount = newAmount;
    expenseItem.querySelector("span").textContent =
      expenseName + ": $" + expenseAmount.toFixed(2);

    // Add the updated expense back to the total
    totalExpense += expenseAmount;
    updateTotalExpense();
  }
}

// Add event listener to the "Add Expense" button
document.getElementById("add-expense").addEventListener("click", addExpense);

// Load expenses from local storage on page load
window.addEventListener("load", function () {
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.forEach(function (expense) {
    var expenseItem = document.createElement("li");
    expenseItem.className = "expense-item";

    var expenseInfo = document.createElement("span");
    expenseInfo.textContent = expense.name + ": $" + expense.amount.toFixed(2);

    var buttonsDiv = document.createElement("div");
    buttonsDiv.className = "expense-buttons";

    var deleteButton = document.createElement("span");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", function () {
      // Subtract the deleted expense from the total
      totalExpense -= expense.amount;
      updateTotalExpense();

      expenseItem.remove();
    });

    var editButton = document.createElement("span");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editExpense(expenseItem, expense.name, expense.amount);
    });

    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(editButton);

    expenseItem.appendChild(expenseInfo);
    expenseItem.appendChild(buttonsDiv);

    document.getElementById("expense-list").appendChild(expenseItem);

    // Update the total expense
    totalExpense += expense.amount;
    updateTotalExpense();
  });
});
