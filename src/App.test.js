import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

beforeEach(async () => {
  await act(async () => {
    render(<App />);
  });
});

describe('User is unauthorized', () => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({status: 400});
  });

  describe('App loads 4 main components', () => {
    test('Header is loaded', () => {
      expect(screen.getByTestId('header')).toBeDefined();
    });
    test('Nav is loaded', () => {
      expect(screen.getByTestId('nav')).toBeDefined();
    });
    test('Main is loaded', () => {
      expect(screen.getByTestId('main')).toBeDefined();
    });
    test('Footer is loaded', () => {
      expect(screen.getByTestId('footer')).toBeDefined();
    });
  });
});

describe('User is authorized', () => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({status: 200});
  });

  describe('App loads 4 main components', () => {
    test('Header is loaded', () => {
      expect(screen.getByTestId('header')).toBeDefined();
    });
    test('Nav is loaded', () => {
      expect(screen.getByTestId('nav')).toBeDefined();
    });
    test('Main is loaded', () => {
      expect(screen.getByTestId('main')).toBeDefined();
    });
    test('Footer is loaded', () => {
      expect(screen.getByTestId('footer')).toBeDefined();
    });
  });
});
