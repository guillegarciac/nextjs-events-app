import { Fragment } from "react";
import MainHeader from "./main-header";

export default function Layout(props) {
  return (
    <Fragment>
    <MainHeader />
      <header></header>
      <main>{props.children}</main>
    </Fragment>
  );
}
