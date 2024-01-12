import { RouterProvider } from "react-router-dom";
import styles from "./app.module.less";
import router from "@/router";
import { Suspense } from "react";

function App() {
  return (
    <div className={styles.app}>
      <Suspense fallback={<div>loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
