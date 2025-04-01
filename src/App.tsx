import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, Container, Typography } from '@mui/material';
import { UserTable } from './components/UserTable';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Користувачі
        </Typography>
        <UserTable />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
