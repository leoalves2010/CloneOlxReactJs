import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageArea } from "./styled";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem/index";
import { Api } from "../../components/helpers/Api";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [stateList, setStateList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [adList, setAdList] = React.useState([]);
    const [queryInput, setQueryInput] = React.useState(
        searchParams.get("q") !== null ? searchParams.get("q") : ""
    );
    const [queryState, setQueryState] = React.useState(
        searchParams.get("state") !== null ? searchParams.get("state") : ""
    );
    const [queryCategory, setQueryCategory] = React.useState(
        searchParams.get("cat") !== null ? searchParams.get("cat") : ""
    );

    React.useEffect(() => {
        const getStates = async () => {
            const states = await Api.getStates();
            setStateList(states);
        };
        getStates();
    }, []);

    React.useEffect(() => {
        const getCategories = async () => {
            const categories = await Api.getCategories();
            setCategories(categories);
        };
        getCategories();
    }, []);

    React.useEffect(() => {
        const getRecentAds = async () => {
            const ads = await Api.getAds({
                sort: "desc",
                limit: 8,
            });
            setAdList(ads);
        };
        getRecentAds();
    }, []);

    return (
        <>
            <PageContainer>
                <PageArea>
                    <div className="leftSide">
                        <form method="GET">
                            <input
                                type="text"
                                name="q"
                                placeholder="O que você procura?"
                                value={queryInput}
                                onChange={({ target }) =>
                                    setQueryInput(target.value)
                                }
                            />

                            <div className="filterName">Estado:</div>
                            <select
                                name="state"
                                value={queryState}
                                onChange={({ target }) =>
                                    setQueryState(target.value)
                                }
                            >
                                <option></option>
                                {stateList &&
                                    stateList.map((state) => (
                                        <option
                                            key={state._id}
                                            value={state._id}
                                        >
                                            {state.name}
                                        </option>
                                    ))}
                            </select>

                            <div className="filterName">Categoria:</div>
                            <ul>
                                {categories &&
                                    categories.map((category) => (
                                        <li
                                            key={category._id}
                                            className={
                                                queryCategory === category.slug
                                                    ? "categoryItem active"
                                                    : "categoryItem"
                                            }
                                        >
                                            <img
                                                src={category.img}
                                                alt={category.name}
                                            />
                                            <span>{category.name}</span>
                                        </li>
                                    ))}
                            </ul>
                        </form>
                    </div>
                    <div className="rightSide">...</div>
                </PageArea>
            </PageContainer>
        </>
    );
};

export default Home;
