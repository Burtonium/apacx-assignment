import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  return (
    <div className="p-10">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="address" placeholder="Search for Address Messages" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </div>
    </div>
  );
}

export default App;
