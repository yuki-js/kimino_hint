import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Card, Loader, Center, Badge } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function EventLiveScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const loadAttendees = async () => {
      try {
        setLoading(true);
        const data = await apis.events().listEventAttendees({
          eventId: parseInt(eventId),
        });
        setAttendees(data);
      } catch (err) {
        console.error("Failed to load attendees:", err);
        setError("参加者情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadAttendees();
    
    // TODO: Implement SSE connection for live updates
    // const eventSource = new EventSource(`/api/events/${eventId}/live`);
    // eventSource.onmessage = (event) => { ... };
  }, [eventId]);

  if (loading) {
    return (
      <Container title="ライブ状況">
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container title="ライブ状況">
        <Text c="red" ta="center" mt="xl">{error}</Text>
        <Button fullWidth mt="md" onClick={() => navigate(`/events/${eventId}`)}>
          ロビーに戻る
        </Button>
      </Container>
    );
  }

  return (
    <Container title="ライブ状況">
      <Stack gap="md" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={500} mb="md">参加者一覧</Text>
          <Text size="sm" c="dimmed" mb="md">
            合計 {attendees.length} 名
          </Text>
        </Card>

        {attendees.map((attendee) => (
          <Card key={attendee.id} shadow="sm" padding="sm" radius="md" withBorder>
            <Text size="sm">参加者 ID: {attendee.attendeeUserId}</Text>
            <Badge size="sm" color="green">参加中</Badge>
          </Card>
        ))}

        <Button size="lg" variant="light" onClick={() => navigate(`/events/${eventId}`)}>
          ロビーに戻る
        </Button>
      </Stack>
    </Container>
  );
}
