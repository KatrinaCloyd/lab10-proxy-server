function formatGeo(someData) {
    return {
        formatted_query: someData[0].display_name,
        latitude: someData[0].lat,
        longitude: someData[0].lon
    };
}

function formatWthr(someData) {
    const mungedData = someData.data.map(item => {
        return {
            forecast: item.weather.description,
            time: new Date(item.ts * 1000).toDateString()
        };
    });
    return mungedData.slice(0, 7);
}

function formatReviews(someData) {
    const mungedData = someData.map(item => {
        return {
            name: item.name,
            image_url: item.image_url,
            price: item.price,
            rating: item.rating,
            url: item.url,
        };
    });
    return mungedData.slice(0, 20);
}

module.exports = {
    formatGeo,
    formatWthr,
    formatReviews
};