import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./Login/Login";
import Layout from "./Layout/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="a" element={<>dkdkd</>} />
          <Route path="b" element={<>dkdkd</>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
