import { Accordion, Container, Group, List, Text } from "@mantine/core";
import { useEffect, useRef } from "react";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type NavigationTreeTagContent = {
  id: string;
  method: Method;
  path: string;
  description: string;
  deprecated: boolean;
};

export type NavigationTreeItem = {
  id: string;
  name: string;
  description: string;
  tagContents: NavigationTreeTagContent[];
};

type NavigationTreeProps = {
  items: NavigationTreeItem[];
  onTitleClicked?: (event: MouseEvent, tagSection: NavigationTreeItem) => void;
  onContentClicked?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tagContent: NavigationTreeTagContent
  ) => void;
};

const METHOD_BACKGROUND_COLORS = {
  GET: "#61affe",
  POST: "#49cc90",
  PUT: "#fca130",
  DELETE: "#f93e3e",
};

const DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR = "#ebebeb";

const TEXT_COLOR = "#3b4151";
const LINK_COLOR = "#4990e2";

export const NavigationTree = ({
  items,
  onTitleClicked,
  onContentClicked,
}: NavigationTreeProps) => {
  const controlRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    controlRefs.current.forEach((ref, index) => {
      if (ref && onTitleClicked) {
        ref.onclick = (event) => onTitleClicked(event, items[index]);
      }
    });
  }, [items, onTitleClicked]);

  return (
    <Accordion
      styles={{
        control: {
          color: TEXT_COLOR,
          "&:hover": {
            backgroundColor: "rgb(229 231 235)",
            color: "rgb(59 130 246)",
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
      {items.map(({ name, tagContents }) => (
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
                      backgroundColor: "rgb(229 231 235)",
                      cursor: "pointer",
                      color: "rgb(59 130 246)",
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
  );
};
