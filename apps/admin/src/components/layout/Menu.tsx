import { Menu as RaMenu } from "react-admin";
import { resources as r } from "../../resources/resources.map";
import { Divider } from "@mui/material";

export const Menu = () => (
  <RaMenu>
    {/* <RaMenu.DashboardItem /> */}
    <div>Galerie</div>
    <RaMenu.ResourceItem name={r.Artwork.name} />
    <RaMenu.ResourceItem name={r.Category.name} />
    <Divider />
    <div>Boutique</div>
    <RaMenu.ResourceItem name={r.Product.name} />
    <RaMenu.ResourceItem name={r.ShopCategory.name} />
    <RaMenu.ResourceItem name={r.Purchase.name} />
    <Divider />
    <div>Réglages</div>
    <RaMenu.ResourceItem name={r.ShippingCost.name} />
    <RaMenu.ResourceItem name={r.AdminVariable.name} />
    {/* <RaMenu.Item to="/custom-route" primaryText="Miscellaneous" /> */}
  </RaMenu>
);
