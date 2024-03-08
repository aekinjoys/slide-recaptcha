import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon } from './icons';
import Challenge from './challenge';

const Card = ({
  text,
  fetchCaptcha,
  submitResponse,
  verified,
  failed,
}) => {
  const { useState, useRef, useEffect } = React;
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState({});
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('ยืนยันตัวตน');
  const isMounted = useRef(false);

  const refreshCaptcha = () => window.RecaptchaFlutterChannel?.postMessage(JSON.stringify({ action: "refresh", data: null }))

  const completeCaptcha = (response, trail, left) => {
    const data = {
      action: "completeCaptcha",
      data: {
        response: response, trail: trail, left: left
      }
    }
    window?.RecaptchaFlutterChannel.postMessage(JSON.stringify(data));
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleMessageFromFlutter = (event) => {
      try {
        setCaptcha(event.data)
      } catch (e) {
        window.RecaptchaFlutterChannel?.postMessage(JSON.stringify({ action: "log", data: e.message }))
      }
    };

    window.addEventListener('message', handleMessageFromFlutter);

    return () => {
      window.removeEventListener('message', handleMessageFromFlutter);
    };
  }, []);

  const closeCaptcha = () => window.RecaptchaFlutterChannel?.postMessage(JSON.stringify({ action: "close", data: null }))

  return (
    <div>
      <div className="header">
        <div className="title">{title}</div>
      </div>
      <div className="header">
        <div className="icon-close" onClick={() => closeCaptcha()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.6129 3.2097C4.22061 2.90468 3.65338 2.93241 3.29289 3.29289C2.90237 3.68342 2.90237 4.31658 3.29289 4.70711L10.5858 12L3.29289 19.2929L3.2097 19.3871C2.90468 19.7794 2.93241 20.3466 3.29289 20.7071C3.68342 21.0976 4.31658 21.0976 4.70711 20.7071L12 13.4142L19.2929 20.7071L19.3871 20.7903C19.7794 21.0953 20.3466 21.0676 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L13.4142 12L20.7071 4.70711L20.7903 4.6129C21.0953 4.22061 21.0676 3.65338 20.7071 3.29289C20.3166 2.90237 19.6834 2.90237 19.2929 3.29289L12 10.5858L4.70711 3.29289L4.6129 3.2097Z"
              fill="#212121"
            />
          </svg>
        </div>
      </div>
      <div className="container-fluid">
        <div className="form-row">
          <div className="col-12">
            <div className="slidercaptcha card">
              <div className="card-header">
                <span>{text.title}</span>
                <div className="refreshIcon" onClick={refreshCaptcha}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.66651 11.8021V11.6666C1.66651 11.2393 1.98821 10.887 2.40266 10.8389L2.49984 10.8333H6.66651C7.12675 10.8333 7.49985 11.2064 7.49985 11.6666C7.49985 12.094 7.17814 12.4462 6.7637 12.4943L6.66651 12.4999H4.50541L6.4181 14.2349C7.78891 15.5586 9.77394 16.1127 11.6722 15.6982C13.5654 15.2848 15.1014 13.9671 15.7443 12.2136C15.9028 11.7815 16.3815 11.5596 16.8136 11.7181C17.2457 11.8765 17.4676 12.3552 17.3091 12.7873C16.4682 15.0809 14.4729 16.7925 12.0277 17.3265C9.67172 17.841 7.20998 17.1942 5.46374 15.6235L5.27942 15.4516L3.33309 13.6865L3.33318 15.8333C3.33318 16.2606 3.01148 16.6129 2.59703 16.661L2.49984 16.6666C2.07248 16.6666 1.72026 16.3449 1.67212 15.9305L1.66651 15.8333V11.8091C1.6665 11.8068 1.6665 11.8044 1.66651 11.8021ZM14.7203 4.54825L14.5359 4.37643L14.3462 4.21169C12.614 2.76099 10.2438 2.17726 7.97196 2.67338C5.5268 3.20735 3.53148 4.919 2.69055 7.21257C2.53212 7.64468 2.75398 8.12341 3.18609 8.28184C3.61819 8.44027 4.09692 8.21841 4.25535 7.7863C4.89827 6.03279 6.43433 4.71511 8.32754 4.30167C10.2257 3.88715 12.2108 4.44131 13.5816 5.765L15.4943 7.49995H13.3332L13.236 7.50555C12.8215 7.55369 12.4998 7.90592 12.4998 8.33328C12.4998 8.79352 12.8729 9.16661 13.3332 9.16661H17.4998L17.597 9.16101C18.0115 9.11287 18.3332 8.76064 18.3332 8.33328V8.19654C18.3332 8.19505 18.3332 8.19356 18.3332 8.19206V4.16661L18.3276 4.06943C18.2794 3.65498 17.9272 3.33328 17.4998 3.33328L17.4027 3.33889C16.9882 3.38702 16.6665 3.73925 16.6665 4.16661L16.6664 6.31323L14.7203 4.54825Z"
                      fill="#838383"
                    />
                  </svg>
                </div>
              </div>
              <div className="card-body">
                <Challenge
                  key={key}
                  text={text}
                  captcha={captcha}
                  loaded={!loading}
                  verified={verified}
                  failed={failed}
                  completeCaptcha={completeCaptcha}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scaptcha-container">
        <div className="scaptcha-card-container scaptcha-card-element">
          <span>{text.title}</span>
        </div>
      </div>
    </div>
  );
};

// Card.propTypes = {
//   fetchCaptcha: PropTypes.func.isRequired,
//   submitResponse: PropTypes.func.isRequired,
//   text: PropTypes.shape({
//     anchor: PropTypes.string,
//     challenge: PropTypes.string,
//   }).isRequired,
// };

export default Card;
