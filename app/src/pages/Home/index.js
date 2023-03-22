import React from "react";
import { Link } from "react-router-dom";
import { PageArea, SearchArea } from "./styled";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem/index";
import { Api } from "../../components/helpers/Api";

const Home = () => {
    const [stateList, setStateList] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [adList, setAdList] = React.useState([".", ".", "."]);

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
        const getAds = async () => {
            const ads = await Api.getAds({
                sort: "desc",
                limit: 8,
            });
            setAdList(ads);
        };
        getAds();
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
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList &&
                            adList.map((ad) => (
                                <AdItem key={ad.id} data={ad} />
                            ))}
                    </div>
                    <Link to={"/ads"} className="seeAllLink">
                        Ver todos
                    </Link>
                    <hr />
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                </PageArea>
            </PageContainer>
        </>
    );
};

export default Home;
