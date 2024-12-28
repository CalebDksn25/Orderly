import { JSDOM } from 'jsdom';

export const parseEmailHtml = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  // Example parsing logic
  const parsedData = {
    subject: document.querySelector('title').textContent,
    body: document.querySelector('body').textContent,
  };

  return parsedData;
};
