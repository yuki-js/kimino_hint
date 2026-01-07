import { Container } from "@/shared/ui/Container";
import { Stack, Button, Text, Card } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

export function QuizQuestionScreen() {
  const navigate = useNavigate();
  const { eventId, questionNo } = useParams<{ eventId: string; questionNo: string }>();

  // TODO: Fetch question from API/state
  const question = {
    text: "サンプル問題",
    choices: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  };

  const handleAnswer = (choiceIndex: number) => {
    // TODO: Save answer to state/API
    console.log("Selected choice:", choiceIndex);
    navigate(`/events/${eventId}/quiz/${questionNo}/answer`);
  };

  return (
    <Container title={`問題 ${questionNo}`}>
      <Stack gap="md" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={700} mb="md">
            {question.text}
          </Text>
        </Card>
        
        {question.choices.map((choice, index) => (
          <Button
            key={index}
            size="lg"
            variant="outline"
            onClick={() => handleAnswer(index)}
          >
            {choice}
          </Button>
        ))}

        <Button size="lg" variant="subtle" onClick={() => navigate(`/events/${eventId}`)}>
          ロビーに戻る
        </Button>
      </Stack>
    </Container>
  );
}
