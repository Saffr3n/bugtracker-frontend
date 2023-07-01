/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { fireEvent, render, screen, within } from '@testing-library/react';
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

  header = screen.getByTestId('header');
  nav = screen.queryByTestId('nav');
  main = screen.getByTestId('main');
  footer = screen.getByTestId('footer');
});

describe('User is unauthorized', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({ status: 401 }));
  });

  describe('Header', () => {
    test('is loaded', () => {
      expect(header).toBeDefined();
    });
    test('has 2 children', () => {
      expect(header.childElementCount).toEqual(2);
    });
    test('has "Sign Up" and "Sign In" links', () => {
      expect(within(header).getAllByText(/^Sign/).length).toEqual(2);
    });
  });

  describe('Nav', () => {
    test('is loaded', () => {
      expect(nav).not.toBeNull();
    });
    test('has 1 child', () => {
      expect(nav.childElementCount).toEqual(1);
    });
    test('has "Sign Up" and "Sign In" links', () => {
      expect(within(nav).getAllByText(/^Sign/).length).toEqual(2);
    });
  });

  describe('Main', () => {
    test('is loaded', () => {
      expect(main).toBeDefined();
    });

    describe('Sign In route', () => {
      beforeAll(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            status: 400,
            json: () => ({ message: 'Incorrect email or password' })
          })
        );
      });

      beforeEach(async () => {
        fireEvent.click(within(nav).getByText('Sign In'));
      });

      test('has 1 child, which has 3 children', () => {
        expect(main.childElementCount).toEqual(1);
        expect(main.firstChild.childElementCount).toEqual(3);
      });
      test('has "Sign In" heading', () => {
        const heading = within(main).getByRole('heading');
        expect(within(heading).getByText('Sign In')).toBeDefined();
      });
      test('has 1 text input (excluding password field)', () => {
        expect(within(main).getByRole('textbox')).toBeDefined();
      });
      test('has "Email" form field', () => {
        expect(within(main).getByLabelText('Email')).toBeDefined();
      });
      test('has "Password" form field', () => {
        expect(within(main).getByLabelText('Password')).toBeDefined();
      });
      test('has "Sign In" button', () => {
        const button = within(main).getByRole('button');
        expect(within(button).getByText('Sign In')).toBeDefined();
      });
      test('has "Sign up!" link', () => {
        expect(within(main).getByText('Sign up!')).toBeDefined();
      });
      test('shows "Incorrect email or password" alert on unsuccessful login attempt', async () => {
        expect(within(main).queryByText('Incorrect email or password.')).toBeNull();
        const loginButton = within(main).getByRole('button');
        fireEvent.click(loginButton);
        expect(await within(main).findByText('Incorrect email or password.')).toBeDefined();
      });
    });

    describe('Sign Up route', () => {
      beforeAll(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            status: 400,
            json: () => ({ message: 'Email is required. Password is required. First name is required. Last name is required' })
          })
        );
      });

      beforeEach(async () => {
        fireEvent.click(within(nav).getByText('Sign Up'));
      });

      test('has 1 child, which has 2 children', () => {
        expect(main.childElementCount).toEqual(1);
        expect(main.firstChild.childElementCount).toEqual(2);
      });
      test('has "Sign Up" heading', () => {
        const heading = within(main).getByRole('heading');
        expect(within(heading).getByText('Sign Up')).toBeDefined();
      });
      test('has 3 text inputs (excluding password fields)', () => {
        expect(within(main).getAllByRole('textbox').length).toEqual(3);
      });
      test('has "Email" form field', () => {
        expect(within(main).getByLabelText('Email')).toBeDefined();
      });
      test('has "Password" form field', () => {
        expect(within(main).getByLabelText('Password')).toBeDefined();
      });
      test('has "Confirm password" form field', () => {
        expect(within(main).getByLabelText('Confirm password')).toBeDefined();
      });
      test('has "First name" form field', () => {
        expect(within(main).getByLabelText('First name')).toBeDefined();
      });
      test('has "Last name" form field', () => {
        expect(within(main).getByLabelText('Last name')).toBeDefined();
      });
      test('has "Sign Up" button', () => {
        const button = within(main).getByRole('button');
        expect(within(button).getByText('Sign Up')).toBeDefined();
      });
      test('shows API alerts on unsuccessful register attempt', async () => {
        expect(within(main).queryByText('Email is required')).toBeNull();
        const registerButton = within(main).getByRole('button');
        fireEvent.click(registerButton);
        expect(await within(main).findByText('Email is required')).toBeDefined();
        expect(await within(main).findByText('Password is required')).toBeDefined();
        expect(await within(main).findByText('First name is required')).toBeDefined();
        expect(await within(main).findByText('Last name is required')).toBeDefined();
      });
      test('shows "Passwords don\'t match" alert when needed', async () => {
        expect(within(main).queryByText("Passwords don't match")).toBeNull();
        const passwordInput = within(main).getByLabelText('Password');
        const registerButton = within(main).getByRole('button');
        fireEvent.input(passwordInput, { target: { value: 'any' } });
        fireEvent.click(registerButton);
        expect(await within(main).findByText("Passwords don't match")).toBeDefined();
      });
    });
  });

  describe('Footer', () => {
    test('is loaded', () => {
      expect(footer).toBeDefined();
    });
    // Footer is rendered the same way in every scenario, so we test its snapshot only once here
    test('is rendered properly', () => {
      expect(footer).toMatchSnapshot();
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
      expect(nav).not.toBeNull();
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
    test('has "Server Error" heading', () => {
      expect(within(main).getByText('Server Error')).toBeDefined();
    });
    test('has "Please try again later." paragraph', () => {
      expect(within(main).getByText('Please try again later.')).toBeDefined();
    });
  });

  describe('Footer', () => {
    test('is loaded', () => {
      expect(footer).toBeDefined();
    });
  });
});
