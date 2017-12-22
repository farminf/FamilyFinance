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
        case 'SET_TRANSACTION':
            return {};
        default:
            return state;
    }
};