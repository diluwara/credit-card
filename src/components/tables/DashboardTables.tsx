import { Link } from "react-router-dom";
import classes from "./DashboardTables.module.scss";
import { useTranslation } from "react-i18next";

const Table = () => {
  const { t } = useTranslation();
  return (
    <section className={classes.table}>
      <div
        className={`${classes.table__top__customers} ${classes.table__child}`}
      >
        <div className={classes.table__title}>
          <p className="subTitle">{t("profiles")}</p> 
          <Link to="/profiles">{t("viewAll")}</Link>
        </div>
        {/* <CustomTable
          headData={data.head}
          bodyData={data.body}
        /> */}
      </div>
      <div
        className={`${classes.table__latest__orders} ${classes.table__child}`}
      >
        <div className={classes.table__title}>
          <p className="subTitle">{t("cards")}</p>
          <Link to="/cards">{t("viewAll")}</Link>
        </div>
        {/* <CustomTable
          headData={data.header}
          bodyData={data.body}
        /> */}
      </div>
    </section>
  );
};

export default Table;
