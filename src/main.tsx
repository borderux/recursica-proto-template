import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import "../recursica_variables_scoped.css";
import "@recursica/mantine-adapter/style.css";
import { MantineProvider } from "@mantine/core";
import { RecursicaThemeProvider } from "@recursica/mantine-adapter";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RecursicaThemeProvider theme="light">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecursicaThemeProvider>
    </MantineProvider>
  </StrictMode>,
);
