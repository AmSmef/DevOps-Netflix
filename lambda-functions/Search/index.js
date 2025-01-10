exports.handler = async (event) => {
    const videos = [
        { id: 1, title: "Bosko And Honey (1932)" },
        { id: 2, title: "Betty Boop: Minnie The Moocher" },
        { id: 3, title: "Superman: Destruction Inc." },
        { id: 4, title: "Popeye: Haul In One" },
        { id: 5, title: "Popeye For President" },
        { id: 6, title: "Superman: The Mechanical Monsters" },
        { id: 7, title: "Tom & Jerry: Jolly Fish" },
        { id: 8, title: "Woody Woodpecker: Pantry Panic" },
    ];

    const { query } = JSON.parse(event.body);

    // Simple search: match query in titles (case-insensitive)
    const results = videos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow all origins (you can restrict this to specific domains if needed)
            "Access-Control-Allow-Methods": "OPTIONS,POST", // Allow specific HTTP methods
            "Access-Control-Allow-Headers": "Content-Type", // Allow the Content-Type header
        },
        body: JSON.stringify(results),
    };
};
