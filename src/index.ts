import { BoardButton, TrelloPowerUpBuilder } from 'trello-powerup-typescript';


// const KEY = "f3066f5108e24c693700a5ac80e00dec"
// const KEY = "75d6249b83cbe3567bbc833d226e96ff" // Shalev's
const KEY = "4c778b2b64645510987b561d9c8e1200" //test better agile
const POWERUP_NAME = "test better agile";


async function startPowerUp() {
  const powerUp = new TrelloPowerUpBuilder({
    appKey: KEY,
    appName: POWERUP_NAME
  })
    .onCardBadges(async (t) => {
      return [{
        text: 'Test Badge',
        color: 'blue'
      }];
    })
    .onBoardButtons(async (t) => {
      return [{
        text: 'Test Button',
        icon: 'https://shaked-aharon.github.io/Card-Tag-Trello-PowerUp/favicon.ico'
      },] as BoardButton[];
    });

  try{
    await powerUp.initialize();
    console.log('successfuly initial power-up');
  }catch(e: any){
    console.log('failed to initial power-up');
    console.log(e);
  }

}
startPowerUp();
// import { CardFields } from './types';
// import { Badge, PowerUp,  } from './trello-types';

// export const CAPABILITY_PREFIX = 'card-custom-fields';
// export const TEMPLATE_KEY = 'board-templates';
// export const CARD_NUMBER_KEY = 'board-card-counter';

// window.TrelloPowerUp.initialize({
//   'card-badges': async function(t: PowerUp.IFrame): Promise<Badge[]> {
//     const card = await t.card('all');
//     const cardData = await t.get(card.id, 'shared', CAPABILITY_PREFIX) as CardFields;
//     if (!cardData) return [];

//     const badges: Badge[] = [];

//     if (cardData.priority) {
//       badges.push({
//         text: `Priority: ${cardData.priority}`,
//         color: getPriorityColor(cardData.priority),
//       });
//     }

//     if (cardData.severity) {
//       badges.push({
//         text: `Severity: ${cardData.severity}`,
//         color: getSeverityColor(cardData.severity),
//       });
//     }

//     if (cardData.age) {
//       badges.push({
//         text: `Age: ${cardData.age} days`,
//       });
//     }

//     if (cardData.prefix && cardData.cardNumber) {
//       badges.push({
//         text: `${cardData.prefix}-${cardData.cardNumber}`,
//       });
//     }

//     return badges;
//   },

//   'card-back-section': function(t) {
//     return {
//       title: 'Custom Fields',
//       icon: './assets/icon.svg',
//       content: {
//         type: 'callback',
//         callback: function(t) {
//           return t.popup({
//             title: 'Edit Custom Fields',
//             url: './card-fields.html',
//             height: 300,
//           });
//         },
//       },
//     };
//   },

//   'card-buttons': function(t) {
//     return [{
//       icon: './assets/template.svg',
//       text: 'Apply Template',
//       callback: function(t) {
//         return t.popup({
//           title: 'Select Template',
//           url: './templates.html',
//           height: 300,
//         });
//       },
//     }];
//   },

//   'show-settings': function(t) {
//     return t.popup({
//       title: 'Power-Up Settings',
//       url: './settings.html',
//       height: 400,
//     });
//   },
// });

// function getPriorityColor(priority: string): 'red' | 'yellow' | 'green' | 'light-gray' {
//   const colors: { [key: string]: 'red' | 'yellow' | 'green' } = {
//     high: 'red',
//     medium: 'yellow',
//     low: 'green',
//   };
//   return colors[priority.toLowerCase()] || 'light-gray';
// }

// function getSeverityColor(severity: string): 'red' | 'orange' | 'yellow' | 'green' | 'light-gray' {
//   const colors: { [key: string]: 'red' | 'orange' | 'yellow' | 'green'  } = {
//     critical: 'red',
//     major: 'orange',
//     minor: 'yellow',
//     trivial: 'green',
//   };
//   return colors[severity.toLowerCase()] || 'light-gray';
// }