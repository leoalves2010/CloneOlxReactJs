import React from "react";
import { useParams } from "react-router-dom";
import { PageArea, Fake } from "./styled";
import { Api } from "../../components/helpers/Api";
import { PageContainer } from "../../components/MainComponents";

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
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
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
                    </div>
                    <div className="box boxPadding">
                        {loading && <Fake height={50} />}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
};

export default AdPage;
