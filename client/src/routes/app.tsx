import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight>([]);

  const fetchInsights = async () => {
    try {
      const response = await fetch(`/api/insights`);
      const result = await response.json();

      setInsights(result);
    } catch {
      console.log("an error happened!");
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights} getInsights={fetchInsights} />
    </main>
  );
};
