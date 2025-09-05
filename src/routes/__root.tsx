import { TanstackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { DirectionProvider } from "../context/direction-provider";
import { FontProvider } from "../context/font-provider";
import { ThemeProvider } from "../context/theme-provider";
import { CompanyProvider } from "../lib/company-context";
import StoreDevtools from "../lib/demo-store-devtools";
import { UserProvider } from "../lib/user-context";

import { NavigationProgress } from "@/components/navigation-progress";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});
const queryClient = new QueryClient();

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <FontProvider>
              <DirectionProvider>
                <UserProvider>
                  <CompanyProvider>
                    <NavigationProgress />
                    {children}
                    <Toaster duration={5000} />
                    <TanstackDevtools
                      config={{
                        position: "bottom-left",
                      }}
                      plugins={[
                        {
                          name: "Tanstack Router",
                          render: <TanStackRouterDevtoolsPanel />,
                        },
                        StoreDevtools,
                      ]}
                    />
                    <Scripts />
                  </CompanyProvider>
                </UserProvider>
              </DirectionProvider>
            </FontProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
