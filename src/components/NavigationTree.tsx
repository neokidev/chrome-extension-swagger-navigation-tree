import { Accordion } from "@mantine/core";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type NavigationTreeItem = {
  tagName: string;
  tagContents: {
    method: Method;
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

export const NavigationTree = ({ items }: NavigationTreeProps) => {
  return (
    <Accordion initialItem={-1} multiple iconPosition="right">
      {items.map(({ tagName, tagContents }) => (
        <Accordion.Item key={tagName} label={tagName}>
          <ul>
            {tagContents.map(
              ({ method, description, deprecated }, contentIndex) => (
                <li key={contentIndex} className="hover:cursor-pointer">
                  <label
                    className={`py-3 my-0 flex items-start ${
                      deprecated && "opacity-60"
                    }`}
                  >
                    <span
                      className="mr-2 mt-[1px] rounded text-white font-sans text-[0.5rem] font-semibold min-w-[3.5rem] px-2 text-center"
                      style={{
                        background: deprecated
                          ? DEPRECATED_CONTENT_METHOD_BACKGROUND_COLOR
                          : METHOD_BACKGROUND_COLORS[method],
                      }}
                    >
                      {method}
                    </span>
                    <span>{`${description}`}</span>
                  </label>
                </li>
              )
            )}
          </ul>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
