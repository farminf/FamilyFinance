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