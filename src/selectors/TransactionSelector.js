export default(transactions, {typeFilter, descriptionFilter , accountFilter , categoryFilter}) => {
    if (transactions.lenght === 0 || transactions.hasOwnProperty(0) === false) {
        return {};
    } else {
        return transactions.filter((transaction) => {
            const textMatch = transaction
                .description
                .toLowerCase()
                .includes(descriptionFilter.toLowerCase());
            const accountMatch = transaction
                .account
                .toLowerCase()
                .includes(accountFilter.toLowerCase());
            const categoryMatch = transaction
                .category
                .toLowerCase()
                .includes(categoryFilter.toLowerCase());
            const typeMatch = transaction
                .type
                .toLowerCase()
                .includes(typeFilter.toLowerCase());

            

            return typeMatch && textMatch && accountMatch && categoryMatch
        });
    }

}
