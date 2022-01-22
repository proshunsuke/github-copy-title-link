import { feedback } from './feedback';

const createNode = (
  copyElement: HTMLDivElement,
  title: string,
  url: string
) => {
  const node = document.createElement('a');
  node.href = url;
  node.style.textDecoration = 'underline';
  node.style.color = '#1155cc';
  node.style.fontSize = '14.63px';

  node.appendChild(document.createTextNode(title));
  return node;
};

const copyTitleLink = (copyElement: HTMLDivElement) => {
  const body = document.body;

  if (!body) return Promise.reject(new Error());

  const titleElement =
    document.querySelector<HTMLSpanElement>('.js-issue-title');
  if (!titleElement) return Promise.reject(new Error());
  const title = titleElement.innerText.trim();
  const url = location.href.replace(/\/pull\/(\d*).*/g, '/pull/$1');

  const node = createNode(copyElement, title, url);
  body.appendChild(node);

  const range = document.createRange();
  range.selectNodeContents(node);

  const selection = window.getSelection();
  if (!selection) return Promise.reject(new Error());
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  node.remove();
  return Promise.resolve();
};

export const copy = (event: Event) => {
  const copyElement = event.currentTarget;
  if (!(copyElement instanceof HTMLDivElement)) return;
  copyTitleLink(copyElement)
    .then(() => feedback(copyElement))
    .catch(() => {});
};
