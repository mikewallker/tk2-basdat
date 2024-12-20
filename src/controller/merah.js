import { PORT } from "./deploy";

// Controller for MyPay API calls
// Fetching MyPay balance
async function getMyPayBalance(userId, role) {
    try {
        const response = await fetch(`${PORT}/mypay/balance`, {
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
        const response = await fetch(`${PORT}/mypay/history`, {
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
        console.log("TEST: " + userId + " " + nominal + " " + kategoriId)
        const response = await fetch(`${PORT}/mypay/topup`, {
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
        return { message: data.message, status: true }; // Expecting a success message from the server
    } catch (error) {
        console.error('Failed to process top-up:', error.message);
        throw error; // Propagate error to the caller
    }
}

// Fetch the category UUID based on category name
async function getCategoryIdByName(categoryName) {
    try {
        const response = await fetch(`${PORT}/mypay/get-category-id`, {
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
        const response = await fetch(`${PORT}/mypay/getPesananJasa`, {
            method: 'PATCH',
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

async function getStatusIdByName(statusName) {
    try {
        const response = await fetch(`${PORT}/mypay/getStatusIdByName`, {
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

async function processPayment(userId, serviceId) {
    try {
        const response = await fetch(`${PORT}/mypay/processPayment`, {
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

async function transferToAnotherUser(user_id, nominal, to_user_id) {
    try {
        const response = await fetch(`${PORT}/mypay/transfer`, {
            method: 'PATCH',
            body: JSON.stringify({
                user_id: user_id,
                kategori_id: "9375b392-b462-4b77-bd34-00d41fa4c669",
                nominal: nominal,
                to_user_id: to_user_id
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}

async function withdrawUserMoney(user_id, nominal, to_user_id) {
    try {
        const response = await fetch(`${PORT}/mypay/withdrawal`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: user_id,
                kategori_id: "afce5b84-676b-47b7-b121-8743a6b2c751",
                nominal: nominal
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}


async function getKategoriAndSub(id) {
    try {
        const response = await fetch(`${PORT}/pekerja/get-kategori-sub`, {
            method: 'PATCH',
            body: JSON.stringify({
                Id: id
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText} `);
        }

        const data = await response.json();
        return data; // Success message from the API
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}


async function getJobForPekerja(id) {
    try {
        const response = await fetch(`${PORT}/jobs/available`, {
            method: 'PATCH',
            body: JSON.stringify({
                user_id: id
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText} `);
        }

        const data = await response.json();
        return data; // Success message from the API
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}

async function updateJobForPekerja(id, trid) {
    try {
        const response = await fetch(`${PORT}/jobs/get-job`, {
            method: 'PATCH',
            body: JSON.stringify({
                user_id: id,
                transaksi_pemesanan_jasa_id: trid
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText} `);
        }

        const data = await response.json();
        return data; // Success message from the API
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}

async function getCurrentJob(id) {
    try {
        const response = await fetch(`${PORT}/jobs/job-pekerja-id`, {
            method: 'PATCH',
            body: JSON.stringify({
                user_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText} `);
        }

        const data = await response.json();
        return data; // Success message from the API
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}

async function updateCurrentJob(id) {
    try {
        const response = await fetch(`${PORT}/jobs/job-pekerja-update`, {
            method: 'PATCH',
            body: JSON.stringify({
                transaksi_pemesanan_jasa_id: id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText} `);
        }

        const data = await response.json();
        return data; // Success message from the API
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error; // Propagate error to the caller
    }
}



export {
    getMyPayBalance, getMyPayHistory, getCategoryIdByName,
    getPesananJasa, getStatusIdByName, processPayment,
    topUpMyPayBalance, transferToAnotherUser, withdrawUserMoney,

    getJobForPekerja, getKategoriAndSub, updateJobForPekerja, getCurrentJob, updateCurrentJob
};
