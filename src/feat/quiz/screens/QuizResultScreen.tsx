import { Container } from "@/shared/ui/Container";
import { Stack, Button, Text, Card, Group, Badge } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

export function QuizResultScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();

  // TODO: Fetch quiz results from state/API
  const results = {
    totalQuestions: 5,
    correctAnswers: 3,
    score: 300,
  };

  return (
    <Container title="結果">
      <Stack gap="md" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="center" mb="md">
            <Badge size="xl" color="blue">
              スコア: {results.score}点
            </Badge>
          </Group>
          <Text ta="center" size="lg" fw={700} mb="sm">
            {results.correctAnswers} / {results.totalQuestions} 問正解
          </Text>
          <Text ta="center" c="dimmed">
            正答率: {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
          </Text>
        </Card>

        <Button size="lg" onClick={() => navigate(`/events/${eventId}/quiz`)}>
          もう一度挑戦
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate(`/events/${eventId}`)}>
          ロビーに戻る
        </Button>
        <Button size="lg" variant="subtle" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
