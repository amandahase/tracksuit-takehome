import { useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const [brandValue, setBrandValue] = useState<number>(BRANDS[0].id);
  const [insightText, setInsightText] = useState<string>("");

  const addInsight = async () => {
    const responseBody = {
      brand: brandValue,
      createdAt: (new Date()).toISOString(),
      text: insightText,
    };

    try {
      const response = await fetch("/api/insights/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseBody),
      });

      const newInsight = await response.json();

      return newInsight;
    } catch {
      console.log("error happened");
    }
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandValue(Number(e.target.value));
  };

  const handleInsightText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInsightText(e.target.value);
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          Brand
          <select
            className={styles["field-input"]}
            onChange={handleBrandChange}
          >
            {BRANDS.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            onChange={handleInsightText}
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
