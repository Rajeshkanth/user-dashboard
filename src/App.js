import { Provider } from "./components/Context";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Dashboard />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
