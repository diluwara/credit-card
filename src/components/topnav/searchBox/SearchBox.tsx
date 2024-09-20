import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import classes from "./SearchBox.module.scss";

interface SearchBoxProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ value, onChange }: Readonly<SearchBoxProps>) {
  const { t } = useTranslation();

  return (
    <div className={classes.searchBox}>
      <Icon
        icon="fluent:search-28-filled"
        width="14"
        style={{ fontWeight: "bold" }}
      />
      <input
        type="search"
        placeholder={t("search")} // Dynamic translation for placeholder
        name="search"
        className={classes.searchBox_input}
        value={value} // Set the input value from props
        onChange={onChange} // Call onChange passed as prop
      />
    </div>
  );
}

export default SearchBox;
