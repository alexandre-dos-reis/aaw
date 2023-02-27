import { Admin, ListGuesser, Resource } from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";
import { artworkResource } from "./resources/artwork";
import { categoryResource } from "./resources/category";
import { productResource } from "./resources/product";
import { variableResource } from "./resources/variable";
import { shopCategoryResource } from "./resources/shopCategory";
import { Layout } from "./components/layout/Layout";
import { resources as r } from "./resources/resources.map";

export const App = () => (
  <Admin
    dataProvider={dataProvider("http://localhost:3002/ra")}
    layout={Layout}
  >
    <Resource {...artworkResource} />
    <Resource name={r.Artwork_Category.name} />
    <Resource {...categoryResource} />
    <Resource {...productResource} />
    <Resource {...variableResource} />
    <Resource {...shopCategoryResource} />
  </Admin>
);

export default App;
