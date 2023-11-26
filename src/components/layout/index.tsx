import { ReactNode } from "react";
import { RootLayout } from "./rootLayout";
import { SearchLayout } from "./searchLayout";
import { ContentLayout } from "./contentLayout";

export type TLayoutChild = {
  children: ReactNode;
}

export {RootLayout, SearchLayout, ContentLayout};