import { ICardsTable } from "../interfaces/Itable";
import useFetch from "../hook/useFetch";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { useTranslation } from "react-i18next";
import CustomTable from "../components/tables/customTable/CustomTable";

const HEADERDATA = [
  {
    headerName: "Card Provider",
    field: "card_provider",
  },
  {
    headerName: "Digits",
    field: "digits",
  },
  {
    headerName: "Card Number",
    field: "card_number",
  },
  {
    headerName: "Card Expiry",
    field: "card_expiry",
  },
  {
    headerName: "Card Type",
    field: "card_type",
  },
  {
    headerName: "CVV",
    field: "cvv",
  },
];

function Cards() {
  const { t } = useTranslation();
  const url =
    "https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/card/credit";

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count: 250,
      country_code: "en_IN",
    }),
  };

  const { data, error, status } = useFetch<ICardsTable>(url, postOptions);
  let cardTable;

  if (status === "loading") {
    cardTable = <LoadingSpinner />;
  }
  if (error) {
    cardTable = <span>No data available </span>;
  }

  if (status === "fetched" && data) {
    cardTable = (
      <CustomTable limit={10} headData={HEADERDATA} bodyData={data.data} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("cards")}</h2>
      {cardTable}
    </section>
  );
}

export default Cards;
