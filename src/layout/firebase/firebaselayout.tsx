import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

const Firebaselayout = () => {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <Fragment>
      <Helmet>
        <html className={"h-full"}></html>
      </Helmet>
      <Outlet />
    </Fragment>
  );
};

export default Firebaselayout;
