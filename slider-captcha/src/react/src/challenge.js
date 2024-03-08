import React, { useState } from 'react';
import { ArrowIcon, SuccessIcon, FailureIcon } from './icons';

const imageDataUrl = (image) =>
  `data:image/png;base64,${image}`;

const slider = {
  default: {
    track: 'scaptcha-card-slider-track-default',
    control: 'scaptcha-card-slider-control-default',
    icon: <ArrowIcon />,
  },
  active: {
    track: 'scaptcha-card-slider-track-active',
    control: 'scaptcha-card-slider-control-active',
    icon: <ArrowIcon />,
  },
  success: {
    track: 'scaptcha-card-slider-track-success',
    control: 'scaptcha-card-slider-control-success',
    icon: <SuccessIcon />,
  },
  failure: {
    track: 'scaptcha-card-slider-track-failure',
    control: 'scaptcha-card-slider-control-failure',
    icon: <FailureIcon />,
  },
};

const Challenge = ({
  text,
  captcha,
  loaded,
  failed,
  completeCaptcha,
}) => {
  const { useState } = React;
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
    if (move.x > 246 || move.x < 0) return;
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
      // captcha.left
    );
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
          backgroundImage:
            captcha['captcha_image']
              ? `url('${imageDataUrl(captcha['captcha_image'])}')`
              : ``,
        }}
      />
      <div
        className="scaptcha-card-slider-puzzle scaptcha-card-element"
        style={{
          backgroundImage:
            loaded && captcha['captcha_slider']
              ? `url('${imageDataUrl(captcha['captcha_slider'])}')`
              : ``,
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
          <span>
            {failed && text.failed}
            {!failed && (!loaded ? text.loading : text.challenge)}
          </span>
        </div>
        <div
          className={`scaptcha-card-slider-mask ${sliderVariant.track} scaptcha-card-element`}
          style={{ width: `${trail.x[trail.x.length - 1] + 42}px` }}
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
  );
};

// Challenge.propTypes = {
//   completeCaptcha: PropTypes.func.isRequired,
//   captcha: PropTypes.shape({
//     slider: PropTypes.shape({
//       type: PropTypes.string,
//       data: PropTypes.arrayOf(PropTypes.number),
//     }),
//     background: PropTypes.shape({
//       type: PropTypes.string,
//       data: PropTypes.arrayOf(PropTypes.number),
//     }),
//   }).isRequired,
//   text: PropTypes.shape({
//     anchor: PropTypes.string,
//     challenge: PropTypes.string,
//   }).isRequired,
// };

export default Challenge;
