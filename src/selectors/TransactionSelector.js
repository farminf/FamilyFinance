import moment from 'moment';

export default(transactions, {typeFilter, descriptionFilter}) => {
    return transactions.filter((transaction) => {
        const textMatch = transaction
            .description
            .toLowerCase()
            .includes(descriptionFilter.toLowerCase());
        const typeMatch = transaction
            .type
            .toLowerCase()
            .includes(typeFilter.toLowerCase());

        return typeMatch && textMatch
    });

}
