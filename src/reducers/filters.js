import moment from 'moment';

// Filters Reducer
// Default Filters which are coming at start of the app
const filtersReducerDefaultState = {
  typeFilter: '',
  descriptionFilter: '',
  accountFilter: '',
  categoryFilter:'',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default(state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TRANSACTION_TYPE_FILTER':
      return {
        ...state,
        typeFilter: action.typeFilter
      };
    case 'SET_TRANSACTION_DESCRIPTION_FILTER':
      return {
        ...state,
        descriptionFilter: action.descriptionFilter
      };
    case 'SET_TRANSACTION_ACCOUNT_FILTER':
      return {
        ...state,
        accountFilter: action.accountFilter
      };
    case 'SET_TRANSACTION_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.categoryFilter
      };
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    case 'SET_DASHBOARD_MONTH':
      return {
        ...state,
        dashboardMonthFilter: action.dashboardMonthFilter
      };
      case 'SET_DASHBOARD_YEAR':
      return {
        ...state,
        dashboardYearFilter: action.dashboardYearFilter
      };
    default:
      return state;
  }
};
