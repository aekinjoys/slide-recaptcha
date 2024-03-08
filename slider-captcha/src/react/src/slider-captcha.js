import React from 'react';
import Card from './card';


const SliderCaptcha = ({
  text = {
    title: "กรุณาเลื่อนลูกศรเพื่อต่อรูปให้สมบูรณ์",
    loading: "กำลังโหลด",
    challenge: "เลื่อนไปทางขวา",
    failed: "กรุณาลองใหม่อีกครั้ง",
  },
}) => {
  const { useState } = React;
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="scaptcha-container">
      <Card
        text={text}
      />
    </div>
  );
};

// SliderCaptcha.propTypes = {
//   callback: PropTypes.func,
//   create: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   verify: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   variant: PropTypes.string,
//   text: PropTypes.shape({
//     anchor: PropTypes.string,
//     challenge: PropTypes.string,
//   }),
// };

// SliderCaptcha.defaultProps = {
//   callback: (token) => console.log(token), // eslint-disable-line no-console
//   create: 'captcha/create',
//   verify: 'captcha/verify',
//   text: {
//     anchor: 'I am human',
//     challenge: 'Slide to finish the puzzle',
//   },
// };

export default SliderCaptcha;
