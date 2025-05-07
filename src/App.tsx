import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useResponsiveView from "./hooks/useResponsiveView";
import { useTheme } from "./hooks/useTheme";
import Main from "./layouts/Main";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import JobOffer from "./pages/JobOffer";
import WithAuth from "./layouts/WithAuth";
import AddNewJob from "./pages/AddNewJob";
import { AppContext } from "./utils/context";

function App() {
  const mobileView = useResponsiveView();
  const { theme, setTheme } = useTheme();
  return (
    <AppContext.Provider value={{ mobileView, theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />}>
            <Route path="*" element={<Careers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/careers/:job_id" element={<JobOffer />} />
            <Route element={<WithAuth />}>
              <Route path="/add_new_job" element={<AddNewJob />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
