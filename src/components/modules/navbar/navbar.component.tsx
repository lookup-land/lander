// © Agni Ilango
// SPDX-License-Identifier: MPL-2.0 AND CC-BY-4.0

import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import githubIconSrc from "~/assets/icons/external/github.svg";
import { Text } from "~/components/atoms";

const SAnchor = styled("a")`
  text-decoration: none;
`;

const SWrapper = styled("div")`
  height: 64px;
  padding: 0 32px;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-auto-flow: column;
`;

const SSocialIcon = styled("img")`
  width: 24px;
  height: 24px;
`;

export const Navbar: Component = () => {
  return (
    <SWrapper>
      <SAnchor href="/">
        <Text.Title color="#fff" fontWeight="medium">
          Lookup
        </Text.Title>
      </SAnchor>
      <a href="https://github.com/lookup-land" target="_blank">
        <SSocialIcon src={githubIconSrc} />
      </a>
    </SWrapper>
  );
};
