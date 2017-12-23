import database from '../firebase/firebase'

export const addAccount = (account) => ({type: 'ADD_ACCOUNTS', account});

export const startAddAccount = (accountData = {}) => {

    return (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        const {
            name = 'default',
            balance = 0
        } = accountData;
        const account = {
            name,
            balance
        };

        return database
            .ref(`users/${user_uid}/accounts`)
            .push(account)
            .then((ref) => {
                dispatch(addAccount({
                    id: ref.key,
                    ...account
                }));
            });
    }

}