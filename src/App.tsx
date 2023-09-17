import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Components/Home"));
const Learn = lazy(() => import("./Components/Learn"));
const LangQuiz = lazy(() => import("./Components/LangQuiz"));
const Result = lazy(() => import("./Components/Result"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<LangQuiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
