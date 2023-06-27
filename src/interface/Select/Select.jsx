import { useState } from "react";

import { useEffect, useRef } from "react";

import "./Select.css";

import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";

function AccordionItem({ name, value, setValue, searchFunc }) {
    return (
        <div
            className="item"
            onClick={() => setValue(value)}
        >
            <span>{name}</span>
        </div>
    );
}

export default function Select({ value, setValue, placeholder, items }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClick = ({ target }) => {
            if (!selectRef.current) return;
            if (!selectRef.current.contains(target))
                setIsOpen(false);
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [isOpen]);

    const name = items.find(item => item.value === value && value !== null)?.name || placeholder;

    return (
        <div
            className={`select${isOpen ? " active" : ""}${value !== null ? " selected" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            ref={selectRef}
        >
            <div className="area">
                <div className="w-value">
                    <span>{name}</span>
                </div>

                <div className="w-arrow">
                    <AnimatedArrow isActive={isOpen} />
                </div>
            </div>

            <div className="accordion">
                <AccordionItem
                    key={placeholder}
                    name={"Не выбрано"}
                    value={null}
                    setValue={setValue}
                />
                {items.map(({ name, value }) => {
                    return (
                        <AccordionItem
                            key={value}
                            name={name}
                            value={value}
                            setValue={setValue}
                        />
                    );
                })}
            </div>
        </div>
    );
}