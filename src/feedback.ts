const duration = 2000;

export const feedback = (copyElement: HTMLDivElement) => {
  const message = copyElement.getAttribute('data-copy-feedback');
  if (!message) return;
  const originalLabel = copyElement.getAttribute('aria-label');
  const direction = copyElement.getAttribute('data-tooltip-direction') || 's';

  copyElement.setAttribute('aria-label', message);
  copyElement.classList.add('tooltipped', `tooltipped-${direction}`);
  if (!(copyElement instanceof HTMLElement)) return;

  setTimeout(() => {
    if (originalLabel) {
      copyElement.setAttribute('aria-label', originalLabel);
    } else {
      copyElement.removeAttribute('aria-label');
    }
    copyElement.classList.remove('tooltipped', `tooltipped-${direction}`);
  }, duration);
};
