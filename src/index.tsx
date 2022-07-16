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
  }, 1000);
};

const renderNavigationTree = (items: NavigationTreeItem[]) => {
  const swaggerUiMain = document.querySelector(
    "#swagger-ui > section > div.swagger-ui"
  ) as HTMLElement;

  if (swaggerUiMain) {
    swaggerUiMain.style.width = `calc(100% - ${NAVIGATION_TREE_WIDTH})`;
    swaggerUiMain.style.overflow = "scroll";

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.height = "calc(100vh - 100px)";

    const navigationTreeContainer = document.createElement("div");
    navigationTreeContainer.style.display = "flex";
    navigationTreeContainer.style.flexDirection = "column";
    navigationTreeContainer.style.width = NAVIGATION_TREE_WIDTH;
    navigationTreeContainer.style.overflow = "scroll";

    swaggerUiMain.parentNode?.insertBefore(wrapper, swaggerUiMain);

    const root = createRoot(wrapper.appendChild(navigationTreeContainer));
    root.render(
      <StrictMode>
        <NavigationTree items={items} />
      </StrictMode>
    );
    wrapper.appendChild(swaggerUiMain);
  }
};

const swaggerUiRoot = document.getElementById("swagger-ui");
if (swaggerUiRoot) {
  onLoadedSwaggerTagSectionsAndModelContainers(
    (tagSections, modelContainers) => {
      const navigationTagItems = Array.from(tagSections).map((tagSection) => {
        const tagName = (
          tagSection.firstElementChild?.firstElementChild
            ?.firstElementChild as HTMLSpanElement
        ).innerText as string;

        const tagContents = tagSection.querySelector(".opblock")?.parentElement
          ?.parentElement?.children as HTMLCollection;

        const navigationTreeTagContents = Array.from(tagContents).map(
          (tagContent) => {
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
              method,
              path,
              description,
              deprecated,
            };
          }
        );

        return {
          tagName,
          tagContents: navigationTreeTagContents,
        };
      });

      renderNavigationTree(navigationTagItems);
    }
  );
}
