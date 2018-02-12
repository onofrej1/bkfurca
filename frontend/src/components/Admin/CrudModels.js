import React from "react";

const Article = {
  title: 'Clanky',
  form: {
    //source: false,
    content: {
      type: 'ckeditor'
    },
    sourcex: {
      type: 'checkboxList',
      options: [{ value: "aaa", label: "AAA" }, { value: "bbb", label: "BBB" }]
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
    parent_id: {
      type: 'relation',
      resourceTable: 'menuitem',
      show: 'title',
      label: 'Parent'
    },
    link: 'text',
    page: {
      type: 'relation',
      resourceTable: 'page',
      label: 'Stranka',
      show: 'title',
    }
  },
  list: {
    menu_id: {
      Cell: (props) => <strong>aaa</strong>
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
