import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const CartContext = createContext();

export function useCart() {
    const context = useContext(CartContext);

    if (!context) throw new Error("Context provider does not exist...");

    return context;
}

export function CartProvider({ children }) {
    const [ films, setFilms ] = useState(null);
    const [ items, setItems ] = useState(null);

    useEffect(() => {
        axios.get("/movies").then(res => {
            setItems(getLocalStorageItems());
            setFilms(parseFilms(res.data));
        });
    }, []);

    useEffect(() => {
        if (films === null) return;

        const newItems = [];
        for (const item of items) {
            for (const filmItem of films) {
                if (item.id === filmItem.id) {
                    const newItem = {...item};
                    if (newItem.quantity > filmItem.quantity)
                        newItem.quantity = filmItem.quantity;
                    newItems.push(newItem);

                    break;
                }
            }
        }

        setItems(newItems);
    }, [films]);

    useEffect(() => {
        if (items === null) return;

        updateLocalStorage(items);
    }, [items])



    const parseFilms = (rawFilms) => {
        const newFilms = [];
        for (const film of rawFilms) {
            const proceedFilm = {
                ...film,
                maxQuantity: 30
            };
            newFilms.push(proceedFilm);
        }

        return newFilms;
    }

    const updateFilms = (rawFilms) => {
        setFilms(parseFilms(rawFilms));
    }

    const newItemsState = () => {
        const newItems = items.map((item) => ({...item}));
        return newItems;
    }

    const getLocalStorageItems = () => {
        const localStorageCart = window.localStorage.cart;
        if (localStorageCart === undefined) window.localStorage.cart = "";
        if (window.localStorage.cart === "") return [];

        const items = localStorageCart
            .split(",")
            .map((item) => {
                const [id, quantity] = item.split(":");
    
                return {
                    id: id,
                    quantity: Number(quantity)
                };
            });
    
        return items;
    }

    const updateLocalStorage = () => {
        const itemsString = items
            .map(({id, quantity}) => {
                return `${id}:${quantity}`;
            }).join(",");
        window.localStorage.cart = itemsString;
    }

    const findItem = (items, { id }) => {
        const findedItem = items.find((item) => item.id === id) || null;
        return findedItem;
    }

    const addItem = (item, quantity) => {
        const newItems = newItemsState();

        const findedItem = findItem(newItems, item);
        const findedFilmItem = findItem(films, item);

        if (findedFilmItem === null) return;

        if (findedItem === null) {
            const newItem = {...item, quantity: quantity};
            if (quantity > findedFilmItem.quantity)
                newItem.quantity = findedFilmItem.quantity;
            
            newItems.push(newItem);
        } else {
            if (findedItem.quantity + quantity >= findedFilmItem.maxQuantity)
                findedItem.quantity = findedFilmItem.maxQuantity;
            else
                findedItem.quantity += quantity;
        }

        setItems(newItems);
    }

    const decreaseItem = (item, quantity) => {
        const newItems = newItemsState();
        const findedItem = findItem(newItems, item);
        if (findedItem === null) return;
        if (findedItem.quantity <= quantity) {
            removeItem(item);
            return;
        }
        findedItem.quantity -= quantity;

        setItems(newItems);
    }

    const removeItem = (item) => {
        const newItems = newItemsState()
            .filter(({id}) => !(id === item.id));

        setItems(newItems);
    }

    const getItems = () => {
        const newItems = items.map((item) => {
            const findedItemInFilms = films.find((film) => film.id === item.id) || null;
            if (findedItemInFilms === null) return;

            return {...findedItemInFilms, quantity: item.quantity, maxQuantity: 30};
        });

        return newItems.filter((item) => item !== undefined);
    }

    const getRawItems = () => {
        const rawItems = newItemsState();
        rawItems.forEach(item => {
            item.amount = item.quantity;
            delete item.quantity;
        })

        return rawItems;
    }

    const getItemsCount = () => {
        let counter = 0;
        items.forEach(({ quantity }) => counter += quantity)

        return counter;
    }

    const getCartTotal = () => {
        const newItems = getItems();

        let total = 0;
        newItems.forEach((item) => total += item.cost * item.quantity);

        return total;
    }

    const itemIncludes = ({ id }) => {
        for (const item of items) {
            if (item.id === id)
                return true;
        }

        return false;
    }

    const getItemQuantity = (item) => {
        const findedItem = findItem(items, item);
        return findedItem !== null ? findedItem.quantity : 0;
    }

    const clearCart = () => {
        setItems([]);
    }



    if (items === null || films === null) return undefined;

    return (
        <CartContext.Provider
            value={{
                updateFilms,
                addItem,
                decreaseItem,
                removeItem,
                itemIncludes,
                getItemQuantity,
                clearCart,

                items: getItems(),
                rawItems: getRawItems(),
                itemsCount: getItemsCount(),
                cartTotal: getCartTotal()
            }}
        >
            { children }
        </CartContext.Provider>
    );
}