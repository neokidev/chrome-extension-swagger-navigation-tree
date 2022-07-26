import { ActionIcon, Group, Switch, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons";
import { useCallback } from "react";
import { FormType, SwaggerUrlType } from "../../Popup";

const defaultSwaggerUrlPlaceholder = "https://petstore.swagger.io/";

type SwaggerUrlFieldProps = {
  form: UseFormReturnType<FormType>;
  item: SwaggerUrlType;
  index: number;
};

export const SwaggerUrlField = ({
  form,
  item,
  index,
}: SwaggerUrlFieldProps) => {
  const onClickRemoveIcon = useCallback(
    () => form.removeListItem("swaggerUrls", index),
    []
  );

  return (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder={defaultSwaggerUrlPlaceholder}
        required
        sx={{ flex: 1 }}
        {...form.getInputProps(`swaggerUrls.${index}.url`)}
      />
      <Switch
        label={
          <Text
            style={{ width: "2.75rem" }}
            color={item.enabled ? "dark" : "dimmed"}
            size="xs"
          >
            {item.enabled ? "Enabled " : "Disabled"}
          </Text>
        }
        {...form.getInputProps(`swaggerUrls.${index}.enabled`, {
          type: "checkbox",
        })}
      />
      <ActionIcon color="red" onClick={onClickRemoveIcon}>
        <IconTrash size={24} />
      </ActionIcon>
    </Group>
  );
};
