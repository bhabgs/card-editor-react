import { createRandomId } from "@/utils";
import clientTools from "./clientTools";
import styles from "./index.module.less";
import { useEffect } from "react";

interface Iprops {
  code?: string;
  title?: string;
}
const CardComponent = (props: Iprops) => {
  const id = createRandomId(8, "chart");
  const { code, title } = props;
  useEffect(() => {
    document.getElementById(id)!.innerHTML = "";
    try {
      const fun = new Function("utils", code || "");
      fun({ ...clientTools, dom: document.getElementById(id) });
    } catch (error) {}
  }, [code]);
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div id={id} className={styles.cardContent}></div>
    </div>
  );
};

export default CardComponent;
