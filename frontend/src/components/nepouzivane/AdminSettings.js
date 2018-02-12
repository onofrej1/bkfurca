import React from "react";
import Form from "./Form/Form";
import Field from "./Form/Field";
import actionButtons from "./Admin/actionButtons";

const ArticleColumns = [
  { header: "Id", field: "id" },
  { header: "Title", field: "title" },
  { header: "Author", field: "author" },
  actionButtons
];

const pagesColumns = [
  { header: "Id", field: "id" },
  {
    header: "Title",
    field: "title"
  },
  actionButtons
];

const ArticleForm = props => {
  return (
    <Form url="url" {...props} addButtons>
      <Field
        component="pivotRelation"
        label="Tags"
        name="Tags"
        pivot={["ArticleTag", "article_id", "tag_id"]}
        resourceTable="tag"
        show="title"
      />
      <Field type="text" label="Title" name="title" required />
      <Field type="text" label="Author" name="author" required />
      <Field component="ckeditor" label="Content" name="content" required />
    </Form>
  );
};

const PagesForm = props => {
  return (
    <Form url="url" {...props} addButtons>
      <Field type="text" label="Title" name="title" required />
      <Field component="ckeditor" label="Content" name="body" required />
    </Form>
  );
};

const UserForm = props => {
  return (
    <Form url="url" {...props} addButtons>
      <Field type="text" label="Meno" name="name" required />
      <Field type="text" label="Email" name="email" required />
      <Field
        component="pivotRelation"
        label="Roles"
        name="Roles"
        pivot={["UserRole", "user_id", "role_id"]}
        resourceTable="Role"
        show="title"
      />
    </Form>
  );
};

const MenuItemForm = props => {
  return (
    <Form {...props} addButtons>
      <Field label="Title" name="title" required />
      <Field
        component="relation"
        emptyOption
        label="Menu"
        name="menu_id"
        resourceTable="menu"
        show="title"
      />
      <Field
        component="relation"
        emptyOption
        label="Page"
        name="page_id"
        resourceTable="page"
        show="title"
      />
      <Field
        component="relation"
        emptyOption
        label="Parent"
        name="parent_id"
        resourceTable="menuitem"
        show="title"
      />
      <Field label="Link" name="link" />
    </Form>
  );
};

const MenuItemColumns = [
  { header: "Id", field: "id" },
  { header: "Title", field: "title" },
  {
    header: "Page",
    Cell: props => <span>{props.row.Page && props.row.Page.title}</span>
  },
  actionButtons
];

const EventForm = props => {
  return (
    <Form url="url" {...props} addButtons>
      <Field label="Title" name="title" required />
      <Field
        component="relation"
        emptyOption
        label="Run"
        name="run_id"
        resourceTable="run"
        show="run"
      />
      <Field label="Edition" name="edition" required />
      <Field label="Event Date" name="event_date" required />
    </Form>
  );
};

export {
  PagesForm,
  ArticleForm,
  MenuItemForm,
  MenuItemColumns,
  ArticleColumns,
  pagesColumns,
  EventForm,
  UserForm
};
