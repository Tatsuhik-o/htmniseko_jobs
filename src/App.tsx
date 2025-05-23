import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useResponsiveView from "./hooks/useResponsiveView";
import Main from "./layouts/Main";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import JobOffer from "./pages/JobOffer";
import WithAuth from "./layouts/WithAuth";
import AddNewJob from "./pages/AddNewJob";
import { AppContext } from "./utils/context";
import Success from "./pages/Success";

function App() {
  const mobileView = useResponsiveView();
  return (
    <AppContext.Provider value={{ mobileView }}>
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
  );
}

export default App;
