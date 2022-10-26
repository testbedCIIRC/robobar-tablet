export async function getDrinkTypesFromApi() {
    return fetch(`http://${ location.host.split(':')[0] }:5000/DrinkTypes/`)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

export async function getQueueStateFromApi() {
    return fetch(`http://${ location.host.split(':')[0] }:5000/QueueState/`, {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

export async function pushNewDrinkOrderToQueue(newDrinkOrder) {
    return fetch(`http://${ location.host.split(':')[0] }:5000/NewDrinkInQueue/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDrinkOrder),
    })
        .then(response => response.json())
        .then(data =>{
            return data;
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

// export async function getPickUpDrinksStateFromApi() {
//     return fetch("http://127.0.0.1:5000/PickUpDrinksState/")
//         .then(response => response.json())
//         .then(data =>{return data});
// }
