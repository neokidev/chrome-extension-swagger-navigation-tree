import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Method,
  NavigationTree,
  NavigationTreeItem,
} from "./components/NavigationTree";
import "./index.css";

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

const renderNavigationTree = (items: NavigationTreeItem[]) => {
  const swaggerUiMain = document.querySelector(
    "#swagger-ui > section > div.swagger-ui"
  ) as HTMLElement;

  if (swaggerUiMain) {
    swaggerUiMain.style.width = `calc(100% - ${NAVIGATION_TREE_WIDTH})`;
    swaggerUiMain.style.overflow = "scroll";

    const wrapper = wrapNodeWithDivTag(swaggerUiMain);
    wrapper.style.display = "flex";
    wrapper.style.height = "calc(100vh - 100px)";

    const navigationTreeRoot = document.createElement("div");
    navigationTreeRoot.style.display = "flex";
    navigationTreeRoot.style.flexDirection = "column";
    navigationTreeRoot.style.width = NAVIGATION_TREE_WIDTH;
    navigationTreeRoot.style.overflow = "scroll";

    createRoot(navigationTreeRoot).render(
      <StrictMode>
        <NavigationTree
          items={items}
          onTitleClicked={(_, { id }) => {
            // TODO: fix this hardcode
            const target = document.getElementById(id) as HTMLElement;
            const scrollTop = swaggerUiMain.scrollTop;
            swaggerUiMain.scrollTop =
              scrollTop + target.getBoundingClientRect().top - 110; // 110 = header height + alpha
          }}
          onContentClicked={(_, { id }) => {
            // TODO: fix this hardcode
            const target = document.getElementById(id) as HTMLElement;
            const scrollTop = swaggerUiMain.scrollTop;
            swaggerUiMain.scrollTop =
              scrollTop + target.getBoundingClientRect().top - 110; // 110 = header height + alpha
          }}
        />
      </StrictMode>
    );

    wrapper.append(navigationTreeRoot, swaggerUiMain);
  }
};

const swaggerUiRoot = document.getElementById("swagger-ui");
if (swaggerUiRoot) {
  onLoadedSwaggerTagSectionsAndModelContainers(
    (tagSections, modelContainers) => {
      const navigationTagItems = Array.from(tagSections).map((tagSection) => {
        const tagId = (tagSection.firstElementChild as HTMLHeadingElement).id;

        const tagName = (
          tagSection.firstElementChild?.firstElementChild
            ?.firstElementChild as HTMLSpanElement
        ).innerText as string;

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
          tagName,
          tagContents: navigationTreeTagContents,
        };
      });

      renderNavigationTree(navigationTagItems);
    }
  );
}
