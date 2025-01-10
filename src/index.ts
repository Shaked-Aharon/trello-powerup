import { CardFields } from './types';
import { Badge, PowerUp,  } from './trello-types';

export const CAPABILITY_PREFIX = 'card-custom-fields';
export const TEMPLATE_KEY = 'board-templates';
export const CARD_NUMBER_KEY = 'board-card-counter';

window.TrelloPowerUp.initialize({
  'card-badges': async function(t: PowerUp.IFrame): Promise<Badge[]> {
    const card = await t.card('all');
    const cardData = await t.get(card.id, 'shared', CAPABILITY_PREFIX) as CardFields;
    if (!cardData) return [];

    const badges: Badge[] = [];

    if (cardData.priority) {
      badges.push({
        text: `Priority: ${cardData.priority}`,
        color: getPriorityColor(cardData.priority),
      });
    }

    if (cardData.severity) {
      badges.push({
        text: `Severity: ${cardData.severity}`,
        color: getSeverityColor(cardData.severity),
      });
    }

    if (cardData.age) {
      badges.push({
        text: `Age: ${cardData.age} days`,
      });
    }

    if (cardData.prefix && cardData.cardNumber) {
      badges.push({
        text: `${cardData.prefix}-${cardData.cardNumber}`,
      });
    }

    return badges;
  },

  'card-back-section': function(t) {
    return {
      title: 'Custom Fields',
      icon: './assets/icon.svg',
      content: {
        type: 'callback',
        callback: function(t) {
          return t.popup({
            title: 'Edit Custom Fields',
            url: './card-fields.html',
            height: 300,
          });
        },
      },
    };
  },

  'card-buttons': function(t) {
    return [{
      icon: './assets/template.svg',
      text: 'Apply Template',
      callback: function(t) {
        return t.popup({
          title: 'Select Template',
          url: './templates.html',
          height: 300,
        });
      },
    }];
  },

  'show-settings': function(t) {
    return t.popup({
      title: 'Power-Up Settings',
      url: './settings.html',
      height: 400,
    });
  },
});

function getPriorityColor(priority: string): 'red' | 'yellow' | 'green' | 'light-gray' {
  const colors: { [key: string]: 'red' | 'yellow' | 'green' } = {
    high: 'red',
    medium: 'yellow',
    low: 'green',
  };
  return colors[priority.toLowerCase()] || 'light-gray';
}

function getSeverityColor(severity: string): 'red' | 'orange' | 'yellow' | 'green' | 'light-gray' {
  const colors: { [key: string]: 'red' | 'orange' | 'yellow' | 'green'  } = {
    critical: 'red',
    major: 'orange',
    minor: 'yellow',
    trivial: 'green',
  };
  return colors[severity.toLowerCase()] || 'light-gray';
}