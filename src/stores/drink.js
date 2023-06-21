import { defineStore } from 'pinia';
import { RETURN_CODES, sendDrinkTypesRequest } from '../scripts/api-communication.js';

/**
 * @description 
 * 
 * @requires api-communication.js
 */
export const useDrinkStore = defineStore('drink', {
    state: () => ({
        _drinkTypes: null,
        drinkGroupEnum: Object.freeze({
            coffeeDrinks: 1,
            softDrinks: 2,
            alcoholicDrinks: 3,
        }),
        iceOptions: [
            { label: 'WITHOUT ICE', value: false },
            { label: 'WITH ICE', value: true },
        ],
        volumeOptions: [
            { label: '250 ML', value: false },
            { label: '400 ML', value: true },
        ],
    }),
    getters: {
        drinkTypes(state) { return state._drinkTypes; },
    },
    actions: {
        async requestNewDrinkTypes() {            
            const drinkTypesResponseData = await sendDrinkTypesRequest();
            this._handleDrinkTypesResponse(drinkTypesResponseData);
        },
        _handleDrinkTypesResponse(drinkTypesResponseData) {
            if (drinkTypesResponseData 
                && drinkTypesResponseData.statusCode == RETURN_CODES.OK) {
                    this._drinkTypes = drinkTypesResponseData.data.drinkTypes;
            } else {
                this._drinkTypes = null;
            }
        },
    }
})