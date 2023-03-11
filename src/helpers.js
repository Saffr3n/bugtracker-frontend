export const apiHost = 'http://localhost:3000';

export const updateTitle = (pageTitle) => {
  const globalTitle = document.title.slice(document.title.indexOf('BugTracker'));
  document.title = `${pageTitle} - ${globalTitle}`;
};

export const deactivateLinks = () => {
  const activeLinks = document.querySelectorAll('.active');

  if (activeLinks.length > 0) {
    activeLinks.forEach((link) => {
      link.classList.remove('active');
    });
  }
};

export const reactivateLinks = (e) => {
  deactivateLinks();

  const target = e.target.tagName === 'A' ? e.target : e.target.parentNode;
  const relUrl = target.href.split(target.host)[1].slice(1);
  const clickedLinks = document.querySelectorAll(`a[href="${relUrl}"]`);

  if (clickedLinks.length > 0) {
    clickedLinks.forEach((link) => {
      link.classList.add('active');
    });
  }
};
