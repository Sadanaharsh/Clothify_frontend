import React from "react";
import StarRatings from 'react-star-ratings'

export const showAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings
        let total = [];
        let length = ratingsArray.length
        // console.log('length', length);

        ratingsArray.map((r) => total.push(r.star));
        let totalReduced = total.reduce((p, n) => p + n, 0);
        // console.log('totalReduced', totalReduced);

        let highest = length * 5;
        // console.log('highest', highest);
        
        let result = (totalReduced * 5) / highest;
        console.log('result', result);

        return (
            <div className="text-center pb-3">
                <span className="flex justify-center items-center space-x-1">
                    <StarRatings starDimension="20px" starSpacing="2px" starRatedColor="red" rating={result} editing={false} />
                    <span className=""> ({p.ratings.length})</span>
                </span>
            </div>
        )

    }
};