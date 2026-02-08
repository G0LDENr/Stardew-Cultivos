// Variables globales
let currentSection = "cultivos";
let savedCalculations = JSON.parse(localStorage.getItem("stardewCalculations")) || [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeEventListeners();
    initializeCalculator();
    loadCrops();
    loadTrees();
    loadFish();
    loadAnimals();
    loadMushrooms();
    updateTotalQuantity();
    loadSavedCalculations();
});

// Navegación entre secciones
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Ocultar todas las secciones
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            currentSection = sectionId;
            
            // Actualizar los ítems en la calculadora según la categoría
            if (sectionId === 'calculadora') {
                updateCalculatorItems();
            }
        });
    });
}

// Inicializar event listeners
function initializeEventListeners() {
    // Cultivos
    document.getElementById('searchBtn').addEventListener('click', searchCrops);
    document.getElementById('suggestBtn').addEventListener('click', getSuggestions);
    
    // Árboles
    document.getElementById('searchTreesBtn').addEventListener('click', searchTrees);
    
    // Peces
    document.getElementById('searchFishBtn').addEventListener('click', searchFish);
    
    // Animales
    document.getElementById('searchAnimalsBtn').addEventListener('click', searchAnimals);
    
    // Hongos
    document.getElementById('searchMushroomsBtn').addEventListener('click', searchMushrooms);
    
    // Calculadora
    document.getElementById('calculateTotalBtn').addEventListener('click', calculateTotal);
    document.getElementById('clearCalcBtn').addEventListener('click', clearCalculator);
    document.getElementById('saveCalculationBtn').addEventListener('click', saveCalculation);
    
    // Cambio de categoría en calculadora
    document.getElementById('calcCategory').addEventListener('change', updateCalculatorItems);
    
    // Inputs de cantidad en calculadora
    const quantityInputs = ['calcNormal', 'calcSilver', 'calcGold', 'calcIridium'];
    quantityInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', updateTotalQuantity);
    });
    
    // Botones rápidos
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const multiplier = parseInt(this.getAttribute('data-multiplier'));
            applyQuickMultiplier(multiplier);
        });
    });
}

// Inicializar calculadora
function initializeCalculator() {
    updateCalculatorItems();
}

// Actualizar los ítems en la calculadora según la categoría seleccionada
function updateCalculatorItems() {
    const category = document.getElementById('calcCategory').value;
    const itemSelect = document.getElementById('calcItem');
    
    // Limpiar opciones actuales
    itemSelect.innerHTML = '<option value="">Selecciona un ítem</option>';
    
    // Obtener la base de datos correspondiente
    let database = [];
    switch(category) {
        case 'crops':
            database = cropsDatabase;
            break;
        case 'trees':
            database = treesDatabase;
            break;
        case 'fish':
            database = fishDatabase;
            break;
        case 'animals':
            database = animalsDatabase;
            break;
        case 'mushrooms':
            database = mushroomsDatabase;
            break;
    }
    
    // Agregar opciones al select
    database.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        itemSelect.appendChild(option);
    });
}

// Actualizar cantidad total en calculadora
function updateTotalQuantity() {
    const normal = parseInt(document.getElementById('calcNormal').value) || 0;
    const silver = parseInt(document.getElementById('calcSilver').value) || 0;
    const gold = parseInt(document.getElementById('calcGold').value) || 0;
    const iridium = parseInt(document.getElementById('calcIridium').value) || 0;
    
    const total = normal + silver + gold + iridium;
    document.getElementById('totalUnits').textContent = total;
}

// Aplicar multiplicador rápido
function applyQuickMultiplier(multiplier) {
    const inputs = ['calcNormal', 'calcSilver', 'calcGold', 'calcIridium'];
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        const currentValue = parseInt(input.value) || 0;
        let newValue = currentValue * multiplier;
        
        // Si es "Máx", establecer a 999
        if (multiplier === 999) {
            newValue = 999;
        }
        
        // Limitar a 999
        if (newValue > 999) {
            newValue = 999;
        }
        
        input.value = newValue;
    });
    
    updateTotalQuantity();
}

// Calcular total de venta
function calculateTotal() {
    const category = document.getElementById('calcCategory').value;
    const itemId = document.getElementById('calcItem').value;
    
    if (!itemId) {
        showCalculatorResult("Por favor, selecciona un ítem para calcular.", "error");
        return;
    }
    
    // Obtener cantidades
    const quantities = {
        normal: parseInt(document.getElementById('calcNormal').value) || 0,
        silver: parseInt(document.getElementById('calcSilver').value) || 0,
        gold: parseInt(document.getElementById('calcGold').value) || 0,
        iridium: parseInt(document.getElementById('calcIridium').value) || 0
    };
    
    // Verificar que haya al menos una cantidad
    const totalItems = quantities.normal + quantities.silver + quantities.gold + quantities.iridium;
    if (totalItems === 0) {
        showCalculatorResult("Por favor, ingresa al menos una cantidad para calcular.", "error");
        return;
    }
    
    // Buscar el ítem en la base de datos correspondiente
    let item = null;
    let database = [];
    
    switch(category) {
        case 'crops':
            database = cropsDatabase;
            break;
        case 'trees':
            database = treesDatabase;
            break;
        case 'fish':
            database = fishDatabase;
            break;
        case 'animals':
            database = animalsDatabase;
            break;
        case 'mushrooms':
            database = mushroomsDatabase;
            break;
    }
    
    item = database.find(i => i.id === itemId);
    
    if (!item) {
        showCalculatorResult("Ítem no encontrado.", "error");
        return;
    }
    
    // Calcular valores
    const prices = item.sellPrices || item.qualityPrices || item.fruitQualityPrices || {};
    
    const values = {
        normal: quantities.normal * (prices.normal || 0),
        silver: quantities.silver * (prices.silver || 0),
        gold: quantities.gold * (prices.gold || 0),
        iridium: quantities.iridium * (prices.iridium || 0)
    };
    
    const totalValue = values.normal + values.silver + values.gold + values.iridium;
    
    // Mostrar resultados
    showCalculatorResult({
        itemName: item.name,
        category: category,
        quantities: quantities,
        values: values,
        totalValue: totalValue,
        prices: prices
    });
}

