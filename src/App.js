import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./util/firebaseFunctions";
import { actionType } from "./context/reducer";
import MyHome from "./components/MyHome";
import About from "./components/About";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-20 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MyHome />}>
              <Route path="/home" element={<MainContainer />} />
              <Route path="/about" element={<About />} />
              <Route path="/createItem" element={<CreateContainer />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
