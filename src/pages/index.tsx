import { ContentLayout, RootLayout, SearchLayout } from "@/components/layout";
import Search from "@/components/search/Search";

export default function Home() {
  return(
    <RootLayout>
      <SearchLayout>
        <Search />
      </SearchLayout>
      <ContentLayout>CONTENT</ContentLayout>
    </RootLayout>
  );
}
