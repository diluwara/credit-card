import React, { useCallback, useState } from "react";
import { Itable as Props, complex } from "../../../interfaces/Itable";
import Card from "../../UI/card/Card";
import Modal from "../../UI/modal/Modal";
import { useTranslation } from "react-i18next";
import classes from "./CustomTable.module.scss";
import SearchBox from "../../topnav/searchBox/SearchBox";

const CustomTable: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function showModalHandler() {
    setShowModal((prev) => !prev);
  }
  function tableBody(item: complex, index: number) {
    /* type guard (in typescript) */
    if ("card_type" in item) {
      //for implementing top customers
      return (
        <tr key={index}>
          <td>{item.card_type}</td>
          <td>{item.card_provider}</td>
          <td>{item.card_number}</td>
          <td>{item.card_expiry}</td>
          <td>{item.digits}</td>
          <td>{item.cvv}</td>
        </tr>
      );
    } else if ("first_name" in item) {
      //for implementing customers table
      return (
        <tr key={item.debit_card_number}>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.sex}</td>
          <td>{item.dob}</td>
          <td>{item.father_name}</td>
          <td>{item.address}</td>
          <td>{item.aadhar}</td>
          <td>{item.credit_card_number}</td>
          <td>{item.credit_card_cvv}</td>
          <td>{item.credit_card_expiry}</td>
          <td>{item.credit_card_provider}</td>
          <td>{item.debit_card_number}</td>
          <td>{item.debit_card_cvv}</td>
          <td>{item.debit_card_expiry}</td>
          <td>{item.debit_card_provider}</td>
          <td>{item.driving_licence_number}</td>
          <td>{item.driving_licence_date_of_issue}</td>
          <td>{item.driving_licence_date_of_expiry}</td>
          <td>{item.pan_number}</td>
          <td>{item.pan_status}</td>
          <td>{item.passport_number}</td>
          <td>{item.passport_type}</td>
          <td>{item.passport_date_of_issue}</td>
          <td>{item.passport_date_of_expiry}</td>
          <td>{item.nationality}</td>
        </tr>
      );
    }
  }

  const initDataShow = () => {
    return props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;
  };

  const [dataShow, setDataShow] = useState(initDataShow);
  const [filteredData, setFilteredData] = useState<complex[]>([]);

  const filterData = (data: complex[], searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      setFilteredData(filterData(dataShow, term));
    },
    [dataShow]
  );

  let dataToShow: complex[];
  if (searchTerm.length > 0 && filteredData.length === 0) {
    dataToShow = []; // No data available case
  } else {
    dataToShow = searchTerm.length > 0 ? filteredData : dataShow;
  }

  let pages = 1;

  let range: number[] = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page: number) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    const newDataShow = props.bodyData?.slice(start, end);

    setDataShow(newDataShow);

    // If a search term exists, filter the new page data using that term
    if (searchTerm.length > 0) {
      setFilteredData(filterData(newDataShow, searchTerm));
    } else {
      setFilteredData([]); // Reset filtered data when there's no search term
    }
    setCurrPage(page);
  };

  const { t } = useTranslation();

  return (
    <>
      {/* modal for delete customer and product case*/}
      {showModal ? (
        <Modal
          title={t("deleteCustomer")}
          message={`${t("modalMessage")}`}
          onConfirm={showModalHandler}
        />
      ) : null}

      <div className={classes.container}>
        <Card
          header={
            <div className={classes.search_container}>
              <SearchBox value={searchTerm} onChange={handleSearchChange} />
            </div>
          }
          body={
            <div className={classes.wrapper}>
              <div className={classes.table__wrapper}>
                <table
                  className={props.limit ? classes.largeTable : classes.table}
                >
                  {props.headData ? (
                    <thead>
                      <tr>
                        {props.headData.map((item) => (
                          <th key={item.field}>{t(item.headerName)}</th>
                        ))}
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {dataToShow.length > 0 ? (
                      dataToShow.map((item, index) => tableBody(item, index))
                    ) : (
                      <tr>
                        <td colSpan={props.headData.length}>
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          }
          footer={
            <div>
              {" "}
              {pages > 1 ? (
                <div className={classes.table__pagination}>
                  {range.map((item, index) => (
                    <button
                      key={item}
                      className={`${classes.table__pagination_item} ${
                        currPage === index ? classes.active : ""
                      }`}
                      onClick={() => selectPage(index)}
                    >
                      {item + 1}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          }
        />
      </div>
    </>
  );
};

export default CustomTable;
