import React from "react";
import useFetch from "../hook/useFetch";
import { IprofilesTable } from "../interfaces/Itable";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { useTranslation } from "react-i18next";
import CustomTable from "../components/tables/customTable/CustomTable";

function Profiles() {
  const { t } = useTranslation();
  const url =
    "https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile";

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count: 150,
      country_code: "en_IN",
      aadhar: true,
      dl: true,
      credit: true,
      debit: true,
      pan: true,
      passport: true,
      ssn: false,
    }),
  };

  const { data, error, status } = useFetch<IprofilesTable>(url, postOptions);
  let profileTable;

  if (status === "loading") {
    profileTable = <LoadingSpinner />;
  }
  if (error) {
    profileTable = <span>No data available </span>;
  }

  if (status === "fetched" && data) {
    profileTable = (
      <CustomTable limit={10} headData={data.columns} bodyData={data.data} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("profiles")}</h2>
      {profileTable}
    </section>
  );
}

export default Profiles;
