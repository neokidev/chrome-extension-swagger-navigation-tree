import { Accordion, Center, Container, Group, List, Text } from "@mantine/core";
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

interface AccordionLabelProps {
  name: string;
  description: string;
}

const AccordionLabel = ({ name, description }: AccordionLabelProps) => {
  return (
    <Group noWrap>
      <div>
        <Text>{name}</Text>
        <Text size="xs" weight={300} color="gray">
          {description}
        </Text>
      </div>
    </Group>
  );
};

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
      {items.map(({ name, description, tagContents }) => (
        <Accordion.Item
          key={name}
          label={
            <AccordionLabel key={name} name={name} description={description} />
          }
          controlRef={(instance) => controlRefs.current.push(instance)}
        >
          <List listStyleType="none">
            {tagContents.map((tagContent) => (
              <List.Item key={tagContent.id}>
                <Container
                  sx={{
                    padding: "0.125rem 1rem",
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
                  <div style={{ display: "flex" }}>
                    <Center
                      style={{
                        marginTop: "0.3rem",
                        width: "3rem",
                        height: "0.8rem",
                        borderRadius: "0.2rem",
                        fontSize: "0.5rem",
                        fontWeight: 600,
                        color: "white",
                        backgroundColor: tagContent.deprecated
                          ? DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR
                          : METHOD_BACKGROUND_COLORS[tagContent.method],
                      }}
                    >
                      {tagContent.method}
                    </Center>
                    <div style={{ marginLeft: "0.375rem", flex: "1" }}>
                      <Text size="sm">{tagContent.path}</Text>
                      <Text size="xs" weight={300} color="gray">
                        {tagContent.description}
                      </Text>
                    </div>
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
