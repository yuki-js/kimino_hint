import { Container } from "@/shared/ui/Container";
import { Stack, Button, Text, Card, Badge } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

export function QuizAnswerScreen() {
  const navigate = useNavigate();
  const { eventId, questionNo } = useParams<{ eventId: string; questionNo: string }>();

  // TODO: Fetch answer result from state/API
  const result = {
    correct: true,
    explanation: "これは正解の説明です",
  };

  const nextQuestion = parseInt(questionNo || "1") + 1;

  return (
    <Container title="回答結果">
      <Stack gap="md" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Badge size="xl" color={result.correct ? "green" : "red"} mb="md">
            {result.correct ? "正解！" : "不正解"}
          </Badge>
          <Text>{result.explanation}</Text>
        </Card>

        <Button size="lg" onClick={() => navigate(`/events/${eventId}/quiz/${nextQuestion}`)}>
          次の問題へ
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate(`/events/${eventId}/result`)}>
          結果を見る
        </Button>
        <Button size="lg" variant="subtle" onClick={() => navigate(`/events/${eventId}`)}>
          ロビーに戻る
        </Button>
      </Stack>
    </Container>
  );
}
