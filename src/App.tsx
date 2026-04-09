import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <header>
          <Navbar />
        </header>


        <Footer/>

      </div>
    </BrowserRouter>
    </>
  );
};