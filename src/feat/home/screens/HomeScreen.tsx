import { Container } from "@/shared/ui/Container";
import { Stack, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <Container title="キミのヒント">
      <Stack gap="md" mt="xl">
        <Group grow>
          <Button size="lg" onClick={() => navigate("/events/join")}>
            ルームに参加
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/events/new")}>
            ルームを作成
          </Button>
        </Group>
        <Group grow>
          <Button size="lg" variant="light" onClick={() => navigate("/me/profile")}>
            マイプロフィール
          </Button>
          <Button size="lg" variant="light" onClick={() => navigate("/profiles")}>
            プロフィール一覧
          </Button>
        </Group>
        <Group grow>
          <Button size="lg" variant="subtle" onClick={() => navigate("/qr/scan")}>
            QRコードを読み取る
          </Button>
          <Button size="lg" variant="subtle" onClick={() => navigate("/qr/profile")}>
            QRコードを表示
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
