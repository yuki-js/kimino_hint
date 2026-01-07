import { Container } from "@/shared/ui/Container";
import { TextInput, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "@/shared/api/client";

export function CreateEventScreen() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("タイトルを入力してください");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apis.events().createEvent({
        eventCreateRequest: {
          meta: { name: title.trim() },
          invitationCode: invitationCode.trim() || undefined,
        },
      });
      navigate(`/events/${result.id}`);
    } catch (err: any) {
      console.error("Event creation failed:", err);
      setError("イベントの作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container title="イベント作成">
      <Stack gap="md" mt="xl">
        <TextInput
          label="タイトル"
          placeholder="イベントのタイトル"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          size="lg"
          required
        />
        <TextInput
          label="招待コード（任意）"
          placeholder="カスタム招待コード"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.currentTarget.value)}
          size="lg"
        />
        {error && <Text c="red">{error}</Text>}
        <Button size="lg" onClick={handleCreate} loading={loading}>
          作成する
        </Button>
        <Button size="lg" variant="light" onClick={() => navigate("/home")}>
          戻る
        </Button>
      </Stack>
    </Container>
  );
}
