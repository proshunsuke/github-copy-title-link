import { copy } from './copy';

const createCopyTitleLinkElement = () => {
  const copyElement = document.createElement('div');
  copyElement.setAttribute('data-copy-feedback', 'Copied!');
  copyElement.setAttribute('tabindex', '0');
  copyElement.setAttribute('role', 'button');
  copyElement.innerHTML = 'Copy title link';

  return copyElement;
};

const appendNodeToHeader = (copyElement: HTMLDivElement) => {
  const aTag = document.createElement('a');
  aTag.classList.add(
    'js-selected-navigation-item',
    'Header-link',
    'mt-md-n3',
    'mb-md-n3',
    'py-2',
    'py-md-3',
    'mr-0',
    'mr-md-3',
    'border-top',
    'border-md-top-0',
    'border-white-fade'
  );
  aTag.setAttribute('href', '#');
  aTag.appendChild(copyElement);

  const ariaGlobalSel = document.querySelectorAll('[aria-label=Global]')[0];
  ariaGlobalSel.appendChild(aTag);
};

const copyElement = createCopyTitleLinkElement();
appendNodeToHeader(copyElement);
copyElement.addEventListener('click', copy);
