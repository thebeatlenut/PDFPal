import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import CustomSnackbar from "./components/CustomSnackbar.tsx";
import { store } from "./store";
import { theme } from "./styles";

ReactDOM.createRoot(document.getElementById("root")! as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CustomSnackbar>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CustomSnackbar>
    </ThemeProvider>
  </Provider>
);
