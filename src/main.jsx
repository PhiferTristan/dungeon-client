import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { DungeonDocs } from "./DungeonDocs";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <DungeonDocs />
  </BrowserRouter>
);
