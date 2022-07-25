import { Accordion, Container, List, Text } from "@mantine/core";
import { CSSProperties, useEffect, useRef } from "react";
import {
  BACKGROUND_COLOR_ON_HOVER,
  DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR,
  METHOD_BACKGROUND_COLORS,
  TEXT_COLOR,
  TEXT_COLOR_ON_HOVER,
} from "./constants";
import { SectionTitle } from "./SectionTitle";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type NavigationTreeTagContent = {
  id: string;
  method: Method;
  path: string;
  description: string;
  deprecated: boolean;
};

export type NavigationTreeTagSectionItem = {
  id: string;
  name: string;
  description: string;
  tagContents: NavigationTreeTagContent[];
};

type GeneralSectionProps = {
  style?: CSSProperties;
  tagSectionItems: NavigationTreeTagSectionItem[];
  onTitleClicked?: (
    event: MouseEvent,
    tagSectionItem: NavigationTreeTagSectionItem
  ) => void;
  onContentClicked?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tagContent: NavigationTreeTagContent
  ) => void;
};

export const GeneralSection = ({
  style,
  tagSectionItems,
  onTitleClicked,
  onContentClicked,
}: GeneralSectionProps) => {
  const controlRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    controlRefs.current.forEach((ref, index) => {
      if (ref && onTitleClicked) {
        ref.onclick = (event) => onTitleClicked(event, tagSectionItems[index]);
      }
    });
  }, [tagSectionItems, onTitleClicked]);

  return (
    <div style={style}>
      <SectionTitle title="general" />
      <Accordion
        styles={{
          control: {
            color: TEXT_COLOR,
            padding: "0.5rem 1rem",
            "&:hover": {
              backgroundColor: BACKGROUND_COLOR_ON_HOVER,
              color: TEXT_COLOR_ON_HOVER,
            },
          },
          contentInner: {
            margin: 0,
            padding: 0,
          },
        }}
        initialItem={-1}
        multiple
        iconPosition="right"
      >
        {tagSectionItems.map(({ name, tagContents }) => (
          <Accordion.Item
            key={name}
            label={name}
            controlRef={(instance) => controlRefs.current.push(instance)}
          >
            <List listStyleType="none">
              {tagContents.map((tagContent) => (
                <List.Item key={tagContent.id}>
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
                      onContentClicked
                        ? (event) => onContentClicked(event, tagContent)
                        : undefined
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        opacity: tagContent.deprecated ? 0.6 : 1.0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "11px",
                          width: "3rem",
                          color: tagContent.deprecated
                            ? DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR
                            : METHOD_BACKGROUND_COLORS[tagContent.method],
                          transform: "translateY(0.125rem)",
                        }}
                        weight={600}
                      >
                        {tagContent.method}
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          textDecoration: tagContent.deprecated
                            ? "line-through"
                            : "none",
                        }}
                        size="sm"
                        weight={400}
                      >
                        {tagContent.path}
                      </Text>
                    </div>
                  </Container>
                </List.Item>
              ))}
            </List>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};
