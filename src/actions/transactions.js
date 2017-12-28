import database from '../firebase/firebase'

export const addTransaction = (transaction) => ({type: 'ADD_TRANSACTION', transaction});

export const startAddTransaction = (transactionData = {}) => {

    return (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        const {
            amount = 0,
            description = '',
            account = '',
            date = ''
        } = transactionData;
        const transaction = {
            amount,
            description,
            account,
            date
        };

        return database
            .ref(`users/${user_uid}/transactions`)
            .push(transaction)
            .then((ref) => {
                dispatch(addTransaction({
                    id: ref.key,
                    ...transaction
                }));
            });
    }

}

export const setTransactions = (transactions) => ({type: 'SET_TRANSACTIONS', transactions});

export const startSetTransactions = () => {

    return (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        return database
            .ref(`users/${user_uid}/transactions`)
            .once('value')
            .then((snapshot) => {
                const transactions = [];
                snapshot.forEach((childSnapshot) => {
                    transactions.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                });
                dispatch(setTransactions(transactions));
            });
    };
};

export const deleteTransaction = ({id} = {}) => ({type: 'DELETE_TRANSACTION', id});

export const startDeleteTransaction = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/transactions/${id}`)
            .remove()
            .then(() => {
                dispatch(deleteTransaction({id}));
            });
    }
};

export const editTransaction = (id, updates) => ({type: 'UPDATE_TRANSACTION', id, updates});

export const startEditTransaction = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/transactions/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editTransaction(id, updates));
            });
    };
};