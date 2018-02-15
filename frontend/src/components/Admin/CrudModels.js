import React from "react";

const Article = {
  title: 'Clanky',
  form: {
    content: {
      type: 'ckeditor'
    },
    created_at: false,
    tags: {
      type: 'pivotRelation',
      resourceTable: 'tag',
      show: 'title',
    }
  },
  list: {
    content: {
      Cell: props => <span>CC</span>
    }
  }
}

const MenuItem = {
  title: 'Menu',
  form: {
    title: 'text',
    menu: {
      type: 'relation',
      resourceTable: 'menu',
      show: 'title',
      label: 'Menu'
    },
    link: 'text',
    page: {
      type: 'relation',
      resourceTable: 'page',
      label: 'Stranka',
      show: 'title',
    },
    parent_id: {
      type: 'relation',
      resourceTable: 'menuitem',
      show: 'title',
      label: 'Parent'
    },
  },
  list: {
    menu_id: {
      header: 'Menu',
      Cell: (props) => <strong>{props.row.Menu.title}</strong>
    },
    page_id: {
      header: 'Page',
      Cell: (props) => <strong>{props.row.Page && props.row.Page.title}</strong>
    },
    parent_id: {
      header: 'Parent',
      Cell: (props) => <strong>{props.row.Parent && props.row.Parent.title}</strong>
    }
  }
}

const Page = {
  title: "Stranky",
  form: {
    title: "text",
    body: {
      type: "ckeditor",
      label: "Body",
      rows: 8,
      style: {
        color: "red",
        backgroundColor: "yellow"
      }
    },
  },
  list: {
    body: {
      Cell: (props) => <strong>body</strong>
    }
  }
};

const Tag = {
  title: "Tag",
  form: {
    title: {
      type: "text",
      label: "Tag"
    }
  },
  list: {
    title: {
      Cell: (props) => <strong>{props.row.title}</strong>
    }
  }
};

const models = { Page, Tag, Article, MenuItem };

export default models;
