export default(state = {}, action) => {
    switch (action.type) {
        case 'ADD_ACCOUNTS':
            return [
                ...state,
                action.account
            ];
        case 'UPDATE_ACCOUNTS':
            return {};
        case 'DELETE_ACCOUNTS':
            return {};
        case 'SET_ACCOUNTS':
            return action.accounts;
        default:
            return state;
    }
};