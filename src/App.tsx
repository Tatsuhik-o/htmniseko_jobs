import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import useResponsiveView from "./hooks/useResponsiveView";
import Main from "./layouts/Main";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import JobOffer from "./pages/JobOffer";
import WithAuth from "./layouts/WithAuth";
import AddNewJob from "./pages/AddNewJob";
import { AppContext } from "./utils/context";
import Success from "./pages/Success";
import useThemeMode from "./hooks/useThemeMode";

function App() {
  const mobileView = useResponsiveView();
  const { currentTheme, handleThemeChange, themeMode } = useThemeMode(1000);
  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ".MuiBox-root": {
            backgroundColor: themeMode.palette.background.default,
            color: themeMode.palette.text.primary,
            border: `1px solid ${themeMode.palette.secondary.main}`,
          },
          span: {
            backgroundColor: "inherit !important",
            color: "inherit !important",
          },
          strong: {
            backgroundColor: "transparent !important",
            color: "inherit !important",
          },
        }}
      />
      <AppContext.Provider
        value={{ mobileView, handleThemeChange, currentTheme, themeMode }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Main />}>
              <Route path="*" element={<Careers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={<Success />} />
              <Route path="/careers/:job_id" element={<JobOffer />} />
              <Route element={<WithAuth />}>
                <Route path="/add_new_job" element={<AddNewJob />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
