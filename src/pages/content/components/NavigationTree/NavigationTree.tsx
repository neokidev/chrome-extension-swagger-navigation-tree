import {
  GeneralSection,
  NavigationTreeTagContent,
  NavigationTreeTagSectionItem,
} from "./GeneralSection";
import { ModelsSection, NavigationTreeModel } from "./ModelsSection";

type NavigationTreeProps = {
  tagSectionItems: NavigationTreeTagSectionItem[];
  models: NavigationTreeModel[];
  onTitleClicked?: (
    event: MouseEvent,
    tagSection: NavigationTreeTagSectionItem
  ) => void;
  onContentClicked?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tagContent: NavigationTreeTagContent
  ) => void;
  onModelClicked?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    model: NavigationTreeModel
  ) => void;
};

export const NavigationTree = ({
  tagSectionItems,
  models,
  onTitleClicked,
  onContentClicked,
  onModelClicked,
}: NavigationTreeProps) => {
  return (
    <div style={{}}>
      <GeneralSection
        style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
        tagSectionItems={tagSectionItems}
        onTitleClicked={onTitleClicked}
        onContentClicked={onContentClicked}
      />
      <ModelsSection
        style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
        models={models}
        onModelClicked={onModelClicked}
      />
    </div>
  );
};
