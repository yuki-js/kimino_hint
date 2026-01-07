import { MantineProvider, Center, Text, Button, Stack } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { theme } from './styles/theme';
import { useGuestAuth } from '@/shared/auth/useGuestAuth';
import '@mantine/core/styles.css';

function App() {
  const { ready, error, retry } = useGuestAuth();

  if (error) {
    return (
      <MantineProvider theme={theme}>
        <Center h="100vh">
          <Stack align="center" gap="md">
            <Text size="xl" fw={700}>認証に失敗しました</Text>
            <Text c="dimmed">{String(error.message || error)}</Text>
            <Button onClick={retry}>再試行</Button>
          </Stack>
        </Center>
      </MantineProvider>
    );
  }

  if (!ready) {
    return (
      <MantineProvider theme={theme}>
        <Center h="100vh">
          <Text size="xl">認証中...</Text>
        </Center>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
