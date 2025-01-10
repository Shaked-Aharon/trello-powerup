import { CARD_NUMBER_KEY, CAPABILITY_PREFIX } from ".";
import { CardFields } from "./types";

const t = window.TrelloPowerUp.iframe();

document.getElementById('custom-fields-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target as HTMLFormElement);
  const cardData: Partial<CardFields> = {
    priority: formData.get('priority') as string,
    severity: formData.get('severity') as string,
    prefix: formData.get('prefix') as string,
  };

  if (cardData.prefix) {
    t.get('board', 'shared', CARD_NUMBER_KEY, 0)
      .then((counter: number) => {
        const newCounter = counter + 1;
        return Promise.all([
          t.set('board', 'shared', CARD_NUMBER_KEY, newCounter),
          t.set('card', 'shared', CAPABILITY_PREFIX, { ...cardData, cardNumber: newCounter }),
        ]);
      })
      .then(function() {
        t.closePopup();
      });
  }
});

// Load existing values
t.card('all')
  .then(function(card) {
    return t.get(card.id, 'shared', CAPABILITY_PREFIX);
  })
  .then(function(data: CardFields) {
    if (data) {
      (document.getElementById('priority') as HTMLSelectElement).value = data.priority;
      (document.getElementById('severity') as HTMLSelectElement).value = data.severity;
      (document.getElementById('prefix') as HTMLInputElement).value = data.prefix;
    }
  });
