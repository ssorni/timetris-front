import React, { useState } from 'react';
import Category from '../components/category/Category';
import '../css/category.css';
import { CategoryContext } from '../context/CategoryContext';

import AddModal from '../components/category/categoryModal/AddModal';
import FixModal from '../components/category/categoryModal/FixModal';
import PlanModal from '../components/category/categoryModal/PlanModal';
import DoModal from '../components/category/categoryModal/DoModal';
import axios from 'axios';

const TempCategory = () => {
    const selectColorCode = ["#EEDC3A","#EEA1B3","#96B3FE","#A89292","#B8A7E9","#FFDA7A","#A9BDB2","#E4B7FF","#A8DFD5","#C7FF81","#528DFF", "#5C5C5C"]
    let categoryInfo = [
        {
            "id":3,
            "name":"약속/일정/행사",
            "colorCode": "#EEDC3A",
        },
        {
            "id":4,
            "name":"취미 생활",
            "colorCode": "#A89292",
        },
        {
            "id":5,
            "name":"자기 계발",
            "colorCode": "#96B3FE",
        },
        {
            "id":6,
            "name":"업무 및 스펙",
            "colorCode": "#B8A7E9",
        },
        {
            "id":7,
            "name":"갑작스러운 일정",
            "colorCode": "#A9BDB2",
        }
    ]
    // 모달 띄우기 state
    const [state, setState] = useState({
        isAddOpen: false,
        isFixOpen: false,
        isPlanOpen: false,
        isDoOpen: false,
    })
    // 카테고리 추가
    const [addCategory, setAddCategory]= useState({
        name: "",
        colorCode: ""
    })
    // 반복 일정
    const [selectedDay, setSelectedDay] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    // 카테고리 조회
    const [myCategory, setMyCategory] = useState([]);
    
    const ShowCategoryList = async () => {
        const response = await axios.get(`http://43.203.6.58:8080/category`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODM2NTEzMCwiZW1haWwiOiJzaHRtZGdtbDI1OTVAZ21haWwuY29tIiwibWVtYmVySWQiOjl9.YJxiq313eu2-t6Twq-3W-z6kU7cEYW10VUyadRvUJHS6A34rMScQ-TThojZOWD3zrLOVkyZUICITNLu57CDijA`
            }
        });
        setMyCategory(response.data.result);
    }


    
    const HandleAddCategory = async (type) => {
        console.log(addCategory);
        try {
            if (type === 'Fix') { // 카테고리 수정
                const response = await axios.put(`http://43.203.6.58:8080/category/5`, addCategory);
                const addData = response.data;
            } else if (type === 'Delete') { // 카테고리 삭제
                await axios.delete(`http://43.203.6.58:8080/category/11`);
            }
            // else if (type === 'Plan') {
            //     const response = await axios.post('url/plan', 
            //         "userDateId": userDateId,
            //         "startTime" :
            //         "endTime":
            //         "title":
            //         "cycle":
            //         "categoryId":
            //     );
            // } 
            else { // 카테고리 작성
                const response = await axios.post('http://43.203.6.58:8080/category', addCategory, {
                    headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODM2NTEzMCwiZW1haWwiOiJzaHRtZGdtbDI1OTVAZ21haWwuY29tIiwibWVtYmVySWQiOjl9.YJxiq313eu2-t6Twq-3W-z6kU7cEYW10VUyadRvUJHS6A34rMScQ-TThojZOWD3zrLOVkyZUICITNLu57CDijA`
                  }});

                setAddCategory({
                    name:  response.data.result.name,
                    colorCode:  response.data.result.colorCode
                })
                console.log('응답 데이터', response.data.result.colorCode);
                // categoryInfo = [...categoryInfo, addCategory];
            }

            // 카테고리 목록에 추가

            // 추가한 카테고리 이름, colorCode 초기화
            setAddCategory({
                name: '',
                colorCode: '',
            })
            setCategoryId('')
            
        } catch(error) {
            console.log('에러:', error)
        }
        
    }
    const handleRepeatCheck = (e) => {
        const { value } = e.target;

        setSelectedDay(prevSelectedDay => prevSelectedDay !== value ? value : null);
    };
    const ModalHandler = (openState) => {
        setState(prevState => ({
            ...prevState,
            [openState]: !prevState[openState]
        }));
    }

    return (
        <CategoryContext.Provider 
        value={{ state, setState, ModalHandler, 
                categoryInfo, selectColorCode, 
                addCategory, setAddCategory, HandleAddCategory,
                selectedDay, handleRepeatCheck,
                categoryId, setCategoryId,
                myCategory, setMyCategory, ShowCategoryList}}>
            <Category />
            <AddModal /><br /><br/><br/>
            <FixModal /><br/><br/><br/>
            <PlanModal /><br/><br/><br/>
            <DoModal />
        </CategoryContext.Provider>
    );
};

export default TempCategory;