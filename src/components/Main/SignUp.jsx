import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateTitle } from '../../helpers';
import Form from './SignUp/Form';

export default function SignUp({ setSession }) {
  const pageTitle = 'Sign Up';

  useEffect(() => updateTitle(pageTitle), []);

  return (
    <div className="sign">
      <h1>{pageTitle}</h1>
      <Form setSession={setSession} />
    </div>
  );
}
SignUp.propTypes = {
  setSession: PropTypes.func.isRequired
};
