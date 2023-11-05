import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { generate } from "generate-password-browser";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function App() {
  const [passLength, setPassLength] = useState(8);
  const [checkbox, setCheckbox] = useState(0);
  const [passState, setPassState] = useState({
    length: passLength,
    numbers: false,
    symbols: false,
    lowercase: false,
    uppercase: false,
  });
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function getStrength() {
    if (checkbox == 1) {
      return { sthColor: "red", sthMsg: "TOO WEAK" };
    } else if (checkbox == 2) {
      return { sthColor: "orange", sthMsg: "WEAK" };
    } else if (checkbox == 3) {
      return { sthColor: "yellow", sthMsg: "MEDIUM" };
    } else if (checkbox == 4) {
      return { sthColor: "green", sthMsg: "STRONG" };
    } else {
      return { sthColor: "none", sthMsg: ":)" };
    }
  }

  const { sthColor, sthMsg } = getStrength();

  const strengthCss = {
    backgroundColor: sthColor,
    borderColor: sthColor,
  };

  function handleLengthChange(event) {
    const { value } = event.target;
    setPassLength(value);
    setPassState({ ...passState, length: value });
  }

  function handleCheckboxClick(event) {
    const { checked, name } = event.target;
    setPassState({ ...passState, [name]: checked });

    checked
      ? setCheckbox((preValue) => preValue + 1)
      : setCheckbox((preValue) => preValue - 1);
  }

  function handleGenerate() {
    const passwordXD = generate(passState);
    // console.log(passwordXD);
    return setPassword(passwordXD);
  }

  function handleCopyToCLip() {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    setIsCopied(true);
  }

  return (
    <>
      <p className="header">Password Generator</p>
      <div className="output">
        <input type="text" placeholder="P4$5WOrD!" value={password} readOnly />
        <CopyToClipboard text={password} onCopy={handleCopyToCLip}>
          <FontAwesomeIcon
            icon={isCopied ? faClipboardCheck : faClipboard}
            className="copyToClipboard"
          />
        </CopyToClipboard>
      </div>
      <div className="input">
        <div className="charLength">
          <p>Character Length</p>
          <p>{passLength}</p>
        </div>
        <div>
          <input
            type="range"
            name="char-length"
            id="char-length"
            min="8"
            max="64"
            onChange={handleLengthChange}
          />
        </div>
        <div className="checkBoxes">
          <div>
            <input
              type="checkbox"
              onClick={handleCheckboxClick}
              name="uppercase"
            />
            <label htmlFor="uppercase">Include Uppercase Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={handleCheckboxClick}
              name="lowercase"
            />
            <label htmlFor="lowercase">Include Lowercase Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={handleCheckboxClick}
              name="numbers"
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              onClick={handleCheckboxClick}
              name="symbols"
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
        <div className="strength">
          <p>STRENGTH</p>
          <div className="sth-mode-select">
            <p className="sth-mode">{sthMsg}</p>
            <div
              className="sth-mode-1"
              style={checkbox >= "1" ? strengthCss : null}
            ></div>
            <div
              className="sth-mode-2"
              style={checkbox >= "2" ? strengthCss : null}
            ></div>
            <div
              className="sth-mode-3"
              style={checkbox >= "3" ? strengthCss : null}
            ></div>
            <div
              className="sth-mode-4"
              style={checkbox >= "4" ? strengthCss : null}
            ></div>
          </div>
        </div>
        <button className="generate-btn" onClick={handleGenerate}>
          GENERATE <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
}
