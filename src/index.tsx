import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Method,
  NavigationTree,
  NavigationTreeItem,
  NavigationTreeTagContent,
} from "./components/NavigationTree";

const NAVIGATION_TREE_WIDTH = "260px";

const onLoadedSwaggerTagSectionsAndModelContainers = (
  callback: (
    tagSections: HTMLCollectionOf<Element>,
    modelContainers: HTMLCollectionOf<Element>
  ) => void
) => {
  const intervalID = setInterval(() => {
    const tagSections = document.getElementsByClassName("opblock-tag-section");
    const modelContainers = document.getElementsByClassName("model-container");

    if (tagSections.length && modelContainers.length) {
      callback(tagSections, modelContainers);
      clearInterval(intervalID);
    }
  }, 100);
};

const wrapNodeWithDivTag = (node: Node): HTMLDivElement => {
  const wrapper = document.createElement("div");
  node.parentNode?.insertBefore(wrapper, node);
  return wrapper;
};

const onNavigationTreeItemClicked = (
  _: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  { id }: NavigationTreeItem | NavigationTreeTagContent
) => {
  const target = document.getElementById(id) as HTMLElement;
  window.scrollTo(0, window.scrollY + target.getBoundingClientRect().top - 8);
};

const renderNavigationTree = (items: NavigationTreeItem[]) => {
  const swaggerUiRoot = document.querySelector("#swagger-ui") as HTMLElement;
  swaggerUiRoot.style.flex = "1";

  const wrapper = wrapNodeWithDivTag(swaggerUiRoot);
    wrapper.style.display = "flex";

    const navigationTreeRoot = document.createElement("div");
    navigationTreeRoot.style.width = NAVIGATION_TREE_WIDTH;
  navigationTreeRoot.style.height = "100vh";
    navigationTreeRoot.style.overflow = "scroll";
  navigationTreeRoot.style.position = "sticky";
  navigationTreeRoot.style.top = "0px";

    createRoot(navigationTreeRoot).render(
      <StrictMode>
        <NavigationTree
          items={items}
        onTitleClicked={onNavigationTreeItemClicked}
        onContentClicked={onNavigationTreeItemClicked}
        />
      </StrictMode>
    );

  wrapper.append(navigationTreeRoot, swaggerUiRoot);
};

const swaggerUiRoot = document.getElementById("swagger-ui");
if (swaggerUiRoot) {
  onLoadedSwaggerTagSectionsAndModelContainers(
    (tagSections, modelContainers) => {
      const navigationTagItems = Array.from(tagSections).map((tagSection) => {
        const tagId = (tagSection.firstElementChild as HTMLHeadingElement).id;

        const name = (
          tagSection.firstElementChild?.firstElementChild
            ?.firstElementChild as HTMLSpanElement
        ).innerText as string;

        const descriptionElement = tagSection.firstElementChild?.children[1]
          .firstElementChild as HTMLDivElement;
        const description = descriptionElement.firstElementChild
          ? (descriptionElement.firstElementChild as HTMLParagraphElement)
              .innerText
          : descriptionElement.innerText;

        const tagContents = tagSection.querySelector(".opblock")?.parentElement
          ?.parentElement?.children as HTMLCollection;

        const navigationTreeTagContents = Array.from(tagContents).map(
          (tagContent) => {
            const contentId = (tagContent.firstElementChild as HTMLDivElement)
              .id;

            const method = (
              tagContent.querySelector(".opblock-summary-method") as HTMLElement
            ).innerText as Method;

            const description = (
              tagContent.querySelector(
                ".opblock-summary-description"
              ) as HTMLElement
            ).innerText;

            const deprecated =
              tagContent.querySelector(".opblock-deprecated") !== null;

            const path = (
              tagContent.querySelector(
                deprecated
                  ? ".opblock-summary-path__deprecated"
                  : ".opblock-summary-path"
              )?.firstElementChild?.firstElementChild as HTMLSpanElement
            ).innerText;

            return {
              id: contentId,
              method,
              path,
              description,
              deprecated,
            };
          }
        );

        return {
          id: tagId,
          name,
          description,
          tagContents: navigationTreeTagContents,
        };
      });

      renderNavigationTree(navigationTagItems);
    }
  );
}
