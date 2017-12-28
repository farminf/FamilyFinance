export default(state = {}, action) => {
    switch (action.type) {
        case 'ADD_ACCOUNTS':
            return [
                ...state,
                action.account
            ];
        case 'UPDATE_ACCOUNTS':
            return state.map((account) => {
                if (account.id === action.id) {
                    return {
                        ...account,
                        ...action.updates
                    };
                } else {
                    return account;
                }
            });
        case 'DELETE_ACCOUNTS':
            return state.filter(({id}) => id !== action.id);
        case 'SET_ACCOUNTS':
            return action.accounts;
        default:
            return state;
    }
};