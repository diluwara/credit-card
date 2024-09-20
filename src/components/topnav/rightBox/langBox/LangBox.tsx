import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Icon } from "@iconify/react";
import { useOnClickOutside } from "usehooks-ts";
import LangContext from "../../../../store/langContext";

import classes from "./LangBox.module.scss";

function LangBox() {
  const [showLangBox, setShowLangBox] = useState(false);
  const langBoxRef = useRef<HTMLDivElement>(null);
  const langCtx = useContext(LangContext);
  const lang = langCtx.lang;

  const showBoxHandler = function toDo() {
    setShowLangBox((prev) => !prev);
  };

  // Update text direction based on the language selection
  useEffect(() => {
    document.documentElement.dir = "ltr"; // All languages left-to-right
    document.documentElement.lang = "en"; // Set the language code
  }, [lang]);

  const checkIfClickedOutside = useCallback(() => {
    if (showLangBox && langBoxRef.current) {
      setShowLangBox(false);
    }
  }, [showLangBox]);

  useOnClickOutside(langBoxRef, checkIfClickedOutside);

  return (
    <div className={classes.lang} ref={langBoxRef}>
      <div className={classes.lanBox} onClick={showBoxHandler}>
        <Icon icon="clarity:language-line" width="20" />
        <div className={classes.lang_slc}>{lang}</div>
        <Icon icon="ep:arrow-down-bold" width="10" />
      </div>
      <div
        className={`${classes.lang_menu} ${showLangBox ? classes.show : ""}`}
      >
        {/* English (en) */}
        <div
          onClick={() => {
            langCtx.toggleLanguage("en");
            showBoxHandler();
          }}
        >
          English (en)
        </div>

        {/* Bengali (bn) */}
        <div
          onClick={() => {
            langCtx.toggleLanguage("bn");
            showBoxHandler();
          }}
        >
          Bengali (bn)
        </div>

        {/* Hindi (hi) */}
        <div
          onClick={() => {
            langCtx.toggleLanguage("hi");
            showBoxHandler();
          }}
        >
          Hindi (hi)
        </div>
      </div>
    </div>
  );
}

export default LangBox;
