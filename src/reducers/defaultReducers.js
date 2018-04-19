const defaultCategories = [
  "Balance",
  "Bar",
  "Benzin",
  "Bill",
  "Car",
  "Clothing",
  "Charities",
  "Eating Out",
  "Electricity",
  "Gas",
  "Utilities",
  "Groceries",
  "Health and Beauty",
  "Hotel",
  "Housing",
  "Internet",
  "Loan",
  "Other",
  "Gifts",
  "Public Transport",
  "Rent",
  "Salary",
  "Tolls",
  "Train",
  "Travel",
  "Savings",
  "Entertainment",
  "Pet",
  "Phones",
  "Vacations"
];

export default (state = { categories: defaultCategories }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
