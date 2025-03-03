import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { urlConfig } from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const categories = ['', 'Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['', 'New', 'Like New', 'Older'];


    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');

    const [name, setName] = useState('');
    const [ageRange, setAgeRange] = useState([]);
    const [selectedAge, setSelectedAge] = useState(0);
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

    useEffect(() => {
        if (searchResults.length > 0) {
            const age_range = searchResults.map((searchResult) => Math.round(searchResult.age_years)).sort();
            const sum_of_ages = searchResults.reduce((accumulator, current) => Math.ceil(accumulator + current.age_years), 0);
            console.log(sum_of_ages);
            const middle_age_range_index = Math.ceil(sum_of_ages / age_range.length);
                        console.log(middle_age_range_index);

            setAgeRange(age_range);
            setSelectedAge(middle_age_range_index)
        }

    }, [searchResults])

    // Task 2. Fetch search results from the API based on user inputs.

    async function fetchSearchResult() {

        try {
            let query = [];
            if (category.length > 0) {
                query.push(`category=${category}`)
            }
            if (condition.length > 0) {
                query.push(`condition=${condition}`)
            }
            if (name.length > 0) {
                query.push(`name=${name}`)
            }

            query.push(`age_years=${selectedAge}`)


            query = query.join('&&');
            let url = `${urlConfig.backendUrl}/search?${query}`
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

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/app/product/${productId}`)

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
                                <select name="category" id="category" className="form-select dropdown-filter" onChange={(e) => setCategory(e.target.value)} aria-label="select example">
                                    {
                                        categories.map((category, index) => (
                                            <option key={index}
                                                onChange={(e) => setCategory(e.target.value)}
                                                value={category}>{(category === '') ? 'All' : category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-group mt-2'>
                                <label htmlFor="condition">Category</label>
                                <select name="condition" id="condition" className="form-select dropdown-filter" onChange={(e) => setCondition(e.target.value)} aria-label="select example">
                                    {
                                        conditions.map((condition, index) => (
                                            <option key={index}
                                                value={condition}
                                            >{condition === '' ? 'All' : condition}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <div className='form-group mt-2 '>
                                <p>Less than {selectedAge}</p>
                                <input name="age_range" id="age_range" type="range" min={ageRange[0]} max={ageRange[ageRange.length - 1]} value={selectedAge} className='age-range-slider' onChange={(e) => setSelectedAge(e.target.value)} />

                            </div>
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria*/}
                    <input type="text" className="form-control search-input"
                        placeholder='Search for items...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    <button name='search' className='mt-4 btn btn-primary' onClick={() => fetchSearchResult()}>Search</button>

                    {/*Task 5: Display search results and handle empty results with a message. */}
                    {
                        (searchResults.length === 0) ?
                            <div>No searchResults</div>
                            :
                            searchResults.map((gift) => (
                                <div key={gift.id} className=" mb-4">
                                    <div className="card product-card">
                                        <div className="image-placeholder">
                                            <img src={gift.image}></img>
                                        </div>
                                        <div className="card-body">

                                            <p className='card-title'>
                                                <strong>{gift.name}</strong>
                                            </p>

                                            <p className='card-text'>
                                                {gift.description}
                                            </p>

                                            <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))


                    }
                </div>
            </div>
        </div>
    )

}
export default SearchPage;
