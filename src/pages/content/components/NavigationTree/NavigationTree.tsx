import { GeneralSection } from "./GeneralSection";
import { ModelsSection } from "./ModelsSection";

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

export const NavigationTree = ({
  items,
  onTitleClicked,
  onContentClicked,
}: NavigationTreeProps) => {
  return (
    <div style={{}}>
      <GeneralSection
        style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
        items={items}
        onTitleClicked={onTitleClicked}
        onContentClicked={onContentClicked}
      />
      <ModelsSection
        style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
        items={["1", "2", "3"]}
      />
    </div>
  );
};
