import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const Anchor = ({
  text,
  fetchCaptcha,
  submitResponse,
  verified,
}) => {
  return (
    <div>
      {!verified && (
        <div>
          <Card
            fetchCaptcha={fetchCaptcha}
            submitResponse={submitResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

Anchor.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
  verified: PropTypes.bool.isRequired,
};

export default Anchor;
