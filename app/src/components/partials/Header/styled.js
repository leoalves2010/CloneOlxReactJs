import styled from "styled-components";

export const HeaderArea = styled.div`
    background-color: #fff;
    height: 60px;
    border-bottom: 1px solid #ccc;

    a {
        text-decoration: none;
    }

    .container {
        max-width: 1000px;
        height: inherit;
        margin: auto;
        display: flex;
        align-items: center;
    }

    .logo {
        height: 60px;
        flex: 1;
        display: flex;
        align-items: center;
    }

    nav {
        padding-top: 10px;
        padding-bottom: 10px;

        ul,
        li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            display: flex;
            align-items: center;
            height: 40px;
        }

        li {
            margin-left: 20px;
            margin-right: 20px;

            a {
                color: #000;
                font-size: 14px;

                &:hover {
                    color: #999;
                }

                &.button {
                    background-color: #ff8100;
                    border-radius: 4px;
                    color: #fff;
                    padding: 5px 10px;
                }

                &.button:hover {
                    background-color: #e57706;
                }
            }
        }
    }
`;
