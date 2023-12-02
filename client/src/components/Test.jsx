import React, { useState } from 'react';
import axios from 'axios';
import { FaBeer } from 'react-icons/fa';

const Test = () => {
    const [searchParam, setSearchParam] = useState('all');
    const [searchConcept, setSearchConcept] = useState('Category');
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenPrice, setDropdownOpenPrice] = useState(false);
    const [searchPrice, setSearchPrice] = useState(false);

    const filters = [
        { key: 'Zarbiya', text: 'Zarbiya' },
        { key: 'TRIKO', text: "TRIKO" },
        { key: 'greather_than', text: 'Sabat' },
        { key: '9mija', text: '9mija' },
        { key: 'all', text: 'Anything' }
    ];
    const filtersPrice = [
        { key: '20', text: '20$' },
        { key: '30', text: "30$" },
        { key: '40', text: '40$' },
        { key: '50', text: '50$' },
        { key: '70', text: '70$' }
    ];

    const handleFilterClick = (key, text) => {
        setSearchParam(key);
        setSearchConcept(text);
        setDropdownOpen(false);
    };
    const handleFilterClickPrice = (key, text ) => {
        setSearchPrice(key);
        setSearchConcept(text);
        setDropdownOpenPrice(false);
    }
    const handleSubmit = async () => {
        try {
            /*const response = await axios.post('/Api', {
                searchParam,
                searchTerm,
                searchPrice
            });
            console.log(response.data);*/
            console.log('searchParam: ', searchParam, 'searchTerm : ', searchTerm , 'searchPrice : ', searchPrice);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center bg-white shadow p-4 w-[50%]">
            <div className="relative inline-flex mr-1 ">
                <button class="relative inline-flex items-center justify-start py-2 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group mb-px" onClick={() => setDropdownOpenPrice(!dropdownOpenPrice)}>
                    <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                    <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Price</span>
                </button>
                {dropdownOpenPrice && (
                    <ul className="absolute z-10 mt-10 w-[100%] bg-white border border-gray-300 rounded shadow">
                        {filtersPrice.map(filter => (
                            <li
                                key={filter.key}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFilterClickPrice(filter.key, filter.text)}
                            >
                                {filter.text}
                            </li>
                        ))}
                    </ul>
                )}
                <button class="relative inline-flex items-center justify-start py-2 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group mb-px" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                    <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Category</span>
                </button>
                {dropdownOpen && (
                    <ul className="absolute z-10 mt-10 w-[100%] bg-white border border-gray-300 rounded shadow">
                        {filters.map(filter => (
                            <li
                                key={filter.key}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleFilterClick(filter.key, filter.text)}
                            >
                                {filter.text}
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            <div className="relative w-full w-96">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                    </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[50px]" placeholder="Search term..."value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} required />
            </div>
            <button onClick={handleSubmit} className='p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
        </div>
        
    );
};

export default Test;
