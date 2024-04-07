// © Agni Ilango
// SPDX-License-Identifier: MPL-2.0 AND CC-BY-4.0

import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Assets } from "solid-js/web";
import { ThemeProvider, extractCss, styled } from "solid-styled-components";
import { Navbar } from "./components/modules";
import { theme } from "./components/theme";

const SContentWrapper = styled("div")`
  background: linear-gradient(180deg, #1f8745 0%, #5fe08e 30%, #d0fbe0 50%);
`;

const SPageWrapper = styled("div")`
  height: calc(100svh - 64px);
`;

const App = () => {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Lookup</Title>
          <Assets>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <style innerHTML={extractCss()} />
          </Assets>
          <ThemeProvider theme={theme}>
            <SContentWrapper>
              <Navbar />
              <SPageWrapper>
                <Suspense>{props.children}</Suspense>
              </SPageWrapper>
            </SContentWrapper>
          </ThemeProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
};

export default App;
