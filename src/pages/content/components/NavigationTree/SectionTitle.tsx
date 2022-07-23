import { Text } from "@mantine/core";

type SectionTitleProps = {
  title: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <Text
      style={{
        marginLeft: "0.75rem",
        marginBottom: "0.5rem",
        color: "rgb(107 114 128)",
      }}
      size="sm"
      weight={300}
    >
      {title.toUpperCase()}
    </Text>
  );
};
