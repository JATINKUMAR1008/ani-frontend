import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppProvider } from "@/components/providers/app-provider";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AppProvider>
      {/* <div>Hello "__root"!</div> */}
      <Outlet />
      </AppProvider>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
