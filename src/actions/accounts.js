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

export const setAccounts = (accounts) => ({type: 'SET_ACCOUNTS', accounts})

export const startSetAccounts = () => {
    return (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        return database
            .ref(`users/${user_uid}/accounts`)
            .once('value')
            .then((snapshot) => {
                const accounts = [];
                snapshot.forEach((childSnapshot) => {
                    accounts.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                });
                dispatch(setAccounts(accounts));
            });
    };
};

export const deleteAccount = ({id} = {}) => ({

    type: 'DELETE_ACCOUNTS',
    id
});

export const startDeleteAccount = ({id} = {}) => {
    return (dispatch , getState) =>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/accounts/${id}`).remove().then(() => {
          dispatch(deleteAccount({ id }));
        });
    }
};

