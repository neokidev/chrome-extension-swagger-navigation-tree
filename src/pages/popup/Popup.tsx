import { useForm } from "@mantine/form";
import {
  Group,
  Box,
  Text,
  Button,
  Container,
  Title,
  Divider,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useCallback, useEffect } from "react";
import { SwaggerUrlField } from "./components/SwaggerUrlField/SwaggerUrlField";

export type SwaggerUrlType = {
  url: string;
  enabled: boolean;
  key: string;
};

export type FormType = {
  swaggerUrls: SwaggerUrlType[];
};

const createInitialSwaggerUrl = () => ({
  url: "",
  enabled: true,
  key: randomId(),
});

function Popup() {
  const form = useForm({
    initialValues: {
      swaggerUrls: [createInitialSwaggerUrl()],
    },
  });

  const handleClickAddButton = useCallback(
    () => form.insertListItem("swaggerUrls", createInitialSwaggerUrl()),
    []
  );

  useEffect(() => {
    if (typeof chrome.storage === "undefined") return;

    chrome.storage.local
      .get("swaggerUrls")
      .then(
        ({ swaggerUrls }) => swaggerUrls && form.setValues({ swaggerUrls })
      );
  }, []);

  useEffect(() => {
    const { swaggerUrls } = form.values;
    chrome.storage.local.set({ swaggerUrls });
  }, [form]);

  return (
    <Container p="lg">
      <Title order={2} align="center">
        Swagger URL List
      </Title>

      <Divider my="md" />

      <Box sx={{ maxWidth: 500 }} mx="auto">
        {form.values.swaggerUrls.length === 0 && (
          <Text color="dimmed" align="center" size="sm">
            No one here...
          </Text>
        )}

        {form.values.swaggerUrls.map((item, index) => (
          <SwaggerUrlField key={index} form={form} item={item} index={index} />
        ))}

        <Group position="center" mt="md">
          <Button onClick={handleClickAddButton}>Add Swagger URL</Button>
        </Group>
      </Box>
    </Container>
  );
}

export default Popup;
