import "./App.css";
import { useState } from "react";
import Calendy from "./Calendy";

function App() {
  const [value, setValue] = useState(new Date());
  const [type, setType] = useState("daily");
  console.log(type);
  return (
    <div className="App">
      <select onChange={(e) => setType(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>
      <Calendy type={type} selectedDate={value} setSelectedDate={setValue} />
    </div>
  );
}

export default App;
