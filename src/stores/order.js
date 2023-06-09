import { defineStore } from 'pinia';
import { RETURN_CODES, sendOrderRequest } from '../scripts/api-communication.js';

export const STATE = {
    NOT_POSTED: 0,
    POSTED_AND_WAITING: 1,
    RESULT_SUCCESS: 2,
    RESULT_FAILURE: 3,
}
/**
 * @description Pinia store storing information regarding the currently 
 * processed order.
 * 
 * @requires api-communication.js
 */
export const useOrderStore = defineStore('order', {
    state: () => ({
        _assignedOrderId: null,  // value received after state == RESULT_SUCCESS 
        _orderState: STATE.NOT_POSTED,
        drinkId: null,
        useIce: null,
        useLargeGlass: null,
    }),
    getters: {
        orderState(state) { return state._orderState; },
        assignedOrderId(state) { return state._assignedOrderId; },
    },
    actions: {
        /**
         * @async @function
         * @description Sends store's data (this.) to REST API server to create an order.
         *
         * Expects the **drinkId**, **useIce** and **useLargeGlass** to be set beforehand.
         * 
         * Calls api-communications' method sendOrderRequest and handles 
         * the response using this._handleOrderResponse function.
         * 
         * @todo Timeout for the request method.
         */
        async sendOrder() {            
            this._orderState = STATE.POSTED_AND_WAITING;
            const orderRequestData = {
                drinkId: this.drinkId,
                useIce: this.useIce,
                useLargeGlass: this.useLargeGlass,
            };

            const orderResponseData = await sendOrderRequest(orderRequestData);
            this._handleOrderResponse(orderResponseData);
        },
        /**
         * @description Handles response data from orderRequest.
         * @private Do not call outside of this store.
         * 
         * @param  {object} orderResponseData constisting of statusCode and data
         */
        _handleOrderResponse(orderResponseData) {
            if (orderResponseData && orderResponseData.statusCode == RETURN_CODES.OK) {
                this._assignedOrderId = orderResponseData.data.newOrderStatus.pushedOrderNumber;
                this._orderState = STATE.RESULT_SUCCESS;
            } else {
                console.log(orderResponseData);
                this._orderState = STATE.RESULT_FAILURE;
            }
        },
        /**
         * @description Sets this store's values to default.
         * 
         * Call when user confirms drink order outcome.
         */
        setDefaultOrder() {
            this._assignedOrderId = null;
            this._orderState = STATE.NOT_POSTED;
            this.drinkId = null;
            this.useIce = null;
            this.useLargeGlass = null;
        }
    } 
})