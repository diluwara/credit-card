import React from "react";
import { useTranslation } from "react-i18next";
import DashboardTables from "../components/tables/DashboardTables";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="title">{t("dashboard")}</h2>
      <DashboardTables />
    </section>
  );
}

export default Dashboard;