// Mostrar resultados de la calculadora
function showCalculatorResult(result, type = "success") {
    const resultsContainer = document.getElementById('calculatorResults');
    
    if (type === "error") {
        resultsContainer.innerHTML = `
            <div class="calculation-result">
                <h3 style="color: #e76f51;"><i class="fas fa-exclamation-triangle"></i> Error</h3>
                <p>${result}</p>
            </div>
        `;
        return;
    }
    
    const { itemName, quantities, values, totalValue, prices } = result;
    
    // Determinar el color del total basado en el valor
    let totalColorClass = "profit-medium";
    if (totalValue >= 10000) totalColorClass = "profit-high";
    if (totalValue < 1000) totalColorClass = "profit-low";
    
    resultsContainer.innerHTML = `
        <div class="calculation-result">
            <h3><i class="fas fa-chart-line"></i> Resultado del Cálculo</h3>
            <p><strong>Ítem:</strong> ${itemName}</p>
            
            <div class="result-details">
                <div class="result-detail">
                    <h4 class="quality-normal"><i class="fas fa-circle"></i> Normal</h4>
                    <p>Cantidad: ${quantities.normal}</p>
                    <p>Precio: ${prices.normal}g</p>
                    <p>Subtotal: <strong>${values.normal}g</strong></p>
                </div>
                
                <div class="result-detail">
                    <h4 class="quality-silver"><i class="fas fa-star"></i> Plata</h4>
                    <p>Cantidad: ${quantities.silver}</p>
                    <p>Precio: ${prices.silver}g</p>
                    <p>Subtotal: <strong>${values.silver}g</strong></p>
                </div>
                
                <div class="result-detail">
                    <h4 class="quality-gold"><i class="fas fa-star"></i> Oro</h4>
                    <p>Cantidad: ${quantities.gold}</p>
                    <p>Precio: ${prices.gold}g</p>
                    <p>Subtotal: <strong>${values.gold}g</strong></p>
                </div>
                
                <div class="result-detail">
                    <h4 class="quality-iridium"><i class="fas fa-gem"></i> Iridio</h4>
                    <p>Cantidad: ${quantities.iridium}</p>
                    <p>Precio: ${prices.iridium}g</p>
                    <p>Subtotal: <strong>${values.iridium}g</strong></p>
                </div>
            </div>
            
            <div class="result-total ${totalColorClass}">
                <p>TOTAL DE VENTA</p>
                <p>${totalValue}g</p>
            </div>
        </div>
    `;
    
    // Guardar el cálculo actual en una variable global para poder guardarlo después
    window.currentCalculation = result;
}

// Limpiar calculadora
function clearCalculator() {
    document.getElementById('calcItem').value = "";
    document.getElementById('calcNormal').value = "0";
    document.getElementById('calcSilver').value = "0";
    document.getElementById('calcGold').value = "0";
    document.getElementById('calcIridium').value = "0";
    document.getElementById('calculatorResults').innerHTML = `
        <div class="results-placeholder">
            <i class="fas fa-calculator fa-3x"></i>
            <p>Selecciona un ítem y especifica las cantidades por calidad para calcular el valor total.</p>
        </div>
    `;
    updateTotalQuantity();
    window.currentCalculation = null;
}

// Guardar cálculo
function saveCalculation() {
    if (!window.currentCalculation) {
        alert("No hay ningún cálculo para guardar. Realiza un cálculo primero.");
        return;
    }
    
    const calculation = {
        ...window.currentCalculation,
        id: Date.now(),
        date: new Date().toLocaleString()
    };
    
    savedCalculations.push(calculation);
    localStorage.setItem("stardewCalculations", JSON.stringify(savedCalculations));
    loadSavedCalculations();
    
    alert("Cálculo guardado correctamente.");
}

