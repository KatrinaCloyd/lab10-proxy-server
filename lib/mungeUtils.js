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

module.exports = {
    formatGeo,
    formatWthr
};