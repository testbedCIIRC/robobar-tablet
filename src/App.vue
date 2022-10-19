<template>
  <component 
    @makeOrder="makeOrder"
    @changeScreen="changeScreen" 
    :newOrder="newOrder" 
    :drinkTypes="drinkTypes"
    :drinkTypesLoaded="drinkTypes !== undefined" 
    :drinkGroupEnum="drinkGroupEnum" 
    :is="currentPage" 
    :orderNumber="newOrderStatus.pushedOrderNumber"
    v-bind="{'newScreen':'HomePage'}"></component>
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import DrinkOrderConclusion from '@/components/DrinkOrderConclusion.vue'
import DrinkOrderProcessing from '@/components/DrinkOrderProcessing.vue'
import * as apicomm from '@/scripts/api-communication.js'
import DrinkOrderConfigurator from '@/components/DrinkOrderConfigurator.vue'

export default {
  name: 'App',
  components: {
      HomePage,
      DrinkOrderConfigurator,
      DrinkOrderConclusion,
      DrinkOrderProcessing,
  },
  data() {
    return {
      currentPage: 'HomePage',
      drinkId: -1,
      drinkTypes: undefined,
      drinkGroupEnum: Object.freeze({
          coffeeDrinks: 1,
          softDrinks: 2,
          alcoholicDrinks: 3,
      }),
      newOrder: {
        drinkId: undefined,
        subChoices: {
          useIce: undefined,
          useLargeGlass: undefined,
        },
      },
      newOrderStatus: {
        orderPushedSuccessfully: undefined,
        pushedOrderNumber: undefined,
      },
      drinkTypesCheckPeriodInMs: {
        fast: 1000,
        slow: 3000,
      },
    }
  },
  async created() {
    this.startPeriodicCheckForDrinkTypes();
    // TODO: periodic PLC/OPC status update
  },
  methods: {
    async startPeriodicCheckForDrinkTypes() {
      try {
        let drinkTypesMessage = await apicomm.getDrinkTypesFromApi();
        this.drinkTypes = drinkTypesMessage["data"]["drinkTypes"];

        setTimeout(() => {this.startPeriodicCheckForDrinkTypes()}, this.drinkTypesCheckPeriodInMs.slow);
      } catch (error) {
        console.error("Error: Unable to get drink types.");
        if (this.currentPage !== 'HomePage') {
          this.currentPage = 'HomePage';
        }

        setTimeout(() => {this.startPeriodicCheckForDrinkTypes()}, this.drinkTypesCheckPeriodInMs.fast);
      }
    },
    changeScreen(newScreenName, drinkId) {
      if (drinkId === undefined) {
        this.currentPage = newScreenName;
      } else {
        this.drinkId = drinkId;
      }
    },
    async makeOrder(newOrder) {
      this.changeScreen('DrinkOrderProcessing');
      this.newOrder = newOrder;

      const newOrderStatusMessage = await apicomm.pushNewDrinkOrderToQueue(this.newOrder);

      try {
        const newOrderStatus = newOrderStatusMessage["data"];
        
        console.log(newOrderStatus);
        
        if (newOrderStatus && newOrderStatus.newOrderStatus) {
          this.newOrderStatus.orderPushedSuccessfully = newOrderStatus.newOrderStatus.orderPushedSuccessfully;
          this.newOrderStatus.pushedOrderNumber = newOrderStatus.newOrderStatus.pushedOrderNumber;

          if (this.newOrderStatus.orderPushedSuccessfully) {
            this.changeScreen('DrinkOrderConclusion');
          } else {
            this.changeScreen('HomePage');
          }
        }
      } catch(error) {
        console.log(error);
        console.log(
          `Unable to push new order to queue. Status Code: ${newOrderStatusMessage['statusCode']}`);
        this.changeScreen('HomePage');
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

html, body {
  margin: 0;
  // overflow: scroll;
  background-color: rgb(0, 0, 0);
  user-select: none;
  @media only screen and (min-width: 992px) {
      font-size: 4vw;
  }
  @media only screen and (max-width: 991px) {
      font-size: 7.5vw;
  }
  touch-action: pan-y;
  margin-bottom: 5vh;
}

#app {
  font-family: Inter, sans-serif;
  color: #ffffff;
  // width: 100%;
  // height: 1vw;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  height:fit-content;
}

h1 {
  font-weight: 1000;
}

span, button {
  font-family: Inter, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}
</style>
