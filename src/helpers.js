export const apiHost = 'http://localhost:3000';

export const updateTitle = (pageTitle) => {
  const globalTitle = 'BugTracker';
  document.title = `${pageTitle} | ${globalTitle}`;
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

export const onUserMenuClick = (e) => {
  const userMenuIsClicked = (target) => {
    if (!target || !target.classList) return false;
    if (/user-(btn|menu)/.test(target.className)) return true;
    return userMenuIsClicked(target.parentNode);
  };
  if (userMenuIsClicked(e.target)) return;

  document.querySelector('.user-btn').setAttribute('aria-expanded', false);
  document.querySelector('.user-menu').style.display = 'none';
  document.removeEventListener('click', onUserMenuClick);
};

export const onTableRowClick = (path, id) => {
  window.location.assign(`#/${path}/${id}`);
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
