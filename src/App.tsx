import { useState } from "react";
import { Button } from "./components/ui/button";
import { TypographyP } from "./components/ui/typography";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TypographyP>{count}</TypographyP>
      <Button onClick={() => setCount(count + 1)}>Add</Button>
    </div>
  );
}

export default App;
