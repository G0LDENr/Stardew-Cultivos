// Base de datos completa de Stardew Valley

// Cultivos
const cropsDatabase = [
    // PRIMAVERA
    { 
        id: "blue_jazz",
        name: "Jazmín Azul", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 30,
        sellPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        type: "standard",
        notes: "Flor, buena para regalar."
    },
    { 
        id: "cauliflower",
        name: "Coliflor", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 12, 
        regrowTime: 0, 
        price: 80,
        sellPrices: { normal: 175, silver: 218, gold: 262, iridium: 350 },
        type: "standard",
        notes: "Calidad de oro necesaria para el paquete del invernadero."
    },
    { 
        id: "garlic",
        name: "Ajo", 
        category: "crops",
        seasons: ["spring"], 
        year: 2, 
        growthTime: 4, 
        regrowTime: 0, 
        price: 40,
        sellPrices: { normal: 60, silver: 75, gold: 90, iridium: 120 },
        type: "standard",
        notes: "Desbloqueado en año 2+. Crecimiento rápido."
    },
    { 
        id: "green_bean",
        name: "Frijol Azul", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 10, 
        regrowTime: 3, 
        price: 60,
        sellPrices: { normal: 40, silver: 50, gold: 60, iridium: 80 },
        type: "regrow",
        notes: "Continúa produciendo después de la primera cosecha."
    },
    { 
        id: "kale",
        name: "Kale", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 6, 
        regrowTime: 0, 
        price: 70,
        sellPrices: { normal: 110, silver: 137, gold: 165, iridium: 220 },
        type: "standard",
        notes: "Crecimiento rápido."
    },
    { 
        id: "parsnip",
        name: "Chirivía", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 4, 
        regrowTime: 0, 
        price: 20,
        sellPrices: { normal: 35, silver: 43, gold: 52, iridium: 70 },
        type: "standard",
        notes: "El primer cultivo que plantas en el juego."
    },
    { 
        id: "potato",
        name: "Papa", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 6, 
        regrowTime: 0, 
        price: 50,
        sellPrices: { normal: 80, silver: 100, gold: 120, iridium: 160 },
        type: "standard",
        notes: "25% de posibilidad de cosechar múltiples papas (+1)."
    },
    { 
        id: "rhubarb",
        name: "Ruibarbo", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 13, 
        regrowTime: 0, 
        price: 100,
        sellPrices: { normal: 220, silver: 275, gold: 330, iridium: 440 },
        type: "standard",
        notes: "Disponible en la tienda de la carreta."
    },
    { 
        id: "strawberry",
        name: "Fresa", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 8, 
        regrowTime: 4, 
        price: 100,
        sellPrices: { normal: 120, silver: 150, gold: 180, iridium: 240 },
        type: "regrow",
        notes: "Solo disponible después del Festival del Huevo de Primavera."
    },
    { 
        id: "tulip",
        name: "Tulipán", 
        category: "crops",
        seasons: ["spring"], 
        year: 1, 
        growthTime: 6, 
        regrowTime: 0, 
        price: 20,
        sellPrices: { normal: 30, silver: 37, gold: 45, iridium: 60 },
        type: "standard",
        notes: "Flor, buena para regalar."
    },
    
    // VERANO
    { 
        id: "blueberry",
        name: "Arándano", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 13, 
        regrowTime: 4, 
        price: 80,
        sellPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        type: "regrow",
        notes: "Produce 3 arándanos por cosecha (50% chance por 2 extra)."
    },
    { 
        id: "corn",
        name: "Maíz", 
        category: "crops",
        seasons: ["summer", "fall"], 
        year: 1, 
        growthTime: 14, 
        regrowTime: 4, 
        price: 150,
        sellPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        type: "multi",
        notes: "Crece en verano y otoño. Alta rentabilidad a largo plazo."
    },
    { 
        id: "hops",
        name: "Lúpulo", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 11, 
        regrowTime: 1, 
        price: 60,
        sellPrices: { normal: 25, silver: 31, gold: 37, iridium: 50 },
        type: "regrow",
        notes: "Se usa para hacer cerveza (valor 300g). Muy rentable procesado."
    },
    { 
        id: "hot_pepper",
        name: "Pimiento Picante", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 5, 
        regrowTime: 3, 
        price: 40,
        sellPrices: { normal: 40, silver: 50, gold: 60, iridium: 80 },
        type: "regrow",
        notes: "Continúa produciendo después de la primera cosecha."
    },
    { 
        id: "melon",
        name: "Melón", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 12, 
        regrowTime: 0, 
        price: 80,
        sellPrices: { normal: 250, silver: 312, gold: 375, iridium: 500 },
        type: "standard",
        notes: "Necesario para el paquete del invernadero. Posibilidad de gigante."
    },
    { 
        id: "poppy",
        name: "Amapola", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 100,
        sellPrices: { normal: 140, silver: 175, gold: 210, iridium: 280 },
        type: "standard",
        notes: "Flor, buena para regalar."
    },
    { 
        id: "radish",
        name: "Rábano", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 6, 
        regrowTime: 0, 
        price: 40,
        sellPrices: { normal: 90, silver: 112, gold: 135, iridium: 180 },
        type: "standard",
        notes: "Crecimiento rápido."
    },
    { 
        id: "red_cabbage",
        name: "Repollo Rojo", 
        category: "crops",
        seasons: ["summer"], 
        year: 2, 
        growthTime: 9, 
        regrowTime: 0, 
        price: 100,
        sellPrices: { normal: 260, silver: 325, gold: 390, iridium: 520 },
        type: "standard",
        notes: "Desbloqueado en año 2+."
    },
    { 
        id: "starfruit",
        name: "Fruta Estelar", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 13, 
        regrowTime: 0, 
        price: 400,
        sellPrices: { normal: 750, silver: 937, gold: 1125, iridium: 1500 },
        type: "standard",
        notes: "Disponible en la tienda de Sandy. Muy valioso."
    },
    { 
        id: "summer_spangle",
        name: "Brillo de Verano", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 8, 
        regrowTime: 0, 
        price: 50,
        sellPrices: { normal: 90, silver: 112, gold: 135, iridium: 180 },
        type: "standard",
        notes: "Flor, buena para regalar."
    },
    { 
        id: "tomato",
        name: "Tomate", 
        category: "crops",
        seasons: ["summer"], 
        year: 1, 
        growthTime: 11, 
        regrowTime: 4, 
        price: 50,
        sellPrices: { normal: 60, silver: 75, gold: 90, iridium: 120 },
        type: "regrow",
        notes: "Continúa produciendo después de la primera cosecha."
    },
    { 
        id: "wheat",
        name: "Trigo", 
        category: "crops",
        seasons: ["summer", "fall"], 
        year: 1, 
        growthTime: 4, 
        regrowTime: 0, 
        price: 10,
        sellPrices: { normal: 25, silver: 31, gold: 37, iridium: 50 },
        type: "multi",
        notes: "Crece en verano y otoño. También produce heno."
    },
    
    // OTOÑO
    { 
        id: "amaranth",
        name: "Amaranto", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 70,
        sellPrices: { normal: 150, silver: 187, gold: 225, iridium: 300 },
        type: "standard",
        notes: "Flor, buena para regalar."
    },
    { 
        id: "artichoke",
        name: "Alcachofa", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 8, 
        regrowTime: 0, 
        price: 30,
        sellPrices: { normal: 160, silver: 200, gold: 240, iridium: 320 },
        type: "standard",
        notes: "Disponible en año 2+."
    },
    { 
        id: "beet",
        name: "Remolacha", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 6, 
        regrowTime: 0, 
        price: 20,
        sellPrices: { normal: 100, silver: 125, gold: 150, iridium: 200 },
        type: "standard",
        notes: "Disponible en la tienda de la Feria."
    },
    { 
        id: "bok_choy",
        name: "Bok Choy", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 4, 
        regrowTime: 0, 
        price: 50,
        sellPrices: { normal: 80, silver: 100, gold: 120, iridium: 160 },
        type: "standard",
        notes: "Crecimiento rápido."
    },
    { 
        id: "cranberries",
        name: "Arándano Rojo", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 5, 
        price: 240,
        sellPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        type: "regrow",
        notes: "Continúa produciendo hasta el final del otoño. 2 bayas por cosecha."
    },
    { 
        id: "eggplant",
        name: "Berenjena", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 5, 
        regrowTime: 5, 
        price: 20,
        sellPrices: { normal: 60, silver: 75, gold: 90, iridium: 120 },
        type: "regrow",
        notes: "Continúa produciendo después de la primera cosecha."
    },
    { 
        id: "fairy_rose",
        name: "Rosa Hada", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 12, 
        regrowTime: 0, 
        price: 200,
        sellPrices: { normal: 290, silver: 362, gold: 435, iridium: 580 },
        type: "standard",
        notes: "Flor valiosa, aumenta valor de la miel cercana."
    },
    { 
        id: "grape",
        name: "Uva", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 10, 
        regrowTime: 3, 
        price: 60,
        sellPrices: { normal: 80, silver: 100, gold: 120, iridium: 160 },
        type: "regrow",
        notes: "Continúa produciendo después de la primera cosecha."
    },
    { 
        id: "pumpkin",
        name: "Calabaza", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 13, 
        regrowTime: 0, 
        price: 100,
        sellPrices: { normal: 320, silver: 400, gold: 480, iridium: 640 },
        type: "standard",
        notes: "Necesario para el paquete del invernadero. Posibilidad de gigante."
    },
    { 
        id: "sunflower",
        name: "Girasol", 
        category: "crops",
        seasons: ["summer", "fall"], 
        year: 1, 
        growthTime: 8, 
        regrowTime: 0, 
        price: 200,
        sellPrices: { normal: 80, silver: 100, gold: 120, iridium: 160 },
        type: "multi",
        notes: "Crece en verano y otoño. También produce semillas de girasol."
    },
    { 
        id: "sweet_gem_berry",
        name: "Baya Dulce Gemela", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 24, 
        regrowTime: 0, 
        price: 1000,
        sellPrices: { normal: 3000, silver: 3750, gold: 4500, iridium: 6000 },
        type: "special",
        notes: "Semilla rara de la carreta viajera. No se puede convertir en calidad superior."
    },
    { 
        id: "yam",
        name: "Batata Dulce", 
        category: "crops",
        seasons: ["fall"], 
        year: 1, 
        growthTime: 10, 
        regrowTime: 0, 
        price: 60,
        sellPrices: { normal: 160, silver: 200, gold: 240, iridium: 320 },
        type: "standard",
        notes: "Disponible en la Feria de Stardew Valley."
    },
    
    // INVIERNO (cultivos especiales)
    { 
        id: "winter_seeds",
        name: "Semilla de Invierno", 
        category: "crops",
        seasons: ["winter"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 0,
        sellPrices: { normal: 0, silver: 0, gold: 0, iridium: 0 },
        type: "special",
        notes: "Mezcla de cultivos de invierno. No tiene valor de venta directo."
    },
    { 
        id: "crystal_fruit",
        name: "Fruta del Cristal", 
        category: "crops",
        seasons: ["winter"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 0,
        sellPrices: { normal: 150, silver: 187, gold: 225, iridium: 300 },
        type: "special",
        notes: "Solo disponible de Semilla de Invierno o en la mina."
    },
    { 
        id: "snow_yam",
        name: "Batata de Nieve", 
        category: "crops",
        seasons: ["winter"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 0,
        sellPrices: { normal: 100, silver: 125, gold: 150, iridium: 200 },
        type: "special",
        notes: "Forrajeable en invierno."
    },
    { 
        id: "winter_root",
        name: "Raíz de Invierno", 
        category: "crops",
        seasons: ["winter"], 
        year: 1, 
        growthTime: 7, 
        regrowTime: 0, 
        price: 0,
        sellPrices: { normal: 70, silver: 87, gold: 105, iridium: 140 },
        type: "special",
        notes: "Forrajeable en invierno o de Semillas de Invierno."
    },
    
    // MULTI-ESTACIÓN
    { 
        id: "coffee_bean",
        name: "Grano de Café", 
        category: "crops",
        seasons: ["spring", "summer"], 
        year: 2, 
        growthTime: 10, 
        regrowTime: 2, 
        price: 0,
        sellPrices: { normal: 15, silver: 18, gold: 22, iridium: 30 },
        type: "multi",
        notes: "De granos de café. Produce 4 granos por cosecha."
    },
    { 
        id: "ancient_fruit",
        name: "Fruta Antigua", 
        category: "crops",
        seasons: ["spring", "summer", "fall"], 
        year: 1, 
        growthTime: 28, 
        regrowTime: 7, 
        price: 0,
        sellPrices: { normal: 550, silver: 687, gold: 825, iridium: 1100 },
        type: "multi",
        notes: "Semilla antigua. Produce continuamente en tres estaciones. Muy valioso."
    },
    { 
        id: "cactus_fruit",
        name: "Fruto de Cactus", 
        category: "crops",
        seasons: ["spring", "summer", "fall", "winter"], 
        year: 1, 
        growthTime: 12, 
        regrowTime: 3, 
        price: 150,
        sellPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        type: "multi",
        notes: "Crece en cualquier estación dentro del invernadero."
    },
    { 
        id: "pineapple",
        name: "Piña", 
        category: "crops",
        seasons: ["spring", "summer", "fall"], 
        year: 1, 
        growthTime: 14, 
        regrowTime: 7, 
        price: 100,
        sellPrices: { normal: 300, silver: 375, gold: 450, iridium: 600 },
        type: "multi",
        notes: "Disponible en la Isla Jengibre. Crece en tres estaciones."
    }
];

// Árboles Frutales
const treesDatabase = [
    {
        id: "cherry_tree",
        name: "Cerezo",
        category: "trees",
        fruitName: "Cereza",
        seasons: ["spring"],
        growthTime: 28,
        saplingPrice: 3400,
        fruitPrice: 80,
        fruitQualityPrices: { normal: 80, silver: 100, gold: 120, iridium: 160 },
        notes: "Produce cerezas cada día durante la primavera. No necesita ser regado."
    },
    {
        id: "apricot_tree",
        name: "Albaricoquero",
        category: "trees",
        fruitName: "Albaricoque",
        seasons: ["spring"],
        growthTime: 28,
        saplingPrice: 2000,
        fruitPrice: 50,
        fruitQualityPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        notes: "Produce albaricoques cada día durante la primavera."
    },
    {
        id: "orange_tree",
        name: "Naranjo",
        category: "trees",
        fruitName: "Naranja",
        seasons: ["summer"],
        growthTime: 28,
        saplingPrice: 4000,
        fruitPrice: 100,
        fruitQualityPrices: { normal: 100, silver: 125, gold: 150, iridium: 200 },
        notes: "Produce naranjas cada día durante el verano."
    },
    {
        id: "peach_tree",
        name: "Melocotonero",
        category: "trees",
        fruitName: "Melocotón",
        seasons: ["summer"],
        growthTime: 28,
        saplingPrice: 6000,
        fruitPrice: 140,
        fruitQualityPrices: { normal: 140, silver: 175, gold: 210, iridium: 280 },
        notes: "Produce melocotones cada día durante el verano."
    },
    {
        id: "apple_tree",
        name: "Manzano",
        category: "trees",
        fruitName: "Manzana",
        seasons: ["fall"],
        growthTime: 28,
        saplingPrice: 4000,
        fruitPrice: 100,
        fruitQualityPrices: { normal: 100, silver: 125, gold: 150, iridium: 200 },
        notes: "Produce manzanas cada día durante el otoño."
    },
    {
        id: "pomegranate_tree",
        name: "Granado",
        category: "trees",
        fruitName: "Granada",
        seasons: ["fall"],
        growthTime: 28,
        saplingPrice: 6000,
        fruitPrice: 140,
        fruitQualityPrices: { normal: 140, silver: 175, gold: 210, iridium: 280 },
        notes: "Produce granadas cada día durante el otoño."
    },
    {
        id: "banana_tree",
        name: "Banano",
        category: "trees",
        fruitName: "Plátano",
        seasons: ["summer"],
        growthTime: 28,
        saplingPrice: 0,
        fruitPrice: 150,
        fruitQualityPrices: { normal: 150, silver: 187, gold: 225, iridium: 300 },
        notes: "Disponible en la Isla Jengibre. Produce plátanos durante el verano."
    },
    {
        id: "mango_tree",
        name: "Mango",
        category: "trees",
        fruitName: "Mango",
        seasons: ["summer"],
        growthTime: 28,
        saplingPrice: 0,
        fruitPrice: 130,
        fruitQualityPrices: { normal: 130, silver: 162, gold: 195, iridium: 260 },
        notes: "Disponible en la Isla Jengibre. Produce mangos durante el verano."
    }
];

// Peces
const fishDatabase = [
    // PRIMAVERA
    {
        id: "anchovy",
        name: "Anchoa",
        category: "fish",
        seasons: ["spring", "fall"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 30,
        price: 30,
        qualityPrices: { normal: 30, silver: 37, gold: 45, iridium: 60 },
        notes: "Aparece en primavera y otoño en el océano."
    },
    {
        id: "smallmouth_bass",
        name: "Lobina de Boca Chica",
        category: "fish",
        seasons: ["spring", "fall", "winter"],
        locations: ["river"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 28,
        price: 50,
        qualityPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        notes: "Aparece en río en todas las estaciones excepto verano."
    },
    {
        id: "sunfish",
        name: "Pez Sol",
        category: "fish",
        seasons: ["spring", "summer"],
        locations: ["river"],
        weather: "sunny",
        time: "morning,afternoon",
        difficulty: 30,
        price: 30,
        qualityPrices: { normal: 30, silver: 37, gold: 45, iridium: 60 },
        notes: "Solo aparece en días soleados."
    },
    {
        id: "catfish",
        name: "Bagre",
        category: "fish",
        seasons: ["spring", "fall", "winter"],
        locations: ["river", "forest"],
        weather: "rainy",
        time: "morning,afternoon,evening",
        difficulty: 75,
        price: 200,
        qualityPrices: { normal: 200, silver: 250, gold: 300, iridium: 400 },
        notes: "Solo aparece cuando llueve. Muy difícil de pescar."
    },
    {
        id: "shad",
        name: "Sábalo",
        category: "fish",
        seasons: ["spring", "summer", "fall"],
        locations: ["river"],
        weather: "rainy",
        time: "morning,afternoon,evening",
        difficulty: 45,
        price: 60,
        qualityPrices: { normal: 60, silver: 75, gold: 90, iridium: 120 },
        notes: "Solo aparece cuando llueve."
    },
    {
        id: "legend",
        name: "Legend",
        category: "fish",
        seasons: ["spring"],
        locations: ["forest"],
        weather: "rainy",
        time: "morning",
        difficulty: 110,
        price: 5000,
        qualityPrices: { normal: 5000, silver: 6250, gold: 7500, iridium: 10000 },
        notes: "Uno de los 5 peces legendarios. Solo uno por archivo."
    },
    
    // VERANO
    {
        id: "tilapia",
        name: "Tilapia",
        category: "fish",
        seasons: ["summer", "fall"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 50,
        price: 75,
        qualityPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        notes: "Aparece en verano y otoño en el océano."
    },
    {
        id: "pufferfish",
        name: "Pez Globo",
        category: "fish",
        seasons: ["summer"],
        locations: ["ocean"],
        weather: "sunny",
        time: "afternoon",
        difficulty: 80,
        price: 200,
        qualityPrices: { normal: 200, silver: 250, gold: 300, iridium: 400 },
        notes: "Solo aparece en verano durante las tardes soleadas."
    },
    {
        id: "red_mullet",
        name: "Salmonete",
        category: "fish",
        seasons: ["summer", "winter"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 55,
        price: 75,
        qualityPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        notes: "Aparece en verano e invierno en el océano."
    },
    {
        id: "red_snapper",
        name: "Pargo Rojo",
        category: "fish",
        seasons: ["summer", "fall", "winter"],
        locations: ["ocean"],
        weather: "rainy",
        time: "morning,afternoon,evening",
        difficulty: 40,
        price: 50,
        qualityPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        notes: "Aparece cuando llueve."
    },
    {
        id: "crimsonfish",
        name: "Crimsonfish",
        category: "fish",
        seasons: ["summer"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 95,
        price: 1500,
        qualityPrices: { normal: 1500, silver: 1875, gold: 2250, iridium: 3000 },
        notes: "Uno de los 5 peces legendarios. Solo aparece en verano."
    },
    
    // OTOÑO
    {
        id: "salmon",
        name: "Salmón",
        category: "fish",
        seasons: ["fall"],
        locations: ["river"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 50,
        price: 75,
        qualityPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        notes: "Solo aparece en otoño en el río."
    },
    {
        id: "sea_cucumber",
        name: "Pepino de Mar",
        category: "fish",
        seasons: ["fall", "winter"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 40,
        price: 75,
        qualityPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        notes: "Aparece en otoño e invierno en el océano."
    },
    {
        id: "super_cucumber",
        name: "Súper Pepino",
        category: "fish",
        seasons: ["summer", "fall"],
        locations: ["ocean"],
        weather: "both",
        time: "evening",
        difficulty: 80,
        price: 250,
        qualityPrices: { normal: 250, silver: 312, gold: 375, iridium: 500 },
        notes: "Aparece en verano y otoño durante la noche."
    },
    {
        id: "tiger_trout",
        name: "Trucha Tigre",
        category: "fish",
        seasons: ["fall", "winter"],
        locations: ["river"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 60,
        price: 150,
        qualityPrices: { normal: 150, silver: 187, gold: 225, iridium: 300 },
        notes: "Aparece en otoño e invierno en el río."
    },
    {
        id: "angler",
        name: "Pez Pesacador",
        category: "fish",
        seasons: ["fall"],
        locations: ["river"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 85,
        price: 900,
        qualityPrices: { normal: 900, silver: 1125, gold: 1350, iridium: 1800 },
        notes: "Uno de los 5 peces legendarios. Solo aparece en otoño."
    },
    
    // INVIERNO
    {
        id: "perch",
        name: "Perca",
        category: "fish",
        seasons: ["winter"],
        locations: ["river", "lake"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 35,
        price: 55,
        qualityPrices: { normal: 55, silver: 68, gold: 82, iridium: 110 },
        notes: "Solo aparece en invierno."
    },
    {
        id: "squid",
        name: "Calamar",
        category: "fish",
        seasons: ["winter"],
        locations: ["ocean"],
        weather: "both",
        time: "evening",
        difficulty: 65,
        price: 80,
        qualityPrices: { normal: 80, silver: 100, gold: 120, iridium: 160 },
        notes: "Solo aparece en invierno durante la noche."
    },
    {
        id: "glacierfish",
        name: "Glacierfish",
        category: "fish",
        seasons: ["winter"],
        locations: ["forest"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 100,
        price: 1000,
        qualityPrices: { normal: 1000, silver: 1250, gold: 1500, iridium: 2000 },
        notes: "Uno de los 5 peces legendarios. Solo aparece en invierno."
    },
    
    // TODO EL AÑO
    {
        id: "carp",
        name: "Carpa",
        category: "fish",
        seasons: ["all-year"],
        locations: ["lake", "forest", "mine"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 15,
        price: 30,
        qualityPrices: { normal: 30, silver: 37, gold: 45, iridium: 60 },
        notes: "Aparece todo el año en varios lugares."
    },
    {
        id: "bream",
        name: "Berma",
        category: "fish",
        seasons: ["all-year"],
        locations: ["river"],
        weather: "both",
        time: "evening",
        difficulty: 35,
        price: 45,
        qualityPrices: { normal: 45, silver: 56, gold: 67, iridium: 90 },
        notes: "Aparece todo el año en el río por la noche."
    },
    {
        id: "largemouth_bass",
        name: "Lobina de Boca Grande",
        category: "fish",
        seasons: ["all-year"],
        locations: ["lake"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 50,
        price: 100,
        qualityPrices: { normal: 100, silver: 125, gold: 150, iridium: 200 },
        notes: "Aparece todo el año en el lago."
    },
    {
        id: "sardine",
        name: "Sardina",
        category: "fish",
        seasons: ["spring", "fall", "winter"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 30,
        price: 40,
        qualityPrices: { normal: 40, silver: 50, gold: 60, iridium: 80 },
        notes: "Aparece en primavera, otoño e invierno."
    },
    {
        id: "herring",
        name: "Arenque",
        category: "fish",
        seasons: ["spring", "winter"],
        locations: ["ocean"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 25,
        price: 30,
        qualityPrices: { normal: 30, silver: 37, gold: 45, iridium: 60 },
        notes: "Aparece en primavera e invierno."
    },
    {
        id: "eel",
        name: "Anguila",
        category: "fish",
        seasons: ["spring", "fall"],
        locations: ["ocean"],
        weather: "rainy",
        time: "evening",
        difficulty: 70,
        price: 85,
        qualityPrices: { normal: 85, silver: 106, gold: 127, iridium: 170 },
        notes: "Aparece en primavera y otoño cuando llueve por la noche."
    },
    {
        id: "octopus",
        name: "Pulpo",
        category: "fish",
        seasons: ["summer"],
        locations: ["ocean"],
        weather: "both",
        time: "morning",
        difficulty: 95,
        price: 150,
        qualityPrices: { normal: 150, silver: 187, gold: 225, iridium: 300 },
        notes: "Aparece en verano por la mañana. Muy difícil de pescar."
    },
    {
        id: "mutant_carp",
        name: "Carpa Mutante",
        category: "fish",
        seasons: ["all-year"],
        locations: ["secret"],
        weather: "both",
        time: "morning,afternoon,evening",
        difficulty: 80,
        price: 1000,
        qualityPrices: { normal: 1000, silver: 1250, gold: 1500, iridium: 2000 },
        notes: "Uno de los 5 peces legendarios. Aparece en las alcantarillas."
    }
];

// Productos Animales
const animalsDatabase = [
    // Gallinero
    {
        id: "egg",
        name: "Huevo",
        category: "animals",
        animal: "Gallina",
        building: "coop",
        basePrice: 50,
        qualityPrices: { normal: 50, silver: 62, gold: 75, iridium: 100 },
        productionTime: "diario",
        notes: "Producido por gallinas. Puede ser grande (valor doble)."
    },
    {
        id: "large_egg",
        name: "Huevo Grande",
        category: "animals",
        animal: "Gallina (Feliz)",
        building: "coop",
        basePrice: 95,
        qualityPrices: { normal: 95, silver: 118, gold: 142, iridium: 190 },
        productionTime: "diario",
        notes: "Producido por gallinas con alta amistad."
    },
    {
        id: "void_egg",
        name: "Huevo del Vacío",
        category: "animals",
        animal: "Gallina del Vacío",
        building: "coop",
        basePrice: 65,
        qualityPrices: { normal: 65, silver: 81, gold: 97, iridium: 130 },
        productionTime: "diario",
        notes: "Producido por Gallinas del Vacío."
    },
    {
        id: "duck_egg",
        name: "Huevo de Pato",
        category: "animals",
        animal: "Pato",
        building: "coop",
        basePrice: 95,
        qualityPrices: { normal: 95, silver: 118, gold: 142, iridium: 190 },
        productionTime: "diario",
        notes: "Producido por patos. También dejan plumas."
    },
    {
        id: "duck_feather",
        name: "Pluma de Pato",
        category: "animals",
        animal: "Pato",
        building: "coop",
        basePrice: 250,
        qualityPrices: { normal: 250, silver: 312, gold: 375, iridium: 500 },
        productionTime: "ocasional",
        notes: "Dejado por patos. No tiene calidad."
    },
    {
        id: "wool",
        name: "Lana",
        category: "animals",
        animal: "Oveja",
        building: "barn",
        basePrice: 340,
        qualityPrices: { normal: 340, silver: 425, gold: 510, iridium: 680 },
        productionTime: "cada 3 días",
        notes: "Producida por ovejas. El valor no varía con la calidad."
    },
    {
        id: "rabbit_foot",
        name: "Pata de Conejo",
        category: "animals",
        animal: "Conejo",
        building: "coop",
        basePrice: 565,
        qualityPrices: { normal: 565, silver: 706, gold: 847, iridium: 1130 },
        productionTime: "ocasional",
        notes: "Dejado por conejos. No tiene calidad."
    },
    {
        id: "dinosaur_egg",
        name: "Huevo de Dinosaurio",
        category: "animals",
        animal: "Dinosaurio",
        building: "coop",
        basePrice: 350,
        qualityPrices: { normal: 350, silver: 437, gold: 525, iridium: 700 },
        productionTime: "cada 7 días",
        notes: "Producido por dinosaurios."
    },
    
    // Establo
    {
        id: "milk",
        name: "Leche",
        category: "animals",
        animal: "Vaca",
        building: "barn",
        basePrice: 125,
        qualityPrices: { normal: 125, silver: 156, gold: 187, iridium: 250 },
        productionTime: "diario",
        notes: "Producida por vacas. Puede ser grande (valor doble)."
    },
    {
        id: "large_milk",
        name: "Leche Grande",
        category: "animals",
        animal: "Vaca (Feliz)",
        building: "barn",
        basePrice: 190,
        qualityPrices: { normal: 190, silver: 237, gold: 285, iridium: 380 },
        productionTime: "diario",
        notes: "Producida por vacas con alta amistad."
    },
    {
        id: "goat_milk",
        name: "Leche de Cabra",
        category: "animals",
        animal: "Cabra",
        building: "barn",
        basePrice: 225,
        qualityPrices: { normal: 225, silver: 281, gold: 337, iridium: 450 },
        productionTime: "cada 2 días",
        notes: "Producida por cabras. Puede ser grande (valor doble)."
    },
    {
        id: "large_goat_milk",
        name: "Leche de Cabra Grande",
        category: "animals",
        animal: "Cabra (Feliz)",
        building: "barn",
        basePrice: 345,
        qualityPrices: { normal: 345, silver: 431, gold: 517, iridium: 690 },
        productionTime: "cada 2 días",
        notes: "Producida por cabras con alta amistad."
    },
    {
        id: "truffle",
        name: "Trufa",
        category: "animals",
        animal: "Cerdo",
        building: "barn",
        basePrice: 625,
        qualityPrices: { normal: 625, silver: 781, gold: 937, iridium: 1250 },
        productionTime: "diario (en pasto)",
        notes: "Encontrada por cerdos en pasto. Calidad depende de forraje."
    },
    {
        id: "truffle_oil",
        name: "Aceite de Trufa",
        category: "animals",
        animal: "Cerdo (Procesado)",
        building: "barn",
        basePrice: 1065,
        qualityPrices: { normal: 1065, silver: 1331, gold: 1597, iridium: 2130 },
        productionTime: "6 horas (procesador)",
        notes: "Trufa procesada en procesador de aceite."
    }
];

// Hongos
const mushroomsDatabase = [
    {
        id: "common_mushroom",
        name: "Champiñón Común",
        category: "mushrooms",
        seasons: ["spring", "summer", "fall"],
        locations: ["farm", "forest", "mine"],
        price: 40,
        qualityPrices: { normal: 40, silver: 50, gold: 60, iridium: 80 },
        notes: "Aparece en la Cueva de los Hongos o en el bosque."
    },
    {
        id: "red_mushroom",
        name: "Champiñón Rojo",
        category: "mushrooms",
        seasons: ["spring", "summer", "fall"],
        locations: ["mine", "forest"],
        price: 75,
        qualityPrices: { normal: 75, silver: 93, gold: 112, iridium: 150 },
        notes: "Encontrado en las minas o bosque secreto. Venenoso."
    },
    {
        id: "purple_mushroom",
        name: "Champiñón Morado",
        category: "mushrooms",
        seasons: ["spring", "summer", "fall", "winter"],
        locations: ["mine"],
        price: 250,
        qualityPrices: { normal: 250, silver: 312, gold: 375, iridium: 500 },
        notes: "Encontrado en niveles profundos de la mina. Raro."
    },
    {
        id: "morel",
        name: "Colmenilla",
        category: "mushrooms",
        seasons: ["spring"],
        locations: ["forest", "secret"],
        price: 150,
        qualityPrices: { normal: 150, silver: 187, gold: 225, iridium: 300 },
        notes: "Aparece en primavera en el bosque secreto."
    },
    {
        id: "chanterelle",
        name: "Rebozuelo",
        category: "mushrooms",
        seasons: ["fall"],
        locations: ["forest", "secret"],
        price: 160,
        qualityPrices: { normal: 160, silver: 200, gold: 240, iridium: 320 },
        notes: "Aparece en otoño en el bosque secreto."
    },
    {
        id: "magma_cap",
        name: "Seta de Magma",
        category: "mushrooms",
        seasons: ["all-year"],
        locations: ["mine"],
        price: 400,
        qualityPrices: { normal: 400, silver: 500, gold: 600, iridium: 800 },
        notes: "Encontrado en la mina de la Isla Jengibre."
    }
];

// Traducciones
const seasonTranslations = {
    spring: "Primavera",
    summer: "Verano",
    fall: "Otoño",
    winter: "Invierno",
    "all-year": "Todo el año",
    multiple: "Multi-estación"
};

const qualityTranslations = {
    normal: "Normal",
    silver: "Plata",
    gold: "Oro",
    iridium: "Iridio"
};

const locationTranslations = {
    river: "Río",
    lake: "Lago",
    ocean: "Océano",
    forest: "Bosque",
    mine: "Mina",
    secret: "Bosque Secreto/Alcantarillas",
    farm: "Granja"
};

const buildingTranslations = {
    coop: "Gallinero",
    barn: "Establo"
};