const getRandomWords = async (count = 1) => {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=100');
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        };

        const data = await response.json();
        return data.slice(0, count);

    } catch (err) {
        console.log(`Error: ${err}`);
        return err;
    };
};

export default getRandomWords;