import React, { useState } from 'react';
import Category from '../components/category/Category';
import '../css/category.css';
import { AddCategory } from '../components/category/AddCategory';
import { CategoryContext } from '../context/CategoryContext';
import { FixCategory } from '../components/category/FixCategory';

const TempCategory = () => {
    const categoryInfo = [
        {
            "name":"약속/일정/행사",
            "colorCode": "#EEDC3A",
        },
        {
            "name":"취미 생활",
            "colorCode": "#A89292",
        },
        {
            "name":"자기 계발",
            "colorCode": "#96B3FE",
        },
        {
            "name":"업무 및 스펙",
            "colorCode": "#B8A7E9",
        },
        {
            "name":"갑작스러운 일정",
            "colorCode": "#A9BDB2",
        },
        {
            "name":"잠",
            "colorCode": "#EEA1B3",
        }
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [isFixedOpen, setIsFixedOpen] = useState(false);

    const openModalHandler = () => {
        setIsOpen(!isOpen) 
    };

    const openFixedModalHandler = () => {
        setIsFixedOpen(!isFixedOpen) 
    };

    return (
        <CategoryContext.Provider value={{isOpen, setIsOpen, openModalHandler, categoryInfo }}>
            <Category/>
            <AddCategory />
            <FixCategory openFixedModalHandler={openFixedModalHandler} isFixedOpen={isFixedOpen} setIsFixedOpen={setIsFixedOpen} />
        </CategoryContext.Provider>
    );
};

export default TempCategory;