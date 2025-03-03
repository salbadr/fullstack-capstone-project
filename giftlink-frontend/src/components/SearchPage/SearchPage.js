import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { urlConfig } from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];
    const [query, setQuery] = useState('');
    const [ageRange, setAgeRange] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/gift`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
                             console.log(data);

            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    useEffect(()=>{
        if(searchResults.length>0){
            const ages = searchResults.map((searchResult)=>Math.round(searchResult.age_years)).sort();
            setAgeRange(ages);
        }

    },[searchResults])




    // Task 2. Fetch search results from the API based on user inputs.

    async function fetchSearchResult() {
        
    };

    console.log('One');




    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
    };




    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            <div className='form-group'>
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category" className="form-select dropdown-filter" aria-label="select example">
                                    <option value="">All</option>
                                    {
                                        categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-group mt-2'>
                                <label htmlFor="condition">Category</label>
                                <select name="condition" id="condition" className="form-select dropdown-filter" aria-label="select example">
                                    <option value="">All</option>
                                    {
                                        conditions.map((condition, index) => (
                                            <option key={index} value={condition}>{condition}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <div className='form-group mt-2 '>
                                <p>Less than </p>
                                <input name="age_range" id="age_range" type="range" min={ageRange[0]} max={ageRange[ageRange.length-1]} className='age-range-slider' />

                            </div>
                        </div>
                        {/* Task 7: Add text input field for search criteria*/}
                        {/* Task 8: Implement search button with onClick event to trigger search:*/}
                        {/*Task 5: Display search results and handle empty results with a message. */}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SearchPage;
