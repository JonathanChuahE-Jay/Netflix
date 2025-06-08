let lastSelectedIndex = 0;

export const getRandomItem = (array, baseUrl) => {
    if (!array || array.length === 0) {
        return `${baseUrl}/uploads/profile_pictures/default-green.png`;
    }

    const colorOrder = ["green", "red", "orange", "blue"];
    
    const index = lastSelectedIndex % colorOrder.length;
    const nextColor = colorOrder[index];

    const filteredItems = array.filter((item) => item.url.includes(nextColor));

    lastSelectedIndex++;

    if (filteredItems.length > 0) {
        return `${baseUrl}${filteredItems[0].url}`;
    }

    return `${baseUrl}/uploads/profile_pictures/default-green.png`; 
};
