import { useEffect, useState, useRef } from 'react'
import '../../components/currency-convertor/index.scss'
import axios from 'axios';
import Block from '../../components/currency-convertor/Block';

const Convertor = () => {
    const [fromCurrency, setFromCurrency] = useState("EUR");
    const [toCurrency, setToCurrency] = useState("USD");
    const [fromPrice, setFromPrice] = useState<any>(1);
    const [toPrice, setToPrice] = useState<any>(0);
    const ratesRef = useRef<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://v6.exchangerate-api.com/v6/1410d9ba56918707823e1ae6/latest/USD")
                ratesRef.current = response.data.conversion_rates;
                onChangeFromPrice(1);
            } catch (error) {
                console.warn(error);
                alert("Failed to fetch info");
            }
        };

        fetchData();
    }, []);

    const onChangeFromPrice = (value: any) => {
        const price = value / ratesRef.current[fromCurrency];
        const result = price * ratesRef.current[toCurrency];
        setToPrice(result.toFixed(2));
        setFromPrice(value);
    };

    const onChangeToPrice = (value: any) => {
        const result =
            (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setFromPrice(result.toFixed(2));
        setToPrice(value);
    };

    useEffect(() => {
        onChangeFromPrice(fromPrice);
    }, [fromCurrency]);

    useEffect(() => {
        onChangeToPrice(toPrice);
    }, [toCurrency]);

    return (
        <>
            <div className="converter">
                <Block
                    value={fromPrice}
                    currency={fromCurrency}
                    onChangeCurrency={setFromCurrency}
                    onChangeValue={onChangeFromPrice}
                />
                <Block
                    value={toPrice}
                    currency={toCurrency}
                    onChangeCurrency={setToCurrency}
                    onChangeValue={onChangeToPrice}
                />
            </div>
        </>
    )
}

export default Convertor