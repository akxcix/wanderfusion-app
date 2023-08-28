import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
      <Button onClick={() => setCount(count + 1)}>Add</Button>
    </div>
  );
}

export default App;
