export default(state = {}, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return [
                ...state,
                action.transaction
            ];
        case 'UPDATE_TRANSACTION':
            return {};
        case 'DELETE_TRANSACTION':
            return {};
        case 'SET_TRANSACTIONS':
            return action.transactions;
        default:
            return state;
    }
};