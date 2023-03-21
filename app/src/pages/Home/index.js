import React from "react";
import { Link } from "react-router-dom";
import { PageArea, SearchArea } from "./styled";
import { PageContainer } from "../../components/MainComponents";
import { Api } from "../../components/helpers/Api";

const Home = () => {
    const [stateList, setStateList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

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

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="get" action="/ads">
                            <input
                                type="text"
                                name="q"
                                placeholder="O que você procura?"
                            />
                            <select name="state">
                                {stateList &&
                                    stateList.map((state) => (
                                        <option
                                            key={state.id}
                                            value={state.name}
                                        >
                                            {state.name}
                                        </option>
                                    ))}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories &&
                            categories.map((category) => (
                                <Link
                                    key={category.id}
                                    className="categoryItem"
                                    to={`ads?cat=${category.slug}`}
                                >
                                    <img
                                        src={category.img}
                                        alt={category.name}
                                    />
                                    <span>{category.name}</span>
                                </Link>
                            ))}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>container</PageArea>
            </PageContainer>
        </>
    );
};

export default Home;
