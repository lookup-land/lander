// © Agni Ilango
// SPDX-License-Identifier: MPL-2.0 AND CC-BY-4.0

import "solid-styled-components";

declare module "solid-styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
    colors: {
      text: string;
      background: string;
      green: string;
      orange: string;
      gray: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;
    };
    fontWeights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  }
}
