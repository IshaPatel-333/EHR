import { Route, Routes } from "react-router-dom";
import "../App.css";
import Data from "./Data/Data";
import FormData from "./Form/FormData"; // ✅ Updated import
import Navbar from "./Navbar/Navbar";
import Option from "./Option/Option";
import UploadImage from "../UploadImage"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../store/interactions";
import config from "../config.json";
import Alert from "./Alert/Alert";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    const medical_config = config[chainId].medical;

    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    const medical = loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider, medical, dispatch);
    subscribeToEvents(medical, dispatch);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []); // ✅ Removed dependency to avoid infinite loop

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
        <Option />
        <Routes>
          <Route path="/" exact element={<FormData />} /> {/* ✅ Updated route */}
          <Route path="/Data" element={<Data />} />
          <Route path="/upload" element={<UploadImage />} />
        </Routes>
        <Alert />
      </div>
    </div>
  );
}

export default App;
