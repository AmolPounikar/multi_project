import { useEffect, useState } from "react";
import "../Convertor/Convertor.scss";
const Counter = () => {
    const [count, setCount] = useState(0);

    const onClickAdd = () => setCount(count + 1);
    const onClickSubb = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    useEffect(() => {

    }, [count])
    return (
        <>
            <div className="Counter">
                <div>
                    <h2>Counter:</h2>
                    <h1>{count}</h1>
                    <button className="minus" onClick={onClickAdd}>
                        + Plus
                    </button>
                    <button className="plus" onClick={onClickSubb}>
                        - Minus
                    </button>
                </div>
            </div>
        </>
    );
};

export default Counter;
