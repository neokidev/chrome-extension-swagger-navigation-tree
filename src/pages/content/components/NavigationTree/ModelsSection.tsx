import { Container, List, Text } from "@mantine/core";
import { CSSProperties } from "react";
import {
  BACKGROUND_COLOR_ON_HOVER,
  TEXT_COLOR,
  TEXT_COLOR_ON_HOVER,
} from "./constants";
import { SectionTitle } from "./SectionTitle";

export type NavigationTreeModel = {
  id: string;
  name: string;
};

type ModelsSectionProps = {
  style?: CSSProperties;
  models: NavigationTreeModel[];
  onModelClicked?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    model: NavigationTreeModel
  ) => void;
};

export const ModelsSection = ({
  style,
  models,
  onModelClicked,
}: ModelsSectionProps) => {
  return (
    <div style={style}>
      <SectionTitle title="models" />
      <List listStyleType="none">
        {models.map((model, index) => (
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
              onClick={
                onModelClicked
                  ? (event) => onModelClicked(event, model)
                  : undefined
              }
            >
              <Text size="sm" weight={400}>
                {model.name}
              </Text>
            </Container>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
