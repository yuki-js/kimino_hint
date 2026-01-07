import { Container } from "@/shared/ui/Container";
import { Stack, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function QrHubScreen() {
  const navigate = useNavigate();

  return (
    <Container title="QRコード">
      <Stack gap="md" mt="xl">
        <Group grow>
          <Button size="lg" onClick={() => navigate("/qr/scan")}>
            QRをスキャン
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/qr/profile")}>
            QRを表示
          </Button>
        </Group>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
