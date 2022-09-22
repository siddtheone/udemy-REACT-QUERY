import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";

const queryClinet = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <div className="grid">
          <InfinitePeople />
          <InfiniteSpecies />
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
