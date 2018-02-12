import React from "react";
import "./../../../assets/adminlte/css/AdminLTE.css";
import "./../../../assets/adminlte/css/skins/_all-skins.css";

const Layout = props => (
  <div className="hold-transition skin-blue sidebar-mini">
    <div className="wrapper">{props.children}</div>
  </div>
);

const Header = props => <header className="main-header">{props.children}</header>;

const Sidebar = props => (
  <aside className="main-sidebar">
    <section className="sidebar">{props.children}</section>
  </aside>
);

Sidebar.Menu = props => (
  <ul className="sidebar-menu tree" data-widget="tree">
    {props.children}
  </ul>
);

Sidebar.Menu.Header = props => <li className="header">{props.children}</li>;

Header.Logo = props => (
  <a href="/" className="logo">
    <span className="logo-mini">{props.children}</span>
    <span className="logo-lg">{props.children}</span>
  </a>
);

Header.Navbar = props => (
  <nav className="navbar navbar-expand navbar-light navbar-custom">
    {props.children}
  </nav>
);

const Content = props => (
  <div className="content-wrapper">{props.children}</div>
);

Content.Header = props => (
  <section className="content-header">{props.children}</section>
);
Content.Body = props => <section className="content">{props.children}</section>;

const Footer = props => (
  <footer className="main-footer">
    <div className="pull-right hidden-xs">
      <b>Version</b> 2.4.0
    </div>
    <strong>
      Copyright &copy; 2014-2016{" "}
      <a href="https://adminlte.io">Almsaeed Studio</a>.
    </strong>{" "}
    All rights reserved.
  </footer>
);

const Box = props => <div className="box box-primary">{props.children}</div>;

Box.Header = props => (
  <div className="box-header with-border">{props.children}</div>
);
Box.Body = props => <div className="box-body">{props.children}</div>;
Box.Footer = props => <div className="box-footer">{props.children}</div>;

export { Layout, Header, Content, Sidebar, Footer, Box };
