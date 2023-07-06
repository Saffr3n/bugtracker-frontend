export const apiHost = 'http://localhost:3000';

export const updateTitle = (pageTitle) => {
  const globalTitle = document.title.slice(document.title.indexOf('BugTracker'));
  document.title = `${pageTitle} - ${globalTitle}`;
};

export const onSearchFocus = (e) => {
  e.target.placeholder = '';
};

export const onSearchBlur = (e) => {
  e.target.placeholder = 'Search...';
};

export const onSearchInput = (e) => {
  const rows = [...e.target.nextSibling.querySelectorAll('tbody tr')];

  for (let i = 0; i < rows.length; i++) {
    let hidden = true;
    const cells = rows[i].querySelectorAll('td');

    for (let j = 0; j < cells.length; j++) {
      const data = cells[j].textContent.toUpperCase();
      const query = e.target.value.toUpperCase();

      if (data.includes(query)) hidden = false;
    }

    if (hidden) rows[i].style.display = 'none';
    else rows[i].style.display = 'table-row';
  }
};

export const onTableRowClick = (id) => {
  window.location.assign(`#/${window.location.hash.split('/')[1]}/${id}`);
};

const deactivateLinks = () => {
  const activeLinks = document.querySelectorAll('.active');

  if (activeLinks.length) {
    activeLinks.forEach((link) => {
      link.classList.remove('active');
    });
  }
};

const activateLinks = () => {
  const { hash } = window.location;
  const activeLinks = document.querySelectorAll(`a[href="${hash}"]`);

  if (activeLinks.length) {
    activeLinks.forEach((link) => {
      link.classList.add('active');
    });
  }
};

export const onHashChange = () => {
  deactivateLinks();
  activateLinks();
};
