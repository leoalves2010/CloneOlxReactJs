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

    .boxPadding {
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .box{
            display: flex;
        }

        .adImage {
            width: 320px;
            height: 320px;
            margin-right: 20px;

            .each-slide img{
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;
            }
        }

        .adInfo {
            flex: 1;

            .adName {
                margin-bottom: 20px;

                h2{
                    margin: 0;
                    margin-top: 20px;
                }

                small{
                    color: #999;
                }
            }

            .adDescription {
                small{
                    color: #999;
                }
            }
        }
    }

    .rightSide {
        width: 250px;
    }
`;
