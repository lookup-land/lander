// © Agni Ilango
// SPDX-License-Identifier: MPL-2.0 AND CC-BY-4.0

import { styled } from "solid-styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

type StyledProps = SpaceProps & TypographyProps & ColorProps & LayoutProps;

interface BaseProps extends StyledProps {
  content?: string;
}

const Base = styled.div<BaseProps>`
  font-family: ${(props) => props.theme?.fontFamily};
  font-weight: ${(props) => props.theme?.fontWeights.regular};
  color: ${(props) => props.theme?.colors.text};

  ${space};
  ${typography};
  ${color};
  ${layout};
`;

const SuperLargeTitle = styled(Base)<StyledProps>`
  font-size: 34px;
`;

const LargeTitle = styled(Base)<StyledProps>`
  font-size: 28px;
`;

const Title = styled(Base)<StyledProps>`
  font-size: 22px;
`;

const Subtitle = styled(Base)<StyledProps>`
  font-size: 20px;
`;

const Headline = styled(Base)<StyledProps>`
  font-size: 18px;
`;

const Subheadline = styled(Base)<StyledProps>`
  font-size: 17px;
`;

const Body = styled(Base)<StyledProps>`
  font-size: 15px;
`;

const Callout = styled(Base)<StyledProps>`
  font-size: 14px;
`;

const Footnote = styled(Base)<StyledProps>`
  font-size: 13px;
`;

const Caption = styled(Base)<StyledProps>`
  font-size: 12.5px;
`;

export const Text = {
  SuperLargeTitle,
  LargeTitle,
  Title,
  Subtitle,
  Headline,
  Subheadline,
  Body,
  Callout,
  Footnote,
  Caption,
};
