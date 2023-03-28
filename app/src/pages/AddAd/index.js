import React from "react";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { PageArea } from "./styled";
import {
    PageContainer,
    PageTitle,
    ErrorMessage,
} from "../../components/MainComponents";
import { Api } from "../../components/helpers/Api";

const AddAd = () => {
    const navigate = useNavigate();
    const fileField = React.useRef(null);
    const [title, setTitle] = React.useState("");
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [priceNegotiable, setPriceNegotiable] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const getCategories = async () => {
            const json = await Api.getCategories();
            setCategories(json);
        };
        getCategories();
    }, []);

    const defaultMaskOptions = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
        decimalLimit: 2,
        integerLimit: 9,
        allowNegative: false,
        allowLeadingZeroes: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        let errors = [];

        if (!title.trim()) {
            errors.push("Digite um título.");
        }

        if (!category) {
            errors.push("Selecione uma categoria.");
        }

        if (!price) {
            errors.push("Digite um preço.");
        }

        if (!description.trim()) {
            errors.push("Digite uma descrição.");
        }

        if (errors.length === 0) {
            const fData = new FormData();
            fData.append("title", title);
            fData.append("cat", category);
            fData.append("price", price);
            fData.append("priceneg", priceNegotiable);
            fData.append("desc", description);

            if (fileField.current.files.length > 0) {
                for (
                    let index = 0;
                    index < fileField.current.files.length;
                    index++
                ) {
                    fData.append("img", fileField.current.files[index]);
                }
            }

            const json = await Api.addAd(fData);

            if (!json.error) {
                navigate(`/ad/${json.id}`);
            } else {
                setError(json.error);
            }
        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);
    };

    return (
        <PageContainer>
            <PageTitle>Adicionar um Anúncio</PageTitle>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={({ target }) =>
                                    setTitle(target.value)
                                }
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                required
                                value={category}
                                onChange={({ target }) =>
                                    setCategory(target.value)
                                }
                            >
                                <option>Selecione...</option>
                                {categories &&
                                    categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                                required
                                mask={defaultMaskOptions}
                                placeholder={"R$"}
                                disabled={priceNegotiable}
                                value={price}
                                onChange={({ target }) =>
                                    setPrice(target.value)
                                }
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={() =>
                                    setPriceNegotiable(!priceNegotiable)
                                }
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea
                                value={description}
                                onChange={({ target }) =>
                                    setDescription(target.value)
                                }
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                            <input type="file" ref={fileField} multiple />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>
                                Adicionar Anúncio
                            </button>
                        </div>
                    </label>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            </PageArea>
        </PageContainer>
    );
};

export default AddAd;
