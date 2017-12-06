const headerReducerDefaultState = [];

const headerReducer  = (state = headerReducerDefaultState , action ) => {

    switch(action.type){
        case 'SHOW_LOGOUT_BUTTON':
            return {
                ...state,
                "isLogoutButton" : action.isLogoutButton
            };
        default:
            return state;
    }
};

export default headerReducer;