export default(transactions, {typeFilter, descriptionFilter}) => {
    if (transactions.lenght === 0 || transactions.hasOwnProperty(0) === false) {
        return {};
    } else {
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

}
