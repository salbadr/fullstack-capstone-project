import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Task 1: Write async fetch operation
        // Write your code below this line
        fetch(`${urlConfig.backendUrl}gift`)
            .then(resp => resp.json())
            .then(data => setGifts(data))
            .catch((err) => {
                console.error(err)
            })
    }, [setGifts]);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        // Write your code below this line
        navigate(`/app/product/${productId}`)

    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        // Write your code below this line
        const date = new Date(timestamp*1000);
        return `${date.toLocaleString('en-GB', {month: 'long', year: 'numeric', day:'2-digit'})}`;
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card product-card">

                            {/* // Task 4: Display gift image or placeholder */}
                            {/* // Write your code below this line */}

                            <div className="image-placeholder">
                                <img src={gift.image}></img>
                            </div>
                            <div className="card-body">

                                {/* // Task 5: Display gift name*/}
                                {/* // Write your code below this line */}

                                <p className='card-title'>
                                    <strong>{gift.name}</strong>
                                </p>

                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                    {gift.condition}
                                </p>

                                {/* // Task 6: Display the formatted date */}
                                {/* // Write your code below this line */}

                                <p className='date-added'>
                                    {formatDate(gift.date_added)}
                                </p>

                                <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
