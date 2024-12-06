// Controller for MyPay API calls

// Fetching MyPay balance
async function getMyPayBalance(userId, role) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/balance', {
            method: 'POST',
            body: JSON.stringify({ 
                User: userId,
                role: role
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); // Fetch error message from response
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return {
            userId: data.user_id,
            balance: data.balance,
            noHp: data.no_hp,
        };
    } catch (error) {
        console.error('Failed to fetch balance:', error.message);
        throw error; // Propagate error to be handled by the caller
    }
}

// Fetching MyPay transaction history
async function getMyPayHistory(userId, role) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/history', {
            method: 'POST',
            body: JSON.stringify({ 
                User: userId,
                role: role 
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.history; // This contains an array of transaction objects
    } catch (error) {
        console.error('Failed to fetch transaction history:', error.message);
        throw error; // Propagate error to the caller
    }
}

// Handling MyPay Top-Up
async function topUpMyPayBalance(userId, nominal, kategoriId) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/topup', {
            method: 'POST',
            body: JSON.stringify({ 
                userId: userId,
                nominal: nominal,
                kategoriId: kategoriId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.message; // Expecting a success message from the server
    } catch (error) {
        console.error('Failed to process top-up:', error.message);
        throw error; // Propagate error to the caller
    }
}

// Fetch the category UUID based on category name
async function getCategoryIdByName(categoryName) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/get-category-id', {
            method: 'POST',
            body: JSON.stringify({ 
                namaKategori: categoryName,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.kategoriId; // Return the kategoriId (UUID string) from the response
    } catch (error) {
        console.error('Failed to fetch category UUID:', error.message);
        throw error; // Propagate error to the caller
    }
}

async function getPesananJasa(userId) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/getPesananJasa', {
            method: 'GET',
            body: JSON.stringify({
                user: userId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json(); // Parse JSON response
        return data; // Return the response data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export async function getStatusIdByName(statusName) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/getStatusIdByName', {
            method: 'POST',
            body: JSON.stringify({ statusName: statusName }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching status ID: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the JSON response
        return data.statusId;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Return null in case of an error
    }
}

export async function processPayment(userId, serviceId) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/processPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                serviceId: serviceId,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || `Error processing payment: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the JSON response
        return data; // Return success message or any relevant data
    } catch (error) {
        console.error('There was a problem with the payment operation:', error.message);
        return { error: error.message }; // Return the error
    }
}






// Perform a transaction (topup, payment, transfer, or withdrawal)
async function performTransaction(transactionData) {
    try {
        const response = await fetch('http://127.0.0.1:8080/mypay/transaction', {
            method: 'POST',
            body: JSON.stringify(transactionData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.message; // Success message from the API
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}

export { getMyPayBalance, getMyPayHistory, performTransaction, topUpMyPayBalance, getCategoryIdByName, 
    getPesananJasa, getStatusIdByName };
