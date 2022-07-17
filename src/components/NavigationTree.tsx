import { Accordion, Group, List, Text } from "@mantine/core";
import { useEffect, useRef } from "react";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

type NavigationTreeTagContent = {
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
        <Text className="font-[sans-serif]" size="lg">
          {name}
        </Text>
        <Text className="text-[13px]" weight={300}>
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
      classNames={{
        control: `hover:bg-gray-200 text-[${TEXT_COLOR}] hover:text-blue-500`,
        contentInner: "m-0 p-0",
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
          <List>
            {tagContents.map((tagContent) => (
              <List.Item key={tagContent.id}>
                <div
                  className={`px-4 py-1 flex items-start text-[${TEXT_COLOR}] hover:bg-gray-200 hover:cursor-pointer hover:text-blue-500 ${
                    tagContent.deprecated && "opacity-60"
                  }`}
                  onClick={
                    onContentClicked
                      ? (event) => onContentClicked(event, tagContent)
                      : undefined
                  }
                >
                  <span
                    className="mr-2 mt-1 rounded text-white font-sans text-[0.5rem] font-semibold min-w-[3.5rem] px-2 text-center"
                    style={{
                      background: tagContent.deprecated
                        ? DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR
                        : METHOD_BACKGROUND_COLORS[tagContent.method],
                    }}
                  >
                    {tagContent.method}
                  </span>
                  <span>
                    <Text
                      className={
                        tagContent.deprecated
                          ? "line-through font-[monospace]"
                          : "font-[monospace]"
                      }
                    >
                      {tagContent.path}
                    </Text>
                    <Text className="text-[13px]" weight={300}>
                      {tagContent.description}
                    </Text>
                  </span>
                </div>
              </List.Item>
            ))}
          </List>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
