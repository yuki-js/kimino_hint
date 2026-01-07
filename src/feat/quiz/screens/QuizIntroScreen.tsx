import { Container } from "@/shared/ui/Container";
import { Stack, Button, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

export function QuizIntroScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();

  return (
    <Container title="クイズ開始">
      <Stack gap="md" mt="xl">
        <Text ta="center" size="lg">
          クイズを始める準備はできましたか？
        </Text>
        <Text ta="center" c="dimmed">
          問題に答えて、ポイントを獲得しましょう
        </Text>
        <Button size="lg" onClick={() => navigate(`/events/${eventId}/quiz/1`)}>
          スタート
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate(`/events/${eventId}`)}>
          ロビーに戻る
        </Button>
      </Stack>
    </Container>
  );
}
