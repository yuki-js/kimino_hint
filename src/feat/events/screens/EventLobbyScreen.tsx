import { Container } from "@/shared/ui/Container";
import { Button, Stack, Text, Card, Group, Badge, Loader, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function EventLobbyScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const loadEvent = async () => {
      try {
        setLoading(true);
        const [eventData, attendeesData] = await Promise.all([
          apis.events().getEventById({ eventId: parseInt(eventId) }),
          apis.events().listEventAttendees({ eventId: parseInt(eventId) }),
        ]);
        setEvent(eventData);
        setAttendees(attendeesData);
      } catch (err) {
        setError("イベント情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  if (loading) {
    return (
      <Container title="ロビー">
        <Center mt="xl">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container title="ロビー">
        <Text c="red" ta="center" mt="xl">{error || "イベントが見つかりません"}</Text>
        <Button fullWidth mt="md" onClick={() => navigate("/home")}>ホームに戻る</Button>
      </Container>
    );
  }

  return (
    <Container title={event.meta?.name || "ロビー"}>
      <Stack gap="md" mt="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>イベント情報</Text>
            <Badge color={event.status === "active" ? "green" : "gray"}>
              {event.status}
            </Badge>
          </Group>
          {event.invitationCode && (
            <Text size="sm" c="dimmed">
              招待コード: <Text span fw={700}>{event.invitationCode}</Text>
            </Text>
          )}
          <Text size="sm" c="dimmed">
            参加者数: {attendees.length}名
          </Text>
        </Card>

        <Button size="lg" onClick={() => navigate(`/events/${eventId}/quiz`)}>
          クイズを開始
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate(`/events/${eventId}/live`)}>
          ライブ状況を見る
        </Button>
        <Button size="lg" variant="subtle" onClick={() => navigate("/home")}>
          ホームに戻る
        </Button>
      </Stack>
    </Container>
  );
}
