import { Accordion, List, Text } from "@mantine/core";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type NavigationTreeItem = {
  tagName: string;
  tagContents: {
    method: Method;
    path: string;
    description: string;
    deprecated: boolean;
  }[];
};

type NavigationTreeProps = {
  items: NavigationTreeItem[];
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

export const NavigationTree = ({ items }: NavigationTreeProps) => {
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
      {items.map(({ tagName, tagContents }) => (
        <Accordion.Item key={tagName} label={tagName}>
          <List>
            {tagContents.map(
              ({ method, path, description, deprecated }, contentIndex) => (
                <List.Item key={contentIndex}>
                  <div
                    className={`px-4 py-1 flex items-start text-[${TEXT_COLOR}] hover:bg-gray-200 hover:cursor-pointer hover:text-blue-500 ${
                      deprecated && "opacity-60"
                    }`}
                  >
                    <span
                      className="mr-2 mt-1 rounded text-white font-sans text-[0.5rem] font-semibold min-w-[3.5rem] px-2 text-center"
                      style={{
                        background: deprecated
                          ? DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR
                          : METHOD_BACKGROUND_COLORS[method],
                      }}
                    >
                      {method}
                    </span>
                    <span>
                      <Text
                        className={
                          deprecated
                            ? "line-through font-[monospace]"
                            : "font-[monospace]"
                        }
                      >
                        {path}
                      </Text>
                      <Text className="text-[13px]" weight={300}>
                        {description}
                      </Text>
                    </span>
                  </div>
                </List.Item>
              )
            )}
          </List>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
