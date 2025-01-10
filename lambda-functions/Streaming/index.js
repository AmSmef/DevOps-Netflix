const AWS = require('aws-sdk');

// Define the video URLs and titles in an object
const videos = {
    bosko: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/BoskoAndHoney/10_Bosko_and_Honey_1932_512kb.mpd",
        title: "Bosko and Honey (1932)"
    },
    betty: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/BettyBoop/bb_minnie_the_moocher_512kb.mpd",
        title: "Betty Boop: Minnie the Moocher"
    },
    destruction: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/DestructionInc/destruction_inc_512kb.mpd",
        title: "Superman: Destruction Inc."
    },
    haul: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/HaulInOne/haul_in_one_512kb.mpd",
        title: "Popeye: Haul in One"
    },
    popeye: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/PopeyeForPresident/Popeye_forPresident_512kb.mpd",
        title: "Popeye for President"
    },
    superman: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/Superman/superman_the_mechanical_monsters_512kb.mpd",
        title: "Superman: The Mechanical Monsters"
    },
    tom: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/TomAndJerry/Tom_and_Jerry_Jolly_Fish_1932_512kb.mpd",
        title: "Tom and Jerry: Jolly Fish (1932)"
    },
    woody: {
        url: "https://manifest-files-amsmef.s3.eu-west-2.amazonaws.com/WoodyWoodpecker/woody_woodpecker_pantry_panic_512kb.mpd",
        title: "Woody Woodpecker: Pantry Panic"
    },
};

exports.handler = async (event) => {
    const { videoId } = event.queryStringParameters || {};
    
    if (!videoId || !videos[videoId]) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',  // Allow any origin (use a specific domain in production)
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ error: "Invalid video ID" }),
        };
    }

    // Retrieve the video URL and title from the videos object
    const video = videos[videoId];

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',  // Allow any origin (use a specific domain in production)
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ videoUrl: video.url, title: video.title }),
    };
};
