import axios from "axios"
import Collection from "../../components/photo/Collection"
import './Photos.scss'
import { ChangeEvent, useEffect, useState } from "react"

const categories = [
    { name: 'All categories' },
    { name: 'sea' },
    { name: "Mountains" },
    { name: "Architecture" },
    { name: "Cities" },
]

interface CollectionProps {
    name: string
    photos: [string]
}


const Photos = () => {
    const [categoryId, setCategoryId] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const selectedCategory = categoryId ? `category=${categoryId}` : "";
                const response = await axios.get(
                    `https://6322c16ca624bced307dea7f.mockapi.io/photos-collection?page=${page}&limit=3&${selectedCategory}`
                );

                setCollections(response.data);
            } catch (error) {
                console.warn(error);
                alert("Failed fetch info");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [categoryId, page]);

    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    };

    const onClickSetActiveCategoryId = (index: number) => {
        setCategoryId(index);
    };

    const onClickSetActivePage = (index: number) => {
        setPage(index + 1);
    };

    return (
        <>
            <div className="photos-app">
                <h1>Collection of my photos</h1>
                <div className="top">
                    <ul className="tags">
                        {categories.map((obj, index) => (
                            <li
                                onClick={() => onClickSetActiveCategoryId(index)}
                                className={categoryId === index ? "active" : ""}
                                key={obj.name}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                    <input
                        className="search-input"
                        placeholder="Search by name"
                        onChange={onChangeSearchValue}
                    />
                </div>
                <div className="content">
                    {isLoading ? (
                        <h2>Loading ...</h2>
                    ) : (
                        collections
                            .filter((obj: CollectionProps) =>
                                obj.name.toLowerCase().includes(searchValue.toLowerCase())
                            )
                            .map((obj: CollectionProps, index: any) => (
                                <Collection key={index} name={obj.name} images={obj.photos} />
                            ))
                    )}
                </div>
                <ul className="pagination">
                    {[...Array(3)].map((_, index) => (
                        <li
                            onClick={() => onClickSetActivePage(index)}
                            className={page === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Photos