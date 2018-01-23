// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({type: 'SET_TEXT_FILTER', text});

// SORT_BY_DATE
export const sortByDate = () => ({type: 'SORT_BY_DATE'});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({type: 'SORT_BY_AMOUNT'});

// SET_START_DATE
export const setStartDate = (startDate) => ({type: 'SET_START_DATE', startDate});

// SET_END_DATE
export const setEndDate = (endDate) => ({type: 'SET_END_DATE', endDate});

// SET_TRANSACTION_TYPE_FILTER
export const setTypeFilter = (typeFilter) => ({type: 'SET_TRANSACTION_TYPE_FILTER', typeFilter});

// SET_TRANSACTION_TYPE_DESCRIPTION
export const setDescriptionFilter = (descriptionFilter) => ({type: 'SET_TRANSACTION_DESCRIPTION_FILTER', descriptionFilter});

// SET_DASHBOARD_MONTH
export const setDashboardMonthFilter = (dashboardMonthFilter) => ({type: 'SET_DASHBOARD_MONTH', dashboardMonthFilter});

//SET_DASHBOARD_YEAR
export const setDashboardYearFilter = (dashboardYearFilter) => ({type: 'SET_DASHBOARD_YEAR', dashboardYearFilter});




