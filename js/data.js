// This is a central list of travel destinations used across multiple pages of TravelNest.
const travelDestinations = [
    {
        id: 1,
        name: "Kyoto",
        country: "Japan",
        continent: "Asia",
        type: "cultural",
        budgetLevel: "medium",
        image: "assets/images/kyoto.jpg",
        description: "Experience the perfect blend of ancient history and breathtaking nature in Japan's cultural heart, famous for its historic temples and sublime bamboo forests.",
        attractions: ["Fushimi Inari Shrine", "Kinkaku-ji (Golden Pavilion)", "Arashiyama Bamboo Grove"],
        costs: {
            accommodation: "$80/night",
            food: "$30/day",
            transport: "$15/day"
        }
    },
    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        continent: "Asia",
        type: "relaxation",
        budgetLevel: "low",
        image: "assets/images/bali.jpg",
        description: "A tropical paradise renowned for its forested volcanic mountains, iconic rice paddies, pristine beaches, and deeply spiritual culture.",
        attractions: ["Ubud Monkey Forest", "Tanah Lot Temple", "Uluwatu Cliff Beach"],
        costs: {
            accommodation: "$35/night",
            food: "$15/day",
            transport: "$10/day"
        }
    },
    {
        id: 3,
        name: "Interlaken",
        country: "Switzerland",
        continent: "Europe",
        type: "adventure",
        budgetLevel: "high",
        image: "assets/images/interlaken.jpg",
        description: "The adventure capital of Europe, nestled between two stunning lakes and surrounded by the magnificent, snow-capped Swiss Alps.",
        attractions: ["Jungfraujoch Sphinx Observatory", "Harder Kulm Viewpoint", "Lake Thun Boat Cruise"],
        costs: {
            accommodation: "$150/night",
            food: "$50/day",
            transport: "$30/day"
        }
    },
    {
        id: 4,
        name: "Costa Rica Rainforest",
        country: "Costa Rica",
        continent: "America",
        type: "nature",
        budgetLevel: "medium",
        image: "assets/images/costarica.jpg",
        description: "A rugged, rainforested Central American country with immense biodiversity, active volcanoes, and protected cloud forests.",
        attractions: ["Arenal Volcano National Park", "Manuel Antonio Beaches", "Monteverde Cloud Forest"],
        costs: {
            accommodation: "$70/night",
            food: "$25/day",
            transport: "$20/day"
        }
    },
    {
        id:5,
        name: "Sigiriya",
        country: "Sri Lanka",
        continent: "Asia",
        type: "Cultural",
        budgetLevel: "low",
        image:"assets/images/Sigiriya.jpg",
        description: "An ancient rock fortress dominated by a massive column of rock nearly 200 meters high. It features historic frescoes, structural engineering marvels, and royal water gardens." ,
        attractions: ["Lion Rock Fortress","Sigiriya Frescoes","The Mirror Wall"],
        costs: {
            accommodation: "$40/night",
            food: "$15/day",
            transport: "$20/day"
        }

    },
    {
        id:6,
        name:"Venice",
        country:"Italy",
        continent: "Europe",
        type: "relaxation",
        budgetLevel:"high",
        image:"assets/images/Venice.jpg",
        description: "The famed city of canals built on more than 100 small islands in an Adriatic Sea lagoon, globally renowned for its beautiful Gothic architecture and romantic gondola rides.",
        attractions: ["St. Mark's Basilica","The Grand Canal","Rialto Bridge"],
        costs: {
            accomodation: "$130/night",
            food: "$45/day",
            transport: "$25/day"
        }
    }

];