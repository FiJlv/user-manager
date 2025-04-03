import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline} from '@mui/material';
import { UserTable } from './components/UserTable';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <UserTable />
      </QueryClientProvider>
    </>
  );
}

export default App;
