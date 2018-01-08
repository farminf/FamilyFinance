export default(state = {}, action) => {
    switch (action.type) {
        case 'ADD_ACCOUNTS':
            return [
                ...state,
                action.account
            ];
        case 'UPDATE_ACCOUNTS':
            return state.map((account) => {
                if (account.name === action.name) {
                    return {
                        ...account,
                        ...action.updates
                    };
                } else {
                    return account;
                }
            });
        case 'UPDATE_ACCOUNT_AMOUNT':
        return state.map((account) => {
            if (account.name === action.name) {
                return {
                    ...account,
                    ...action.updates
                };
            } else {
                return account;
            }
        }); 
        case 'DELETE_ACCOUNTS':
            return state.filter(({name}) => name !== action.name);
        case 'SET_ACCOUNTS':
            return action.accounts;
        default:
            return state;
    }
};