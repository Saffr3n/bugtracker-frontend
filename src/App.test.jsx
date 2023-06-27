/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

let header;
let nav;
let main;
let footer;

beforeEach(async () => {
  await act(async () => {
    render(<App />);
  });

  header = screen.queryByTestId('header');
  nav = screen.queryByTestId('nav');
  main = screen.queryByTestId('main');
  footer = screen.queryByTestId('footer');
});

describe('User is unauthorized', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ status: 400 }));
  });

  describe('Header', () => {
    test('is loaded', () => {
      expect(header).toBeDefined();
    });
  });

  describe('Nav', () => {
    test('is loaded', () => {
      expect(nav).toBeDefined();
    });
  });

  describe('Main', () => {
    test('is loaded', () => {
      expect(main).toBeDefined();
    });
  });

  describe('Footer', () => {
    test('is loaded', () => {
      expect(footer).toBeDefined();
    });
  });
});

describe('User is authorized', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
  });

  describe('Header', () => {
    test('is loaded', () => {
      expect(header).toBeDefined();
    });
  });

  describe('Nav', () => {
    test('is loaded', () => {
      expect(nav).toBeDefined();
    });
  });

  describe('Main', () => {
    test('is loaded', () => {
      expect(main).toBeDefined();
    });
  });

  describe('Footer', () => {
    test('is loaded', () => {
      expect(footer).toBeDefined();
    });
  });
});

describe('Server is offline', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ status: 500 }));
  });

  describe('Header', () => {
    test('is loaded', () => {
      expect(header).toBeDefined();
    });
    test('has 1 child (logo)', () => {
      expect(header.childElementCount).toEqual(1);
    });
  });

  describe('Nav', () => {
    test('is not loaded', () => {
      expect(nav).toBeNull();
    });
  });

  describe('Main', () => {
    test('is loaded', () => {
      expect(main).toBeDefined();
    });
    test('has 2 children', () => {
      expect(main.childElementCount).toEqual(2);
    });
    test('contains "Server Error" heading', () => {
      expect(within(main).queryByText('Server Error')).toBeDefined();
    });
    test('contains "Please try again later." paragraph', () => {
      expect(within(main).queryByText('Please try again later.')).toBeDefined();
    });
  });

  describe('Footer', () => {
    test('is loaded', () => {
      expect(footer).toBeDefined();
    });
    test('is rendered properly', () => {
      expect(footer).toMatchSnapshot();
    });
  });
});
