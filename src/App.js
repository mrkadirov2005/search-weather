import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountryWeather,
  fetchData,
  getWindowWidth,
} from "./features/weatherSlice";
import CustomInfo from "./pages/CustomInfo";
import {
  getErrorcontidion,
  getNotifications,
  getPrevWidth,
} from "./features/selectors/selectors";
import "./App.css";
import { useEffect } from "react";
import NotificationsPage from "./pages/Notifications";
import SetNotTimeModal from "./modals/setNotTimeModal";

function App() {
  useEffect(() => {
    if (window.localStorage.getItem("initial")) {
      dispatch(fetchCountryWeather(window.localStorage.getItem("initial")));
    } else {
      const location = prompt("Type your current location:");
      window.localStorage.setItem("initial", JSON.stringify(location));
      dispatch(fetchCountryWeather(location));
    }
  }, []);


  const dispatch = useDispatch();
  const prevWidth = useSelector(getPrevWidth);
  console.log(prevWidth);

  window.innerWidth !== prevWidth
    ? dispatch(getWindowWidth())
    : console.log(prevWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      return dispatch(getWindowWidth());
    });
  }, []);

  const notificationsData=useSelector(getNotifications)

  const render = () => {
    dispatch(fetchData());
  };
  render();
  const isError = useSelector(getErrorcontidion);

  return (
    <div className="App">
      <CustomInfo />
      <NotificationsPage />
      {notificationsData.isOpen==true?<SetNotTimeModal />:""}
    </div>
  );
}

export default App;
