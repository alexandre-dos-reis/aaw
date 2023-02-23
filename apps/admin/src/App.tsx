import {
  Admin,
  Resource,
  Create,
  SimpleForm,
  TextInput,
  required,
  DateInput,
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  Edit,
  BooleanInput,
} from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";
import { artworkResource } from "./resources/artwork";
import { categoryResource } from "./resources/category";
import { productResource } from "./resources/product";
import { variableResource } from "./resources/variable";

export const App = () => (
  <Admin dataProvider={dataProvider("http://localhost:3002/ra")}>
    <Resource {...artworkResource} />
    <Resource {...categoryResource} />
    <Resource {...productResource} />
    <Resource {...variableResource} />
  </Admin>
);

export default App;
