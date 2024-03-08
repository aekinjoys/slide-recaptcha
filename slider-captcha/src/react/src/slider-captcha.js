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
  return (
    <div className="scaptcha-container">
      <Card text={text} />
    </div>
  );
};

export default SliderCaptcha;
