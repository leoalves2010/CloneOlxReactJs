import styled from "styled-components";

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .leftSide {
        width: 250px;
        margin-right: 10px;

        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }

        input,
        select {
            width: 100%;
            height: 40px;
            border: 2px solid #9bb83c;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: #000;
            padding: 10px;
        }

        ul,
        li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .categoryItem {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: #000;
            cursor: pointer;

            img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }

            span {
                font-size: 14px;
            }
        }

        .categoryItem:hover,
        .categoryItem.active {
            background-color: #9bb83c;
            color: #fff;
        }
    }

    .rightSide {
        flex: 1;

        h2 {
            margin: 0;
            padding: 0;
            font-size: 18px;
        }

        .msgWarning {
            text-align: center;
            padding: 30px;
        }

        .list {
            display: flex;
            flex-wrap: wrap;

            .adItem {
                width: 33%;
            }
        }

        .pagination{
            display: flex;

            .pageItem{
                display: flex;
                padding: 5px;
                margin-right: 5px;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                font-size: 14px;
                border: 1px solid transparent;
                background-color: #9bb83c;
                color: #fff;
                cursor: pointer;

                &:hover,
                &.active{
                    background-color: #79922b;
                }
            }
        }
    }
`;
