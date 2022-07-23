import { Container, List, Text } from "@mantine/core";
import { CSSProperties } from "react";
import {
  BACKGROUND_COLOR_ON_HOVER,
  TEXT_COLOR,
  TEXT_COLOR_ON_HOVER,
} from "./constants";
import { NavigationTreeTagContent } from "./NavigationTree";
import { SectionTitle } from "./SectionTitle";

type ModelsSectionProps = {
  style?: CSSProperties;
  items: string[];
  onModelClicked?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tagContent: NavigationTreeTagContent
  ) => void;
};

export const ModelsSection = ({
  style,
  items,
  onModelClicked,
}: ModelsSectionProps) => {
  return (
    <div style={style}>
      <SectionTitle title="models" />
      <List listStyleType="none">
        {items.map((tagContent, index) => (
          <List.Item key={index}>
            <Container
              sx={{
                padding: "0.25rem 1rem",
                display: "flex",
                alignItems: "start",
                color: TEXT_COLOR,
                "&:hover": {
                  backgroundColor: BACKGROUND_COLOR_ON_HOVER,
                  color: TEXT_COLOR_ON_HOVER,
                  cursor: "pointer",
                },
              }}
            >
              <Text size="sm" weight={400}>
                {tagContent}
              </Text>
            </Container>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
