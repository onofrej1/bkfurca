import React, { Component } from "react";
import Resource from "./Admin/Resource";
import Admin from "./Admin/Admin";
import {
  PagesForm,
  EventForm,
  pagesColumns,
  MenuItemForm,
  MenuItemColumns,
  ArticleForm,
  ArticleColumns,
  UserForm
} from "./AdminSettings";

class AdminArea extends Component {
  render() {
  
    return (
      <Admin>
        <Resource
          name="page"
          title="Stránky"
          form={PagesForm}
          columns={pagesColumns}
        />
        <Resource
          name="menuitem"
          title="Menu"
          form={MenuItemForm}
          columns={MenuItemColumns}
        />
        <Resource name="tag" title="Značky" />
        <Resource name="user" title="Uživatelia" form={UserForm} />
        <Resource
          name="article"
          title="Články"
          form={ArticleForm}
          columns={ArticleColumns}
          include={["Category", "Tag"]}
        />
        {/*<Resource name="Person"  title="Bezci" />*/}
        <Resource name="event" title="Behy" />
      </Admin>
    );
  }
}

export default AdminArea;
