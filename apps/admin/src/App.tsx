import { Admin, Resource } from "react-admin";

import { artworkResource } from "./resources/artwork";
import { categoryResource } from "./resources/category";
import { productResource } from "./resources/product";
import { variableResource } from "./resources/variable";
import { shopCategoryResource } from "./resources/shopCategory";
import { Layout } from "./components/layout/Layout";
import { resources as r } from "./resources/resources.map";
import { authProvider, dataProvider, i18nProvider } from "./providers";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
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
