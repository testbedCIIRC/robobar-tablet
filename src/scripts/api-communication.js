export async function getDrinkTypesFromApi() {
    return fetch("http://127.0.0.1:5000/DrinkTypes/")
        .then(response => response.json())
        .then(data =>{return data});
}

export async function getQueueStateFromApi() {
    return fetch("http://127.0.0.1:5000/QueueState/")
        .then(response => response.json())
        .then(data =>{return data});
}

export async function pushNewDrinkOrderToQueue(newDrinkOrder) {
    return fetch("http://127.0.0.1:5000/NewDrinkInQueue/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDrinkOrder),
    })
        .then(response => response.json())
        .then(data =>{return data});
}

// export async function getPickUpDrinksStateFromApi() {
//     return fetch("http://127.0.0.1:5000/PickUpDrinksState/")
//         .then(response => response.json())
//         .then(data =>{return data});
// }
