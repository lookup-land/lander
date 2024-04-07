// © Agni Ilango
// SPDX-License-Identifier: MPL-2.0 AND CC-BY-4.0

import { Meta, Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { keyframes, styled } from "solid-styled-components";
import logoMark from "~/assets/logos/logo-mark.svg";
import { Text } from "~/components/atoms";
import { renderScene } from "~/components/modules";

const SWrapper = styled("div")`
  height: 100%;
  display: grid;
  justify-items: center;
`;

const SCanvas = styled("canvas")<{ loading: boolean }>`
  width: 100vw;
  height: calc(100svh - 238px);
  opacity: ${(props) => (props.loading ? 0 : 1)};
  transition: opacity 0.3s;
  transition-delay: 0.1s;
`;

const SLoadingWrapper = styled("div")<{ loading: boolean }>`
  position: absolute;
  top: calc(50% - (200px / 2));
  left: calc(50% - (200px / 2));
  opacity: ${(props) => (props.loading ? 1 : 0)};
  transition opacity 0.3s;
`;

const loadingAnimation = keyframes`
  0% { 
    transform: scale(0.1);
  }
  50% { 
    transform: scale(0.3);
  }
  100% { 
    transform: scale(0.1);
  }
`;

const SLoadingLogo = styled("img")`
  width: 200px;
  height: 200px;
  transform: scale(0.1);
  animation-name: ${loadingAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  will-change: auto;
`;

const SContentWrapper = styled("div")`
  display: grid;
  grid-auto-rows: min-content;
  justify-items: center;
`;

const SComingSoonWrapper = styled("div")`
  user-select: none;
  margin-top: 8px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const SArrowWrapper = styled("div")`
  display: grid;
  align-items: center;
  text-align: center;
  height: 24px;
  width: 24px;
  background: conic-gradient(
    from 140deg at 50% 50%,
    #34a34c 0deg,
    rgb(52 163 76 / 50%) 360deg
  );
  border-radius: 6px;
  color: #fff;

  transition:
    width 0.3s,
    height 0.3s;
`;

export default function Home() {
  const [isLoading, setIsLoading] = createSignal(true);

  let canvas: HTMLCanvasElement | undefined;

  onMount(async () => {
    history.pushState(null, "", "/");

    if (!canvas) {
      return;
    }

    await renderScene(canvas);
    setIsLoading(false);
  });

  return (
    <>
      <Title>Lookup</Title>

      <Meta
        name="description"
        content="The next chapter in social connectivity"
      />

      <SWrapper>
        <SCanvas loading={isLoading()} id="earth" ref={canvas} />

        <SLoadingWrapper loading={isLoading()}>
          <SLoadingLogo src={logoMark} />
        </SLoadingWrapper>

        <SContentWrapper>
          <Text.LargeTitle
            color="#1f8745"
            fontWeight="bold"
            mt="16px"
            textAlign="center"
            px="16px"
          >
            the IRL web
          </Text.LargeTitle>

          <Text.Subtitle
            fontWeight="medium"
            mt="4px"
            textAlign="center"
            px="16px"
          >
            See all your content in the real world – no tabs, no windows
          </Text.Subtitle>

          <SComingSoonWrapper>
            <SArrowWrapper>
              <Text.SuperLargeTitle color="#fff" mt="-12px">
                &rsaquo;
              </Text.SuperLargeTitle>
            </SArrowWrapper>
            <Text.Headline
              color="#1f8745"
              fontWeight="bold"
              textAlign="center"
              ml="8px"
            >
              Coming soon
            </Text.Headline>
          </SComingSoonWrapper>
        </SContentWrapper>
      </SWrapper>
    </>
  );
}
