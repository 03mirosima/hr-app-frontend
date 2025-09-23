import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./Login/Login";
import Layout from "./Layout/Layout";
import EmployeeForm from "./Employee/EmployeeForm";
import Welcome from "./Welcome/Welcome";
import LayoutWelcome from "./Layout/LayoutWelcome";
import EmployeeList from "./Employee/EmployeeList";
function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<LayoutWelcome />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="employeelist" element={<EmployeeList />} />
          <Route path="employeeform" element={<EmployeeForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
