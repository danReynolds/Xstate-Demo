import { Machine, assign } from 'xstate';

export default Machine(
  {
    initial: 'WATCHING',
    states: {
      WATCHING: {
        on: {
          DEMO: {
            target: 'DEMOING',
          },
        }
      },
      DEMOING: {
        on: {
          FINISH: {
            target: 'WATCHING',
          }
        }
      },
      EATING: {
        on: {
          FINISH: {
            target: 'WATCHING',
          }
        }
      }
    }
  }
)