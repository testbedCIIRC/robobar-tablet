import { it, expect, describe, beforeEach, beforeAll, afterAll, afterEach } from "vitest";

import { setActivePinia, createPinia } from "pinia";
import { useOrderStore, STATE } from "../order";

import { setupServer } from "msw/node";
import { rest } from "msw";
import { RETURN_CODES } from "../../scripts/api-communication";

const newOrderStatusMsg = (returnCode) => {
    let retObj = {
        statusCode: returnCode,
    }
    if (returnCode == RETURN_CODES.OK) {
        retObj.data = {
            newOrderStatus: {
                orderPushedSuccessfully: true,
                pushedOrderNumber: 101,
            }
        }
    }

    return retObj;
}

const restHandlers = [
    rest.post('http://127.0.0.1:5000/NewDrinkInQueue', (req, res, ctx) => {
      return res(
        ctx.delay(),
        ctx.status(200), 
        ctx.json(newOrderStatusMsg(RETURN_CODES.OK)))
    }),
  ]

const server = setupServer(...restHandlers);

describe('Order Store', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('pushesOrders', async () => {
        const store = useOrderStore();
        store.drinkId = 10;
        store.useIce = false;
        store.useLargeGlass = false;
        await store.sendOrder();
        expect(store.orderState).toBe(STATE.RESULT_SUCCESS);
        expect(store.assignedOrderId).toBe(101);
    });
})