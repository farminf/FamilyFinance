import database from '../firebase/firebase'
import moment from 'moment';
import _ from 'lodash';
import {addError} from './errors';
//{storage}

export const addTransaction = (transaction) => ({type: 'ADD_TRANSACTION', transaction});

export const startAddTransaction = (transactionData = {}) => {

    return (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        const {
            type = '',
            amount = 0,
            description = '',
            account = '',
            category = '',
            date = ''
        } = transactionData;
        const transaction = {
            type,
            amount,
            description,
            account,
            category,
            date
        };

        return database
            .ref(`users/${user_uid}/transactions`)
            .push(transaction, (err) => {
                if (err !== null) {
                    console.log(err)
                    return null
                }
            })
            .then((ref) => {
                dispatch(addTransaction({
                    id: ref.key,
                    ...transaction
                }));
            }, (error) => {
                console.error("error: " + error);
                dispatch(addError({code: error.code,message:error.message}))
            });
    }

}

export const setTransactions = (transactions) => ({type: 'SET_TRANSACTIONS', transactions});

export const startSetTransactions = (fromMoment = moment().startOf('month').valueOf(), toMoment = moment().valueOf()) => {

    return (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        return database
            .ref(`users/${user_uid}/transactions`)
            .orderByChild('date')
            .startAt(fromMoment)
            .endAt(toMoment)
            .once('value')
            .then((snapshot) => {
                const transactions = [];
                snapshot.forEach((childSnapshot) => {
                    transactions.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                });
                dispatch(setTransactions(_.orderBy(transactions, ['date'], ['desc'])));
            }, (error) => {
                console.error(error);
                dispatch(addError({code: error.code,message:error.message}))

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
            }, (error) => {
                console.error(error);
            });
    }
};

export const editTransaction = (id, updates) => ({type: 'UPDATE_TRANSACTION', id, updates});

export const startEditTransaction = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/transactions/${id}`)
            .update(updates, (err) => {
                console.log(err)
            })
            .then(() => {
                dispatch(editTransaction(id, updates));
            });
    };
};