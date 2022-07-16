import { Accordion } from "@mantine/core";

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

export const NavigationTree = ({ items }: NavigationTreeProps) => {
  return (
    <Accordion
      classNames={{
        control: "hover:bg-gray-200 hover:text-blue-600",
        contentInner: "m-0 p-0",
      }}
      initialItem={-1}
      multiple
      iconPosition="right"
    >
      {items.map(({ tagName, tagContents }) => (
        <Accordion.Item key={tagName} label={tagName}>
          <ul>
            {tagContents.map(
              ({ method, path, description, deprecated }, contentIndex) => (
                <li key={contentIndex}>
                  <label
                    className={`px-4 py-2 flex items-start hover:bg-gray-200 hover:cursor-pointer hover:text-blue-600 ${
                      deprecated && "opacity-60"
                    }`}
                    style={{ marginBottom: "0px" }}
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
                    <span className="block">
                      <div className={deprecated ? "line-through" : ""}>
                        {path}
                      </div>
                      <div>{description}</div>
                    </span>
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
