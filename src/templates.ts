import { TEMPLATE_KEY } from '.';
import { defaultTemplates } from './default-templates';
import { Template } from './types';

const t = window.TrelloPowerUp.iframe();

// Load templates
t.get('board', 'shared', TEMPLATE_KEY, defaultTemplates)
  .then(function(templates: Template[]) {
    const select = document.getElementById('template-select') as HTMLSelectElement;
    
    templates.forEach(function(template) {
      const option = document.createElement('option');
      option.value = template.id;
      option.textContent = template.name;
      select.appendChild(option);
    });
  });

document.getElementById('apply-template')?.addEventListener('click', function() {
  const templateId = (document.getElementById('template-select') as HTMLSelectElement).value;
  if (!templateId) return;

  t.get('board', 'shared', TEMPLATE_KEY, defaultTemplates)
    .then(function(templates: Template[]) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        return t.card('id')
          .then(function(card) {
            return t.set(card.id, 'shared', 'desc', template.description);
          });
      }
    })
    .then(function() {
      t.closePopup();
    });
});