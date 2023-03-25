import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useParams, Link } from "react-router-dom";
import { PageArea, Fake, OthersArea, BreadCrumb } from "./styled";
import { Api } from "../../components/helpers/Api";
import { PageContainer } from "../../components/MainComponents";
import AdItem from "../../components/partials/AdItem/index";

const AdPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [adInfo, setAdInfo] = React.useState({});

    React.useEffect(() => {
        const getAdInfo = async (id) => {
            const ad = await Api.getAd(id, true);
            setAdInfo(ad);
            setLoading(false);
        };
        getAdInfo(id);
    }, [id]);

    const formatDate = (date) => {
        const fDate = new Date(date);
        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "long",
        }).format(fDate);
    };

    return (
        <PageContainer>
            <BreadCrumb>
                Você está aqui:
                <Link to={"/"}>Home</Link>/
                <Link to={`/ads?state=${adInfo.stateName}`}>
                    {adInfo.stateName}
                </Link>
                /
                <Link
                    to={`/ads?state=${adInfo.stateName}?cat=${adInfo.category?.slug}`}
                >
                    {adInfo.category?.name}
                </Link>
                / {adInfo.title}
            </BreadCrumb>
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images && (
                                <Slide>
                                    {adInfo.images.map((image, index) => (
                                        <div key={index} className="each-slide">
                                            <img
                                                src={image}
                                                alt={image.title}
                                            />
                                        </div>
                                    ))}
                                </Slide>
                            )}
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title && <h2>{adInfo.title}</h2>}
                                {adInfo.dateCreated && (
                                    <small>
                                        Criado em{" "}
                                        {formatDate(adInfo.dateCreated)}
                                    </small>
                                )}
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={200} />}
                                {adInfo.description}
                                {adInfo.views && (
                                    <>
                                        <hr />
                                        <small>
                                            Visualizações: {adInfo.views}
                                        </small>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box boxPadding">
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable && "Preço Negociável"}
                        {!adInfo.priceNegotiable && adInfo.price && (
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        )}
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo && (
                        <>
                            <a
                                href={`mailto:${adInfo.userInfo.email}`}
                                target="_blank"
                                className="contactSellerLink"
                                rel="noreferrer"
                            >
                                Fale com o vendedor
                            </a>
                            <div className="createdBy box boxPadding">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    )}
                </div>
            </PageArea>
            {adInfo.others && (
                <OthersArea>
                    <h2>Outros anúncios deste vendedor</h2>
                    <div className="list">
                        {adInfo.others.map((ad) => (
                            <AdItem key={ad.id} data={ad} />
                        ))}
                    </div>
                </OthersArea>
            )}
        </PageContainer>
    );
};

export default AdPage;
