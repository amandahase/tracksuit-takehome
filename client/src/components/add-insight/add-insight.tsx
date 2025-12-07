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
    /** PSEUDO CODE:
     * 1. have a body object that contains all of the necessary information to pass to the DB table matching with the insights schema (id, brandId, date, text)
     * 2. that body object would then be passed into the call as the request body
     * 3. we would wait for that call to finish before continuing
     * 4. a successful create, would add the created insight to the list of insights in the DB and that would then be displayed on the page
     * 5. an errored call would display a message about the error instead
     */

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

  const handleBrandChange = (e) => {
    setBrandValue(Number(e.target.value));
  };

  const handleInsightText = (e) => {
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
