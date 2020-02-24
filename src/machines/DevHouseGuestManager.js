import { Machine, spawn, assign } from 'xstate';
import DevHouseGuestMachine from './DevHouseGuest';

export default Machine({
  initial: 'MINGLING',
  context: {
    guests: [],
  },
  states: {
    MINGLING: {
      on: {
        DEMO: {
          target: 'DEMOING',
          actions: assign((context, { name }) => ({
            ...context,
            presenter: name,
          }))
        }
      }
    },
    DEMOING: {
      on: {
        PIZZA_ARRIVAL: {
          target: 'PIZZA_TIME',
        },
      }
    },
    PIZZA_TIME: {
      on: {
        DEMO: {
          target: 'DEMOING',
        }
      }
    }
  },
  on: {
    GUEST_ARRIVAL: {
      actions: assign((context, { name }) => {
        const { guests } = context;

        const newGuest = spawn(DevHouseGuestMachine.withContext({ name }));

        return {
          ...context,
          guests: {
            ...guests,
            [name]: newGuest,
          },
        }
      })
    },
  }
})