// Cargar cálculos guardados
function loadSavedCalculations() {
    const container = document.getElementById('savedCalculations');
    
    if (savedCalculations.length === 0) {
        container.innerHTML = '<p class="empty-message">No hay cálculos guardados aún.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    savedCalculations.forEach((calc, index) => {
        const calcElement = document.createElement('div');
        calcElement.className = 'saved-calculation';
        
        calcElement.innerHTML = `
            <div class="saved-calculation-info">
                <p><strong>${calc.itemName}</strong> - ${calc.date}</p>
                <p>Total: <strong class="profit-high">${calc.totalValue}g</strong></p>
                <p>Cantidades: N:${calc.quantities.normal} P:${calc.quantities.silver} O:${calc.quantities.gold} I:${calc.quantities.iridium}</p>
            </div>
            <div class="saved-calculation-actions">
                <button class="btn-secondary" onclick="loadSavedCalculation(${index})"><i class="fas fa-upload"></i></button>
                <button class="btn-secondary" onclick="deleteSavedCalculation(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        container.appendChild(calcElement);
    });
}

// Cargar cálculo guardado
window.loadSavedCalculation = function(index) {
    if (index >= 0 && index < savedCalculations.length) {
        const calc = savedCalculations[index];
        
        // Cambiar a la sección de calculadora
        document.querySelector(`[data-section="calculadora"]`).click();
        
        // Establecer valores en la calculadora
        document.getElementById('calcCategory').value = calc.category;
        updateCalculatorItems();
        
        // Esperar un momento para que se actualicen los ítems
        setTimeout(() => {
            document.getElementById('calcItem').value = calc.itemId || '';
            document.getElementById('calcNormal').value = calc.quantities.normal;
            document.getElementById('calcSilver').value = calc.quantities.silver;
            document.getElementById('calcGold').value = calc.quantities.gold;
            document.getElementById('calcIridium').value = calc.quantities.iridium;
            
            updateTotalQuantity();
            calculateTotal();
        }, 100);
    }
};

// Eliminar cálculo guardado
window.deleteSavedCalculation = function(index) {
    if (confirm("¿Estás seguro de que quieres eliminar este cálculo?")) {
        savedCalculations.splice(index, 1);
        localStorage.setItem("stardewCalculations", JSON.stringify(savedCalculations));
        loadSavedCalculations();
    }
};

// Funciones para cargar datos iniciales
function loadCrops() {
    const initialCrops = cropsDatabase.filter(crop => crop.year === 1);
    displayCrops(initialCrops);
}

function loadTrees() {
    displayTrees(treesDatabase);
}

function loadFish() {
    displayFish(fishDatabase);
}

function loadAnimals() {
    displayAnimals(animalsDatabase);
}

function loadMushrooms() {
    displayMushrooms(mushroomsDatabase);
}

// Funciones de búsqueda y filtrado
function searchCrops() {
    const season = document.getElementById('season').value;
    const year = parseInt(document.getElementById('year').value);
    const growthTime = document.getElementById('growthTime').value;
    const cropType = document.getElementById('cropType').value;
    
    let filteredCrops = cropsDatabase.filter(crop => {
        if (crop.year > year) return false;
        if (season !== 'all' && !crop.seasons.includes(season)) return false;
        if (growthTime !== 'all' && crop.growthTime > parseInt(growthTime)) return false;
        if (cropType !== 'all' && crop.type !== cropType) return false;
        return true;
    });
    
    displayCrops(filteredCrops);
}

function searchTrees() {
    const season = document.getElementById('treeSeason').value;
    const treeType = document.getElementById('treeType').value;
    
    let filteredTrees = treesDatabase.filter(tree => {
        if (season !== 'all' && season !== 'multiple' && !tree.seasons.includes(season)) return false;
        if (season === 'multiple' && tree.seasons.length <= 1) return false;
        if (treeType !== 'all') {
            if (treeType === 'common' && tree.saplingPrice >= 4000) return false;
            if (treeType === 'exotic' && tree.saplingPrice < 4000) return false;
        }
        return true;
    });
    
    displayTrees(filteredTrees);
}

function searchFish() {
    const season = document.getElementById('fishSeason').value;
    const location = document.getElementById('fishLocation').value;
    const weather = document.getElementById('fishWeather').value;
    const time = document.getElementById('fishTime').value;
    
    let filteredFish = fishDatabase.filter(fish => {
        if (season !== 'all' && season !== 'all-year' && !fish.seasons.includes(season)) {
            if (fish.seasons[0] !== 'all-year') return false;
        }
        if (location !== 'all' && !fish.locations.includes(location)) return false;
        if (weather !== 'all' && weather !== 'both' && fish.weather !== weather && fish.weather !== 'both') return false;
        if (time !== 'all' && !fish.time.includes(time)) return false;
        return true;
    });
    
    displayFish(filteredFish);
}

function searchAnimals() {
    const animalType = document.getElementById('animalType').value;
    const productType = document.getElementById('productType').value;
    const productQuality = document.getElementById('productQuality').value;
    
    let filteredAnimals = animalsDatabase.filter(animal => {
        if (animalType !== 'all' && animal.building !== animalType) return false;
        if (productType !== 'all') {
            if (productType === 'egg' && !animal.name.toLowerCase().includes('huevo')) return false;
            if (productType === 'milk' && !animal.name.toLowerCase().includes('leche')) return false;
            if (productType === 'wool' && animal.name !== 'Lana') return false;
            if (productType === 'other' && 
                animal.name.toLowerCase().includes('huevo') && 
                animal.name.toLowerCase().includes('leche') && 
                animal.name !== 'Lana') return false;
        }
        return true;
    });
    
    displayAnimals(filteredAnimals);
}

function searchMushrooms() {
    const season = document.getElementById('mushroomSeason').value;
    const location = document.getElementById('mushroomLocation').value;
    const mushroomType = document.getElementById('mushroomType').value;
    
    let filteredMushrooms = mushroomsDatabase.filter(mushroom => {
        if (season !== 'all' && !mushroom.seasons.includes(season)) return false;
        if (location !== 'all' && !mushroom.locations.includes(location)) return false;
        if (mushroomType !== 'all') {
            if (mushroomType === 'common' && mushroom.price > 100) return false;
            if (mushroomType === 'rare' && mushroom.price <= 100 && mushroom.price > 200) return false;
            if (mushroomType === 'special' && mushroom.price <= 200) return false;
        }
        return true;
    });
    
    displayMushrooms(filteredMushrooms);
}

// Funciones de visualización
function displayCrops(crops) {
    const container = document.getElementById('resultsContainer');
    const countElement = document.getElementById('resultsCount');
    
    if (crops.length === 0) {
        container.innerHTML = '<p>No se encontraron cultivos con los filtros seleccionados.</p>';
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `(${crops.length} cultivos)`;
    
    let html = '';
    
    crops.forEach(crop => {
        const profits = {
            normal: (crop.sellPrices.normal || 0) - crop.price,
            silver: (crop.sellPrices.silver || 0) - crop.price,
            gold: (crop.sellPrices.gold || 0) - crop.price,
            iridium: (crop.sellPrices.iridium || 0) - crop.price
        };
        
        const getProfitClass = (profit) => {
            if (profit >= 100) return "profit-high";
            if (profit >= 30) return "profit-medium";
            return "profit-low";
        };
        
        const seasonClass = crop.seasons.length > 1 ? "multi-season-card" : `${crop.seasons[0]}-card`;
        
        html += `
        <div class="item-card crop-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${crop.name}</div>
                <div>
                    ${crop.seasons.map(season => 
                        `<span class="season-tag tag-${season}">${seasonTranslations[season]}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Crecimiento:</strong><br>
                    ${crop.growthTime} días ${crop.regrowTime > 0 ? `+ ${crop.regrowTime}d (re-crece)` : ''}
                </div>
                <div class="item-detail">
                    <strong>Precio semilla:</strong><br>
                    ${crop.price}g
                </div>
                <div class="item-detail">
                    <strong>Tipo:</strong><br>
                    ${getCropTypeName(crop.type)}<br>
                    Año ${crop.year}+
                </div>
                <div class="item-detail">
                    <strong>Ganancia (Normal):</strong><br>
                    <span class="${getProfitClass(profits.normal)}">+${profits.normal}g</span><br>
                    ${crop.price > 0 ? `ROI: ${((profits.normal / crop.price) * 100).toFixed(0)}%` : ''}
                </div>
            </div>
            
            <div class="quality-prices">
                <div class="quality-price-row header">
                    <div>Calidad</div>
                    <div class="quality-normal">Normal</div>
                    <div class="quality-silver">Plata</div>
                    <div class="quality-gold">Oro</div>
                    <div class="quality-iridium">Iridio</div>
                </div>
                <div class="quality-price-row">
                    <div>Precio</div>
                    <div>${crop.sellPrices.normal}g</div>
                    <div>${crop.sellPrices.silver}g</div>
                    <div>${crop.sellPrices.gold}g</div>
                    <div>${crop.sellPrices.iridium}g</div>
                </div>
                <div class="quality-price-row">
                    <div>Ganancia</div>
                    <div class="${getProfitClass(profits.normal)}">+${profits.normal}g</div>
                    <div class="${getProfitClass(profits.silver)}">+${profits.silver}g</div>
                    <div class="${getProfitClass(profits.gold)}">+${profits.gold}g</div>
                    <div class="${getProfitClass(profits.iridium)}">+${profits.iridium}g</div>
                </div>
            </div>
            
            <div class="note">
                <strong>Notas:</strong> ${crop.notes}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayTrees(trees) {
    const container = document.getElementById('treesContainer');
    const countElement = document.getElementById('treesCount');
    
    if (trees.length === 0) {
        container.innerHTML = '<p>No se encontraron árboles con los filtros seleccionados.</p>';
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `(${trees.length} árboles)`;
    
    let html = '';
    
    trees.forEach(tree => {
        const seasonClass = tree.seasons.length > 1 ? "multi-season-card" : `${tree.seasons[0]}-card`;
        
        html += `
        <div class="item-card tree-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${tree.name}</div>
                <div>
                    ${tree.seasons.map(season => 
                        `<span class="season-tag tag-${season}">${seasonTranslations[season]}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Fruto:</strong><br>
                    ${tree.fruitName}
                </div>
                <div class="item-detail">
                    <strong>Tiempo crecimiento:</strong><br>
                    ${tree.growthTime} días
                </div>
                <div class="item-detail">
                    <strong>Precio árbol:</strong><br>
                    ${tree.saplingPrice}g
                </div>
                <div class="item-detail">
                    <strong>Producción:</strong><br>
                    1 fruto/día en temporada
                </div>
            </div>
            
            <div class="quality-prices">
                <div class="quality-price-row header">
                    <div>Calidad Fruto</div>
                    <div class="quality-normal">Normal</div>
                    <div class="quality-silver">Plata</div>
                    <div class="quality-gold">Oro</div>
                    <div class="quality-iridium">Iridio</div>
                </div>
                <div class="quality-price-row">
                    <div>Precio</div>
                    <div>${tree.fruitQualityPrices.normal}g</div>
                    <div>${tree.fruitQualityPrices.silver}g</div>
                    <div>${tree.fruitQualityPrices.gold}g</div>
                    <div>${tree.fruitQualityPrices.iridium}g</div>
                </div>
            </div>
            
            <div class="note">
                <strong>Notas:</strong> ${tree.notes}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayFish(fishList) {
    const container = document.getElementById('fishContainer');
    const countElement = document.getElementById('fishCount');
    
    if (fishList.length === 0) {
        container.innerHTML = '<p>No se encontraron peces con los filtros seleccionados.</p>';
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `(${fishList.length} peces)`;
    
    let html = '';
    
    fishList.forEach(fish => {
        const seasons = fish.seasons[0] === 'all-year' ? ['all-year'] : fish.seasons;
        const seasonClass = seasons.length > 1 ? "multi-season-card" : seasons[0] === 'all-year' ? "multi-season-card" : `${seasons[0]}-card`;
        
        html += `
        <div class="item-card fish-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${fish.name}</div>
                <div>
                    ${seasons.map(season => 
                        `<span class="season-tag tag-${season}">${seasonTranslations[season]}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Ubicación:</strong><br>
                    ${fish.locations.map(loc => locationTranslations[loc]).join(', ')}
                </div>
                <div class="item-detail">
                    <strong>Clima:</strong><br>
                    ${fish.weather === 'both' ? 'Cualquier clima' : fish.weather === 'sunny' ? 'Soleado' : 'Lluvioso'}
                </div>
                <div class="item-detail">
                    <strong>Horario:</strong><br>
                    ${fish.time.split(',').map(t => {
                        if (t === 'morning') return '6AM-12PM';
                        if (t === 'afternoon') return '12PM-6PM';
                        if (t === 'evening') return '6PM-2AM';
                        return t;
                    }).join(', ')}
                </div>
                <div class="item-detail">
                    <strong>Dificultad:</strong><br>
                    ${fish.difficulty}/100
                </div>
            </div>
            
            <div class="quality-prices">
                <div class="quality-price-row header">
                    <div>Calidad</div>
                    <div class="quality-normal">Normal</div>
                    <div class="quality-silver">Plata</div>
                    <div class="quality-gold">Oro</div>
                    <div class="quality-iridium">Iridio</div>
                </div>
                <div class="quality-price-row">
                    <div>Precio</div>
                    <div>${fish.qualityPrices.normal}g</div>
                    <div>${fish.qualityPrices.silver}g</div>
                    <div>${fish.qualityPrices.gold}g</div>
                    <div>${fish.qualityPrices.iridium}g</div>
                </div>
            </div>
            
            <div class="note">
                <strong>Notas:</strong> ${fish.notes}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayAnimals(animals) {
    const container = document.getElementById('animalsContainer');
    const countElement = document.getElementById('animalsCount');
    
    if (animals.length === 0) {
        container.innerHTML = '<p>No se encontraron productos animales con los filtros seleccionados.</p>';
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `(${animals.length} productos)`;
    
    let html = '';
    
    animals.forEach(animal => {
        const buildingClass = animal.building === 'coop' ? 'spring-card' : 'fall-card';
        
        html += `
        <div class="item-card animal-card ${buildingClass}">
            <div class="item-header">
                <div class="item-name">${animal.name}</div>
                <div>
                    <span class="season-tag" style="background-color: ${animal.building === 'coop' ? '#ffd166' : '#e76f51'}; color: #1e3a2f;">
                        ${buildingTranslations[animal.building]}
                    </span>
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Animal:</strong><br>
                    ${animal.animal}
                </div>
                <div class="item-detail">
                    <strong>Producción:</strong><br>
                    ${animal.productionTime}
                </div>
                <div class="item-detail">
                    <strong>Edificio:</strong><br>
                    ${buildingTranslations[animal.building]}
                </div>
            </div>
            
            ${animal.qualityPrices ? `
            <div class="quality-prices">
                <div class="quality-price-row header">
                    <div>Calidad</div>
                    <div class="quality-normal">Normal</div>
                    <div class="quality-silver">Plata</div>
                    <div class="quality-gold">Oro</div>
                    <div class="quality-iridium">Iridio</div>
                </div>
                <div class="quality-price-row">
                    <div>Precio</div>
                    <div>${animal.qualityPrices.normal}g</div>
                    <div>${animal.qualityPrices.silver}g</div>
                    <div>${animal.qualityPrices.gold}g</div>
                    <div>${animal.qualityPrices.iridium}g</div>
                </div>
            </div>
            ` : `
            <div class="quality-prices">
                <div class="quality-price-row">
                    <div><strong>Precio fijo:</strong></div>
                    <div colspan="4">${animal.basePrice}g</div>
                </div>
            </div>
            `}
            
            <div class="note">
                <strong>Notas:</strong> ${animal.notes}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayMushrooms(mushrooms) {
    const container = document.getElementById('mushroomsContainer');
    const countElement = document.getElementById('mushroomsCount');
    
    if (mushrooms.length === 0) {
        container.innerHTML = '<p>No se encontraron hongos con los filtros seleccionados.</p>';
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `(${mushrooms.length} hongos)`;
    
    let html = '';
    
    mushrooms.forEach(mushroom => {
        const seasonClass = mushroom.seasons.length > 3 ? "multi-season-card" : `${mushroom.seasons[0]}-card`;
        
        html += `
        <div class="item-card mushroom-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${mushroom.name}</div>
                <div>
                    ${mushroom.seasons.map(season => 
                        `<span class="season-tag tag-${season}">${seasonTranslations[season]}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Ubicación:</strong><br>
                    ${mushroom.locations.map(loc => locationTranslations[loc]).join(', ')}
                </div>
                <div class="item-detail">
                    <strong>Precio base:</strong><br>
                    ${mushroom.price}g
                </div>
            </div>
            
            <div class="quality-prices">
                <div class="quality-price-row header">
                    <div>Calidad</div>
                    <div class="quality-normal">Normal</div>
                    <div class="quality-silver">Plata</div>
                    <div class="quality-gold">Oro</div>
                    <div class="quality-iridium">Iridio</div>
                </div>
                <div class="quality-price-row">
                    <div>Precio</div>
                    <div>${mushroom.qualityPrices.normal}g</div>
                    <div>${mushroom.qualityPrices.silver}g</div>
                    <div>${mushroom.qualityPrices.gold}g</div>
                    <div>${mushroom.qualityPrices.iridium}g</div>
                </div>
            </div>
            
            <div class="note">
                <strong>Notas:</strong> ${mushroom.notes}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Funciones auxiliares
function getCropTypeName(type) {
    const typeNames = {
        standard: "Estándar",
        regrow: "Re-crece",
        multi: "Multi-estación",
        special: "Especial"
    };
    return typeNames[type] || type;
}

function getSuggestions() {
    const season = document.getElementById('season').value;
    const year = parseInt(document.getElementById('year').value);
    
    let filteredCrops = cropsDatabase.filter(crop => crop.year <= year);
    
    if (season !== 'all') {
        filteredCrops = filteredCrops.filter(crop => crop.seasons.includes(season));
    }
    
    // Encontrar los mejores cultivos por categoría
    const bestProfit = [...filteredCrops]
        .filter(c => c.price > 0)
        .sort((a, b) => (b.sellPrices.normal - b.price) - (a.sellPrices.normal - a.price))[0];
    
    const bestDailyProfit = [...filteredCrops]
        .filter(c => c.price > 0)
        .sort((a, b) => ((b.sellPrices.normal - b.price) / b.growthTime) - ((a.sellPrices.normal - a.price) / a.growthTime))[0];
    
    const bestRegrow = [...filteredCrops]
        .filter(c => c.regrowTime > 0)
        .sort((a, b) => {
            const totalHarvestsA = season === 'all' ? 3 : Math.floor(28 / (a.growthTime + a.regrowTime));
            const totalHarvestsB = season === 'all' ? 3 : Math.floor(28 / (b.growthTime + b.regrowTime));
            const totalProfitA = (a.sellPrices.normal * totalHarvestsA) - a.price;
            const totalProfitB = (b.sellPrices.normal * totalHarvestsB) - b.price;
            return totalProfitB - totalProfitA;
        })[0];
    
    const seasonName = season === 'all' ? 'cualquier estación' : seasonTranslations[season];
    
    let suggestionsHTML = `<p>Para ${seasonName} del año ${year}:</p>`;
    
    if (bestProfit) {
        suggestionsHTML += `
        <h3>💰 Mayor ganancia por cosecha</h3>
        <p><strong>${bestProfit.name}</strong>: 
        Compra: ${bestProfit.price}g | Venta: ${bestProfit.sellPrices.normal}g 
        | Ganancia: <span class="profit-high">+${bestProfit.sellPrices.normal - bestProfit.price}g</span></p>
        <p>Calidad Oro: ${bestProfit.sellPrices.gold}g (+${bestProfit.sellPrices.gold - bestProfit.price}g)</p>
        `;
    }
    
    if (bestDailyProfit) {
        const dailyProfit = ((bestDailyProfit.sellPrices.normal - bestDailyProfit.price) / bestDailyProfit.growthTime).toFixed(1);
        suggestionsHTML += `
        <h3>⚡ Mayor ganancia diaria</h3>
        <p><strong>${bestDailyProfit.name}</strong>: 
        ${bestDailyProfit.growthTime}días | ${dailyProfit}g/día</p>
        <p>Ideal para cosechas rápidas y reinversión.</p>
        `;
    }
    
    if (bestRegrow) {
        suggestionsHTML += `
        <h3>♻️ Mejor cultivo re-crecedor</h3>
        <p><strong>${bestRegrow.name}</strong>: 
        Primera cosecha: ${bestRegrow.growthTime}d | Re-crece: ${bestRegrow.regrowTime}d</p>
        <p>Produce múltiples veces durante la temporada.</p>
        `;
    }
    
    // Mostrar sugerencias en un alert o en la sección de resultados
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <div class="suggestions">
            <h3>💡 Sugerencias para ti</h3>
            <div>${suggestionsHTML}</div>
        </div>
        ${resultsContainer.innerHTML}
    `;
}

// Agrega estas funciones al principio de tu archivo script.js

// Variables globales para búsqueda
let searchTimeout = null;

// Función para buscar en tiempo real
function setupRealTimeSearch() {
    // Cultivos
    const searchCropInput = document.getElementById('searchCropName');
    if (searchCropInput) {
        searchCropInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchCrops();
            }, 300);
        });
    }
    
    // Árboles
    const searchTreeInput = document.getElementById('searchTreeName');
    if (searchTreeInput) {
        searchTreeInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchTrees();
            }, 300);
        });
    }
    
    // Peces
    const searchFishInput = document.getElementById('searchFishName');
    if (searchFishInput) {
        searchFishInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchFish();
            }, 300);
        });
    }
    
    // Animales
    const searchAnimalInput = document.getElementById('searchAnimalName');
    if (searchAnimalInput) {
        searchAnimalInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchAnimals();
            }, 300);
        });
    }
    
    // Hongos
    const searchMushroomInput = document.getElementById('searchMushroomName');
    if (searchMushroomInput) {
        searchMushroomInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchMushrooms();
            }, 300);
        });
    }
    
    // Calculadora
    const searchCalcInput = document.getElementById('searchCalcItem');
    if (searchCalcInput) {
        searchCalcInput.addEventListener('input', function() {
            filterCalculatorItems(this.value);
        });
    }
}

// Función para filtrar items en calculadora
function filterCalculatorItems(searchTerm) {
    const select = document.getElementById('calcItem');
    const options = select.options;
    searchTerm = searchTerm.toLowerCase().trim();
    
    // Si está vacío, mostrar todos
    if (!searchTerm) {
        for (let i = 0; i < options.length; i++) {
            options[i].style.display = '';
        }
        return;
    }
    
    // Filtrar opciones
    let visibleCount = 0;
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const text = option.textContent.toLowerCase();
        
        if (text.includes(searchTerm)) {
            option.style.display = '';
            visibleCount++;
            
            // Resaltar texto coincidente
            const originalText = option.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            option.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
        } else {
            option.style.display = 'none';
        }
    }
    
    // Si solo hay un resultado, seleccionarlo automáticamente
    if (visibleCount === 1) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].style.display !== 'none' && options[i].value) {
                select.value = options[i].value;
                break;
            }
        }
    }
}

// Modificar las funciones de búsqueda existentes para incluir filtro por nombre

function searchCrops() {
    const season = document.getElementById('season').value;
    const year = parseInt(document.getElementById('year').value);
    const growthTime = document.getElementById('growthTime').value;
    const cropType = document.getElementById('cropType').value;
    const searchTerm = document.getElementById('searchCropName')?.value.toLowerCase().trim() || '';
    
    let filteredCrops = cropsDatabase.filter(crop => {
        if (crop.year > year) return false;
        if (season !== 'all' && !crop.seasons.includes(season)) return false;
        if (growthTime !== 'all' && crop.growthTime > parseInt(growthTime)) return false;
        if (cropType !== 'all' && crop.type !== cropType) return false;
        
        // Filtro por nombre
        if (searchTerm && !crop.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    displayCrops(filteredCrops, searchTerm);
}

function searchTrees() {
    const season = document.getElementById('treeSeason').value;
    const treeType = document.getElementById('treeType').value;
    const searchTerm = document.getElementById('searchTreeName')?.value.toLowerCase().trim() || '';
    
    let filteredTrees = treesDatabase.filter(tree => {
        if (season !== 'all' && season !== 'multiple' && !tree.seasons.includes(season)) return false;
        if (season === 'multiple' && tree.seasons.length <= 1) return false;
        if (treeType !== 'all') {
            if (treeType === 'common' && tree.saplingPrice >= 4000) return false;
            if (treeType === 'exotic' && tree.saplingPrice < 4000) return false;
        }
        
        // Filtro por nombre
        if (searchTerm && !tree.name.toLowerCase().includes(searchTerm) && 
            !tree.fruitName.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    displayTrees(filteredTrees, searchTerm);
}

function searchFish() {
    const season = document.getElementById('fishSeason').value;
    const location = document.getElementById('fishLocation').value;
    const weather = document.getElementById('fishWeather').value;
    const time = document.getElementById('fishTime').value;
    const searchTerm = document.getElementById('searchFishName')?.value.toLowerCase().trim() || '';
    
    let filteredFish = fishDatabase.filter(fish => {
        if (season !== 'all' && season !== 'all-year' && !fish.seasons.includes(season)) {
            if (fish.seasons[0] !== 'all-year') return false;
        }
        if (location !== 'all' && !fish.locations.includes(location)) return false;
        if (weather !== 'all' && weather !== 'both' && fish.weather !== weather && fish.weather !== 'both') return false;
        if (time !== 'all' && !fish.time.includes(time)) return false;
        
        // Filtro por nombre
        if (searchTerm && !fish.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    displayFish(filteredFish, searchTerm);
}

function searchAnimals() {
    const animalType = document.getElementById('animalType').value;
    const productType = document.getElementById('productType').value;
    const productQuality = document.getElementById('productQuality').value;
    const searchTerm = document.getElementById('searchAnimalName')?.value.toLowerCase().trim() || '';
    
    let filteredAnimals = animalsDatabase.filter(animal => {
        if (animalType !== 'all' && animal.building !== animalType) return false;
        if (productType !== 'all') {
            if (productType === 'egg' && !animal.name.toLowerCase().includes('huevo')) return false;
            if (productType === 'milk' && !animal.name.toLowerCase().includes('leche')) return false;
            if (productType === 'wool' && animal.name !== 'Lana') return false;
            if (productType === 'other' && 
                animal.name.toLowerCase().includes('huevo') && 
                animal.name.toLowerCase().includes('leche') && 
                animal.name !== 'Lana') return false;
        }
        
        // Filtro por nombre
        if (searchTerm && !animal.name.toLowerCase().includes(searchTerm) && 
            !animal.animal.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    displayAnimals(filteredAnimals, searchTerm);
}

function searchMushrooms() {
    const season = document.getElementById('mushroomSeason').value;
    const location = document.getElementById('mushroomLocation').value;
    const mushroomType = document.getElementById('mushroomType').value;
    const searchTerm = document.getElementById('searchMushroomName')?.value.toLowerCase().trim() || '';
    
    let filteredMushrooms = mushroomsDatabase.filter(mushroom => {
        if (season !== 'all' && !mushroom.seasons.includes(season)) return false;
        if (location !== 'all' && !mushroom.locations.includes(location)) return false;
        if (mushroomType !== 'all') {
            if (mushroomType === 'common' && mushroom.price > 100) return false;
            if (mushroomType === 'rare' && mushroom.price <= 100 && mushroom.price > 200) return false;
            if (mushroomType === 'special' && mushroom.price <= 200) return false;
        }
        
        // Filtro por nombre
        if (searchTerm && !mushroom.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    displayMushrooms(filteredMushrooms, searchTerm);
}

// Modificar funciones de display para resaltar búsqueda
function displayCrops(crops, searchTerm = '') {
    const container = document.getElementById('resultsContainer');
    const countElement = document.getElementById('resultsCount');
    
    if (crops.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No se encontraron cultivos</h3>
                <p>${searchTerm ? `No hay cultivos que coincidan con "${searchTerm}"` : 'Intenta con otros filtros'}</p>
            </div>
        `;
        countElement.textContent = '';
        return;
    }
    
    countElement.textContent = `(${crops.length} cultivos)`;
    
    let html = '';
    
    crops.forEach(crop => {
        const profits = {
            normal: (crop.sellPrices.normal || 0) - crop.price,
            silver: (crop.sellPrices.silver || 0) - crop.price,
            gold: (crop.sellPrices.gold || 0) - crop.price,
            iridium: (crop.sellPrices.iridium || 0) - crop.price
        };
        
        const getProfitClass = (profit) => {
            if (profit >= 100) return "profit-high";
            if (profit >= 30) return "profit-medium";
            return "profit-low";
        };
        
        const seasonClass = crop.seasons.length > 1 ? "multi-season-card" : `${crop.seasons[0]}-card`;
        
        // Resaltar texto de búsqueda si existe
        let displayName = crop.name;
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            displayName = crop.name.replace(regex, '<span class="highlight">$1</span>');
        }
        
        html += `
        <div class="item-card crop-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${displayName}</div>
                <div>
                    ${crop.seasons.map(season => 
                        `<span class="season-tag tag-${season}">${seasonTranslations[season]}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Crecimiento:</strong><br>
                    ${crop.growthTime} días ${crop.regrowTime > 0 ? `+ ${crop.regrowTime}d (re-crece)` : ''}
                </div>
                <div class="item-detail">
                    <strong>Precio semilla:</strong><br>
                    ${crop.price}g
                </div>
                <div class="item-detail">
                    <strong>Tipo:</strong><br>
                    ${getCropTypeName(crop.type)}<br>
                    Año ${crop.year}+
                </div>
                <div class="item-detail">
                    <strong>Ganancia (Normal):</strong><br>
                    <span class="${getProfitClass(profits.normal)}">+${profits.normal}g</span><br>
                    ${crop.price > 0 ? `ROI: ${((profits.normal / crop.price) * 100).toFixed(0)}%` : ''}
                </div>
            </div>
            
            <div class="quality-prices">
                <div class="quality-price-row header">
                    <div>Calidad</div>
                    <div class="quality-normal">Normal</div>
                    <div class="quality-silver">Plata</div>
                    <div class="quality-gold">Oro</div>
                    <div class="quality-iridium">Iridio</div>
                </div>
                <div class="quality-price-row">
                    <div>Precio</div>
                    <div>${crop.sellPrices.normal}g</div>
                    <div>${crop.sellPrices.silver}g</div>
                    <div>${crop.sellPrices.gold}g</div>
                    <div>${crop.sellPrices.iridium}g</div>
                </div>
                <div class="quality-price-row">
                    <div>Ganancia</div>
                    <div class="${getProfitClass(profits.normal)}">+${profits.normal}g</div>
                    <div class="${getProfitClass(profits.silver)}">+${profits.silver}g</div>
                    <div class="${getProfitClass(profits.gold)}">+${profits.gold}g</div>
                    <div class="${getProfitClass(profits.iridium)}">+${profits.iridium}g</div>
                </div>
            </div>
            
            <div class="note">
                <strong>Notas:</strong> ${crop.notes}
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

// Agrega parámetro searchTerm a las otras funciones display
function displayTrees(trees, searchTerm = '') {
    // ... código existente, pero agrega resaltado como en displayCrops
    let displayName = tree.name;
    if (searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        displayName = tree.name.replace(regex, '<span class="highlight">$1</span>');
    }
    // ... resto del código
}

// Similar para displayFish, displayAnimals, displayMushrooms

// Modificar initializeEventListeners para incluir búsqueda
function initializeEventListeners() {
    // ... listeners existentes ...
    
    // Inicializar búsqueda en tiempo real
    setupRealTimeSearch();
    
    // ... resto de listeners ...
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeEventListeners();
    initializeCalculator();
    setupRealTimeSearch(); // <-- Agregar esta línea
    // ... resto de inicialización ...
});