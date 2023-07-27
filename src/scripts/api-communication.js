export const RETURN_CODES = {
    OK: 0,
    NOK: -1,
    TIMEOUT: -2,
    NO_CONNECTION: -3,
}

const DEFAULT_URL = "http://10.35.91.24:5000";

export async function sendDrinkTypesRequest() {
    return fetch(`${DEFAULT_URL}/DrinkTypes/`)
        .then(response => response.json())
        .then(data =>{return data});
}

export async function getQueueStateFromApi() {
    return fetch(`${DEFAULT_URL}/QueueState/`)
        .then(response => response.json())
        .then(data =>{return data});
}

export async function sendOrderRequest(newDrinkOrder) {
    return fetch(`${DEFAULT_URL}/NewDrinkInQueue/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDrinkOrder),
        })
        .then(response => response.json())
        .then(data =>{return data})
        .catch(error => {
            return {
                code: error.code,
                msg: error.toString()
            }
        });
}

// export async function getPickUpDrinksStateFromApi() {
//     return fetch("http://127.0.0.1:5000/PickUpDrinksState/")
//         .then(response => response.json())
//         .then(data =>{return data});
// }
