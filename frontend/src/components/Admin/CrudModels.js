import React from "react";
import {truncate} from "./../../Helpers";

const User = {
  title: 'Users',
  form: {
    password: 'hidden',
    roles: {
      type: 'pivotRelation',
      resourceTable: 'role',
      show: 'title',
    }
  },
  list: {
    password: 'hidden'
  }
}

const Article = {
  title: 'Articles',
  form: {
    content: {
      type: 'ckeditor'
    },
    created_at: {
      type: 'datetime'
    },
    tags: {
      type: 'pivotRelation',
      resourceTable: 'tag',
      show: 'title',
    }
  },
  list: {
    title: {
      Cell: (props) => <span>{truncate(props.row.title, 30)}</span>
    },
    content: 'hidden',
    source: 'hidden',
  }
}

const MenuItem = {
  title: 'Menu',
  form: {
    menu_id: {
      type: 'relation',
      resourceTable: 'menu',
      show: 'title',
      label: 'Menu'
    },
    page_id: {
      type: 'relation',
      resourceTable: 'page',
      label: 'Stranka',
      show: 'title',
    },
    parent_id: {
      type: 'relation',
      resourceTable: 'menuItem',
      show: 'title',
      label: 'Parent'
    },
  },
  list: {
    menu_id: {
      header: 'Menu',
      Cell: (props) => <span>{props.row.Menu.title}</span>
    },
    page_id: {
      header: 'Page',
      Cell: (props) => <span>{props.row.Page && props.row.Page.title}</span>
    },
    parent_id: {
      header: 'Parent',
      Cell: (props) => <span>{props.row.Parent && props.row.Parent.title}</span>
    }
  }
}

const Page = {
  title: "Pages",
  form: {
    body: {
      type: "ckeditor",
      label: "Body",
      rows: 8,
    },
  },
  list: {
    body: 'hidden',
  }
};

const Hamburg = {
  title: 'Hamburg',
  form: {
    event_date: {
      type: 'datetime'
    },
    notes: {
      type:'textarea',
      rows: 7
    }
  }
};

const Tag = { title: 'Tags'};

const models = { User, Page, Tag, Article, MenuItem, Hamburg };

export default models;
