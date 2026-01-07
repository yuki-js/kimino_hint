import { Container } from "@/shared/ui/Container";
import { TextInput, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function JoinEventScreen() {
  const navigate = useNavigate();
  const [invitationCode, setInvitationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!invitationCode.trim()) {
      setError("招待コードを入力してください");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apis.events().joinEventByCode({
        eventJoinByCodeRequest: {
          invitationCode: invitationCode.trim(),
        },
      });
      navigate(`/events/${result.eventId}`);
    } catch (err: any) {
      if (err?.status === 404) {
        setError("招待コードが見つかりません");
      } else if (err?.status === 409) {
        setError("既に参加しています");
      } else {
        setError("参加に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container title="ルームに参加">
      <Stack gap="md" mt="xl">
        <TextInput
          label="招待コード"
          placeholder="招待コードを入力"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          size="lg"
        />
        {error && <Text c="red">{error}</Text>}
        <Button size="lg" onClick={handleJoin} loading={loading}>
          参加する
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          戻る
        </Button>
      </Stack>
    </Container>
  );
}
