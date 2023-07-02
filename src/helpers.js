export const apiHost = 'http://localhost:3000';

export const updateTitle = (pageTitle) => {
  const globalTitle = document.title.slice(document.title.indexOf('BugTracker'));
  document.title = `${pageTitle} - ${globalTitle}`;
};

export const deactivateLinks = () => {
  const activeLinks = document.querySelectorAll('.active');

  if (activeLinks.length) {
    activeLinks.forEach((link) => {
      link.classList.remove('active');
    });
  }
};

export const activateLinks = () => {
  const { hash } = window.location;
  const activeLinks = document.querySelectorAll(`a[href="${hash}"]`);

  if (activeLinks.length) {
    activeLinks.forEach((link) => {
      link.classList.add('active');
    });
  }
};
