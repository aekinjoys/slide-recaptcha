import "./styles.css";
import SliderCaptcha from "./react/src/slider-captcha";
// import SliderCaptcha from "../test/slider-captcha";

export default function App() {
  function verifiedCallback(token) {
    console.log("Captcha token: " + token);
  }

  const domain = "http://34.149.81.171/poc-captcha-image-generator/";
  const createDefault = `${domain}captcha`;
  const createAbstract = `${domain}captcha-abstract-image-jigsaw-piece`;
  const createImageFile = `${domain}captcha-jigsaw-piece-from-image-file`;

  return (
    <SliderCaptcha
    />
  );
}
