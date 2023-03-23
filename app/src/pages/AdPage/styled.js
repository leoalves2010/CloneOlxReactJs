import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export const Fake = styled.div`
    color: transparent;
    background: linear-gradient(100deg, #eceff1 30%, #fff7f8 50%, #eceff1 70%);
    background-size: 400%;
    animation: ${loading} 1.2s ease-in-out infinite;
    height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 4px #999;
        margin-bottom: 20px;
        overflow: hidden;
    }

    .boxPadding{
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .adImage {
        }

        .adInfo {
            padding: 10px;

            .adName {
                margin-bottom: 20px;
            }

            .adDescription {
            }
        }
    }

    .rightSide {
        width: 250px;
    }
`;
