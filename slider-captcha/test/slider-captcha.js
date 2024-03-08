import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import lightTheme from '../src/light';
import { Buffer } from 'buffer';

const fetchCaptcha = (create) => () =>
  (create instanceof Function)
    ? create() // Use provided promise for getting background and slider
    : fetch(create, {
        // Use create as API URL for fetch
        method: 'GET',
        credentials: 'include',
      }).then((message) => message.json());

const fetchVerification = (verify) => (response, trail) =>
  (verify instanceof Function)
    ? verify(response, trail) // Use provided promise for verifying captcha
    : fetch(verify, {
        // Verification API URL provided instead
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response,
          trail,
        }),
      }).then((message) => message.json());

const SliderCaptcha = ({
  callback,
  create,
  verify,
  text,
}) => {
  const [verified, setVerified] = useState(false);
  const submitResponse = (response, trail) =>
    new Promise((resolve) => {
      fetchVerification(verify)(response, trail)
        .then((verification) => {
          if (
            !verification.result ||
            verification.result !== 'success' ||
            !verification.token
          ) {
            resolve(false);
          } else {
            setTimeout(() => {
              callback(verification.token);
              setVerified(true);
            }, 500);
            resolve(true);
          }
        });
    });

    const [key, setKey] = useState(Math.random());
    const [captcha, setCaptcha] = useState(false);
    const isMounted = useRef(false);
    const fc = fetchCaptcha(create);
    const refreshCaptcha = () => {
      fc().then((newCaptcha) => {
        setTimeout(() => {
          if (!isMounted.current) return;
          setKey(Math.random());
          setCaptcha(newCaptcha);
        }, 300);
      });
    };
    const completeCaptcha = (response, trail) =>
      new Promise((resolve) => {
        submitResponse(response, trail).then((verified) => {
          if (verified) {
            resolve(true);
          } else {
            refreshCaptcha();
            resolve(false);
          }
        });
      });
  
    useEffect(() => {
      isMounted.current = true;
      refreshCaptcha();
      return () => { isMounted.current = false; };
    }, []);

    const imageDataUrl = (image) =>
    `data:image/png;base64,${Buffer.from(image).toString('base64')}`;
  
    const slider = {
      default: {
        track: 'scaptcha-card-slider-track-default',
        control: 'scaptcha-card-slider-control-default',
        icon: ( <div className="scaptcha-icon-container">
    <svg
      className="scaptcha-icon-light"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3.44 2.728"
      height="10.312"
      width="13"
    >
      <g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)">
        <path
          d="M.53 1.088c0-.012.008-.02.02-.02h.228L.71 1C.693.981.697.972.706.962c.01-.01.02-.006.034.006l.12.12-.125.126c-.01.008-.025.006-.03-.002-.01-.014-.008-.021.01-.04l.063-.063H.55C.533 1.11.53 1.1.53 1.09z"
          fill="#202020"
        />
      </g>
    </svg>
    <svg
      className="scaptcha-icon-dark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3.44 2.728"
      height="10.312"
      width="13"
    >
      <g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)">
        <path
          d="M.53 1.088c0-.012.008-.02.02-.02h.228L.71 1C.693.981.697.972.706.962c.01-.01.02-.006.034.006l.12.12-.125.126c-.01.008-.025.006-.03-.002-.01-.014-.008-.021.01-.04l.063-.063H.55C.533 1.11.53 1.1.53 1.09z"
          fill="#c6c6c6"
        />
      </g>
    </svg>
  </div>),
      },
      active: {
        track: 'scaptcha-card-slider-track-active',
        control: 'scaptcha-card-slider-control-active',
        icon: ( <div className="scaptcha-icon-container">
    <svg
      className="scaptcha-icon-light"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3.44 2.728"
      height="10.312"
      width="13"
    >
      <g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)">
        <path
          d="M.53 1.088c0-.012.008-.02.02-.02h.228L.71 1C.693.981.697.972.706.962c.01-.01.02-.006.034.006l.12.12-.125.126c-.01.008-.025.006-.03-.002-.01-.014-.008-.021.01-.04l.063-.063H.55C.533 1.11.53 1.1.53 1.09z"
          fill="#202020"
        />
      </g>
    </svg>
    <svg
      className="scaptcha-icon-dark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3.44 2.728"
      height="10.312"
      width="13"
    >
      <g transform="matrix(10.37411 0 0 10.37411 -5.49 -9.923)">
        <path
          d="M.53 1.088c0-.012.008-.02.02-.02h.228L.71 1C.693.981.697.972.706.962c.01-.01.02-.006.034.006l.12.12-.125.126c-.01.008-.025.006-.03-.002-.01-.014-.008-.021.01-.04l.063-.063H.55C.533 1.11.53 1.1.53 1.09z"
          fill="#c6c6c6"
        />
      </g>
    </svg>
  </div>),
      },
      success: {
        track: 'scaptcha-card-slider-track-success',
        control: 'scaptcha-card-slider-control-success',
        icon: ( <div className="scaptcha-icon-container">
        <svg
          className="scaptcha-icon-light"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3.44 2.728"
          height="10.312"
          width="13"
        >
          <path
            d="M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z"
            fill="#202020"
          />
        </svg>
        <svg
          className="scaptcha-icon-dark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3.44 2.728"
          height="10.312"
          width="13"
        >
          <path
            d="M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z"
            fill="#c6c6c6"
          />
        </svg>
      </div>),
      },
      failure: {
        track: 'scaptcha-card-slider-track-failure',
        control: 'scaptcha-card-slider-control-failure',
        icon: ( <div className="scaptcha-icon-container">
        <svg
          className="scaptcha-icon-light"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="10.312"
          viewBox="0 0 3.44 2.728"
        >
          <path
            d="M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z"
            fill="#202020"
          />
        </svg>
        <svg
          className="scaptcha-icon-dark"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="10.312"
          viewBox="0 0 3.44 2.728"
        >
          <path
            d="M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z"
            fill="#c6c6c6"
          />
        </svg>
      </div>),
      },
    };

    const [sliderVariant, setSliderVariant] = useState(slider.default);
  const [solving, setSolving] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(false);
  const [origin, setOrigin] = useState({
    x: 0,
    y: 0,
  });
  const [trail, setTrail] = useState({
    x: [0],
    y: [0],
  });

  // Converts distances along the control track to corresponding distances moved by the puzzle piece
  const scaleSliderPosition = (x) => 5 + 0.86 * x;

  const handleStart = (e) => {
    if (submittedResponse) return;
    setOrigin({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
    setSolving(true);
    setSliderVariant(slider.active);
  };

  const handleMove = (e) => {
    if (!solving || submittedResponse) return;
    const move = {
      x: (e.clientX || e.touches[0].clientX) - origin.x,
      y: (e.clientY || e.touches[0].clientY) - origin.y,
    };
    if (move.x > 225 || move.x < 0) return; // Don't update if outside bounds of captcha
    setTrail({
      x: trail.x.concat([move.x]),
      y: trail.y.concat([move.y]),
    });
  };

  const handleEnd = () => {
    if (!solving || submittedResponse) return;
    setSubmittedResponse(true);
    completeCaptcha(
      scaleSliderPosition(trail.x[trail.x.length - 1]),
      trail,
    ).then((validated) => {
      setSliderVariant(validated ? slider.success : slider.failure);
    });
  };

  const handleEnter = () => {
    if (solving || submittedResponse) return;
    setSliderVariant(slider.active);
  };

  const handleLeave = () => {
    if (solving) return;
    setSliderVariant(slider.default);
  };

  return (
    <div className="scaptcha-container">
      <style suppressHydrationWarning>{lightTheme}</style>
      <div>
        {!verified && (
          <div>
            <div className="scaptcha-card-container scaptcha-card-element">
              {captcha ? (
                <div
                className="scaptcha-card-element"
                draggable="false"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
              >
                <div
                  className="scaptcha-card-background scaptcha-card-element"
                  style={{
                    backgroundImage: `url('${imageDataUrl(captcha.background)}')`,
                  }}
                />
                <div
                  className="scaptcha-card-slider-puzzle scaptcha-card-element"
                  style={{
                    backgroundImage: `url('${imageDataUrl(captcha.slider)}')`,
                    left: `${scaleSliderPosition(trail.x[trail.x.length - 1])}px`,
                  }}
                  onMouseDown={handleStart}
                  onTouchStart={handleStart}
                />
                <div className="scaptcha-card-slider-container scaptcha-card-element">
                  <div className="scaptcha-card-slider-track scaptcha-card-element" />
                  <div
                    className="scaptcha-card-slider-label scaptcha-card-element"
                    style={{ opacity: solving ? 0 : 1 }}
                  >
                    <span>{text.challenge}</span>
                  </div>
                  <div
                    className={`scaptcha-card-slider-mask ${sliderVariant.track} scaptcha-card-element`}
                    style={{ width: `${trail.x[trail.x.length - 1] + 30}px` }}
                  />
                  <div
                    className="scaptcha-card-slider-container scaptcha-card-element"
                    draggable="false"
                  />
                  <div
                    className={`scaptcha-card-slider-control ${sliderVariant.control} scaptcha-card-element`}
                    style={{ left: `${trail.x[trail.x.length - 1]}px` }}
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    {sliderVariant.icon}
                  </div>
                </div>
              </div>
              ) : (
                <div className="scaptcha-card-loading scaptcha-card-element">
                   <svg width="38" height="38" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                        <stop stopColor="#a1a1a1" stopOpacity="0" offset="0%" />
                        <stop stopColor="#a1a1a1" stopOpacity=".631" offset="63.146%" />
                        <stop stopColor="#a1a1a1" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                      <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" strokeWidth="2">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <circle fill="#a1a1a1" cx="36" cy="18" r="1">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


SliderCaptcha.propTypes = {
  callback: PropTypes.func,
  create: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  verify: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  variant: PropTypes.string,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }),
};

SliderCaptcha.defaultProps = {
  callback: (token) => console.log(token), // eslint-disable-line no-console
  create: 'captcha/create',
  verify: 'captcha/verify',
  text: {
    anchor: 'I am human',
    challenge: 'Slide to finish the puzzle',
  },
};

export default SliderCaptcha;
