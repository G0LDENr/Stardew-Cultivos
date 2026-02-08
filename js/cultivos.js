// Variables globales
let currentSection = "cultivos";
let savedCalculations = JSON.parse(localStorage.getItem("stardewCalculations")) || [];
let searchTimeout = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando Stardew Valley Planner...");
    
    initializeNavigation();
    initializeEventListeners();
    initializeCalculator();
    setupRealTimeSearch();
    
    // Cargar datos iniciales
    if (cropsDatabase && cropsDatabase.length > 0) {
        loadCrops();
    }
    
    if (treesDatabase && treesDatabase.length > 0) {
        loadTrees();
    }
    
    if (fishDatabase && fishDatabase.length > 0) {
        loadFish();
    }
    
    if (animalsDatabase && animalsDatabase.length > 0) {
        loadAnimals();
    }
    
    if (mushroomsDatabase && mushroomsDatabase.length > 0) {
        loadMushrooms();
    }
    
    updateTotalQuantity();
    loadSavedCalculations();
    
    console.log("✅ Aplicación inicializada correctamente!");
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
            const sectionElement = document.getElementById(sectionId);
            
            if (sectionElement) {
                sectionElement.classList.add('active');
                currentSection = sectionId;
                
                // Actualizar los ítems en la calculadora según la categoría
                if (sectionId === 'calculadora') {
                    updateCalculatorItems();
                }
            }
        });
    });
}

// Inicializar event listeners
function initializeEventListeners() {
    // Cultivos
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', searchCrops);
    
    const suggestBtn = document.getElementById('suggestBtn');
    if (suggestBtn) suggestBtn.addEventListener('click', getSuggestions);
    
    // Árboles
    const searchTreesBtn = document.getElementById('searchTreesBtn');
    if (searchTreesBtn) searchTreesBtn.addEventListener('click', searchTrees);
    
    // Peces
    const searchFishBtn = document.getElementById('searchFishBtn');
    if (searchFishBtn) searchFishBtn.addEventListener('click', searchFish);
    
    // Animales
    const searchAnimalsBtn = document.getElementById('searchAnimalsBtn');
    if (searchAnimalsBtn) searchAnimalsBtn.addEventListener('click', searchAnimals);
    
    // Hongos
    const searchMushroomsBtn = document.getElementById('searchMushroomsBtn');
    if (searchMushroomsBtn) searchMushroomsBtn.addEventListener('click', searchMushrooms);
    
    // Calculadora
    const calculateTotalBtn = document.getElementById('calculateTotalBtn');
    if (calculateTotalBtn) calculateTotalBtn.addEventListener('click', calculateTotal);
    
    const clearCalcBtn = document.getElementById('clearCalcBtn');
    if (clearCalcBtn) clearCalcBtn.addEventListener('click', clearCalculator);
    
    const saveCalculationBtn = document.getElementById('saveCalculationBtn');
    if (saveCalculationBtn) saveCalculationBtn.addEventListener('click', saveCalculation);
    
    // Cambio de categoría en calculadora
    const calcCategory = document.getElementById('calcCategory');
    if (calcCategory) calcCategory.addEventListener('change', updateCalculatorItems);
    
    // Inputs de cantidad en calculadora
    const quantityInputs = ['calcNormal', 'calcSilver', 'calcGold', 'calcIridium'];
    quantityInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('input', updateTotalQuantity);
    });
    
    // Botones rápidos
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const multiplier = parseInt(this.getAttribute('data-multiplier'));
            applyQuickMultiplier(multiplier);
        });
    });
}

// Configurar búsqueda en tiempo real
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

// Filtrar items en calculadora
function filterCalculatorItems(searchTerm) {
    const select = document.getElementById('calcItem');
    if (!select) return;
    
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
}

// Inicializar calculadora
function initializeCalculator() {
    updateCalculatorItems();
}

// Actualizar los ítems en la calculadora
function updateCalculatorItems() {
    const category = document.getElementById('calcCategory').value;
    const itemSelect = document.getElementById('calcItem');
    
    if (!itemSelect) return;
    
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
        if (!input) return;
        
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
        itemId: itemId,
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
    
    // Guardar el cálculo actual para poder guardarlo después
    window.currentCalculation = result;
}

// Limpiar calculadora
function clearCalculator() {
    const itemSelect = document.getElementById('calcItem');
    if (itemSelect) itemSelect.value = "";
    
    document.getElementById('calcNormal').value = "0";
    document.getElementById('calcSilver').value = "0";
    document.getElementById('calcGold').value = "0";
    document.getElementById('calcIridium').value = "0";
    
    const resultsContainer = document.getElementById('calculatorResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <i class="fas fa-calculator fa-3x"></i>
                <p>Selecciona un ítem y especifica las cantidades por calidad para calcular el valor total.</p>
            </div>
        `;
    }
    
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
    
    alert("✅ Cálculo guardado correctamente.");
}

// Cargar cálculos guardados
function loadSavedCalculations() {
    const container = document.getElementById('savedCalculations');
    if (!container) return;
    
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
                <button class="btn-secondary" onclick="loadSavedCalculation(${index})">
                    <i class="fas fa-upload"></i>
                </button>
                <button class="btn-secondary" onclick="deleteSavedCalculation(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(calcElement);
    });
}

// Cargar cálculo guardado (función global)
window.loadSavedCalculation = function(index) {
    if (index >= 0 && index < savedCalculations.length) {
        const calc = savedCalculations[index];
        
        // Cambiar a la sección de calculadora
        const calcLink = document.querySelector('[data-section="calculadora"]');
        if (calcLink) calcLink.click();
        
        // Establecer valores en la calculadora
        setTimeout(() => {
            const categorySelect = document.getElementById('calcCategory');
            if (categorySelect) {
                categorySelect.value = calc.category;
                updateCalculatorItems();
                
                // Esperar a que se actualicen los ítems
                setTimeout(() => {
                    const itemSelect = document.getElementById('calcItem');
                    if (itemSelect) itemSelect.value = calc.itemId || '';
                    
                    document.getElementById('calcNormal').value = calc.quantities.normal;
                    document.getElementById('calcSilver').value = calc.quantities.silver;
                    document.getElementById('calcGold').value = calc.quantities.gold;
                    document.getElementById('calcIridium').value = calc.quantities.iridium;
                    
                    updateTotalQuantity();
                    calculateTotal();
                }, 100);
            }
        }, 100);
    }
};

// Eliminar cálculo guardado (función global)
window.deleteSavedCalculation = function(index) {
    if (confirm("¿Estás seguro de que quieres eliminar este cálculo?")) {
        savedCalculations.splice(index, 1);
        localStorage.setItem("stardewCalculations", JSON.stringify(savedCalculations));
        loadSavedCalculations();
    }
};

// Funciones para cargar datos iniciales
function loadCrops() {
    if (!cropsDatabase || cropsDatabase.length === 0) return;
    
    const initialCrops = cropsDatabase.filter(crop => crop.year === 1);
    displayCrops(initialCrops);
}

function loadTrees() {
    if (!treesDatabase || treesDatabase.length === 0) return;
    displayTrees(treesDatabase);
}

function loadFish() {
    if (!fishDatabase || fishDatabase.length === 0) return;
    displayFish(fishDatabase);
}

function loadAnimals() {
    if (!animalsDatabase || animalsDatabase.length === 0) return;
    displayAnimals(animalsDatabase);
}

function loadMushrooms() {
    if (!mushroomsDatabase || mushroomsDatabase.length === 0) return;
    displayMushrooms(mushroomsDatabase);
}

// Funciones de búsqueda y filtrado (con búsqueda por nombre)
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

// Funciones de visualización (con resaltado de búsqueda)
function displayCrops(crops, searchTerm = '') {
    const container = document.getElementById('resultsContainer');
    const countElement = document.getElementById('resultsCount');
    
    if (!container) return;
    
    if (!crops || crops.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No se encontraron cultivos</h3>
                <p>${searchTerm ? `No hay cultivos que coincidan con "${searchTerm}"` : 'Intenta con otros filtros'}</p>
            </div>
        `;
        if (countElement) countElement.textContent = '';
        return;
    }
    
    if (countElement) countElement.textContent = `(${crops.length} cultivos)`;
    
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

function displayTrees(trees, searchTerm = '') {
    const container = document.getElementById('treesContainer');
    const countElement = document.getElementById('treesCount');
    
    if (!container) return;
    
    if (!trees || trees.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-tree fa-3x"></i>
                <h3>No se encontraron árboles</h3>
                <p>${searchTerm ? `No hay árboles que coincidan con "${searchTerm}"` : 'Intenta con otros filtros'}</p>
            </div>
        `;
        if (countElement) countElement.textContent = '';
        return;
    }
    
    if (countElement) countElement.textContent = `(${trees.length} árboles)`;
    
    let html = '';
    
    trees.forEach(tree => {
        const seasonClass = tree.seasons.length > 1 ? "multi-season-card" : `${tree.seasons[0]}-card`;
        
        // Resaltar texto de búsqueda
        let displayName = tree.name;
        let displayFruit = tree.fruitName;
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            displayName = tree.name.replace(regex, '<span class="highlight">$1</span>');
            displayFruit = tree.fruitName.replace(regex, '<span class="highlight">$1</span>');
        }
        
        html += `
        <div class="item-card tree-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${displayName}</div>
                <div>
                    ${tree.seasons.map(season => 
                        `<span class="season-tag tag-${season}">${seasonTranslations[season]}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Fruto:</strong><br>
                    ${displayFruit}
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

function displayFish(fishList, searchTerm = '') {
    const container = document.getElementById('fishContainer');
    const countElement = document.getElementById('fishCount');
    
    if (!container) return;
    
    if (!fishList || fishList.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-fish fa-3x"></i>
                <h3>No se encontraron peces</h3>
                <p>${searchTerm ? `No hay peces que coincidan con "${searchTerm}"` : 'Intenta con otros filtros'}</p>
            </div>
        `;
        if (countElement) countElement.textContent = '';
        return;
    }
    
    if (countElement) countElement.textContent = `(${fishList.length} peces)`;
    
    let html = '';
    
    fishList.forEach(fish => {
        const seasons = fish.seasons[0] === 'all-year' ? ['all-year'] : fish.seasons;
        const seasonClass = seasons.length > 1 ? "multi-season-card" : seasons[0] === 'all-year' ? "multi-season-card" : `${seasons[0]}-card`;
        
        // Resaltar texto de búsqueda
        let displayName = fish.name;
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            displayName = fish.name.replace(regex, '<span class="highlight">$1</span>');
        }
        
        html += `
        <div class="item-card fish-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${displayName}</div>
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

function displayAnimals(animals, searchTerm = '') {
    const container = document.getElementById('animalsContainer');
    const countElement = document.getElementById('animalsCount');
    
    if (!container) return;
    
    if (!animals || animals.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-egg fa-3x"></i>
                <h3>No se encontraron productos animales</h3>
                <p>${searchTerm ? `No hay productos que coincidan con "${searchTerm}"` : 'Intenta con otros filtros'}</p>
            </div>
        `;
        if (countElement) countElement.textContent = '';
        return;
    }
    
    if (countElement) countElement.textContent = `(${animals.length} productos)`;
    
    let html = '';
    
    animals.forEach(animal => {
        const buildingClass = animal.building === 'coop' ? 'spring-card' : 'fall-card';
        
        // Resaltar texto de búsqueda
        let displayName = animal.name;
        let displayAnimal = animal.animal;
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            displayName = animal.name.replace(regex, '<span class="highlight">$1</span>');
            displayAnimal = animal.animal.replace(regex, '<span class="highlight">$1</span>');
        }
        
        html += `
        <div class="item-card animal-card ${buildingClass}">
            <div class="item-header">
                <div class="item-name">${displayName}</div>
                <div>
                    <span class="season-tag" style="background-color: ${animal.building === 'coop' ? '#ffd166' : '#e76f51'}; color: #1e3a2f;">
                        ${buildingTranslations[animal.building]}
                    </span>
                </div>
            </div>
            
            <div class="item-details">
                <div class="item-detail">
                    <strong>Animal:</strong><br>
                    ${displayAnimal}
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

function displayMushrooms(mushrooms, searchTerm = '') {
    const container = document.getElementById('mushroomsContainer');
    const countElement = document.getElementById('mushroomsCount');
    
    if (!container) return;
    
    if (!mushrooms || mushrooms.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-mushroom fa-3x"></i>
                <h3>No se encontraron hongos</h3>
                <p>${searchTerm ? `No hay hongos que coincidan con "${searchTerm}"` : 'Intenta con otros filtros'}</p>
            </div>
        `;
        if (countElement) countElement.textContent = '';
        return;
    }
    
    if (countElement) countElement.textContent = `(${mushrooms.length} hongos)`;
    
    let html = '';
    
    mushrooms.forEach(mushroom => {
        const seasonClass = mushroom.seasons.length > 3 ? "multi-season-card" : `${mushroom.seasons[0]}-card`;
        
        // Resaltar texto de búsqueda
        let displayName = mushroom.name;
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            displayName = mushroom.name.replace(regex, '<span class="highlight">$1</span>');
        }
        
        html += `
        <div class="item-card mushroom-card ${seasonClass}">
            <div class="item-header">
                <div class="item-name">${displayName}</div>
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
    
    if (filteredCrops.length === 0) {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-lightbulb fa-3x"></i>
                    <h3>Sin sugerencias</h3>
                    <p>No hay cultivos disponibles para los filtros seleccionados.</p>
                </div>
            `;
        }
        return;
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
        const profit = bestProfit.sellPrices.normal - bestProfit.price;
        const roi = bestProfit.price > 0 ? ((profit / bestProfit.price) * 100).toFixed(0) : 0;
        suggestionsHTML += `
        <div class="suggestion-item">
            <h3>💰 Mayor ganancia por cosecha</h3>
            <p><strong>${bestProfit.name}</strong></p>
            <p>Compra: ${bestProfit.price}g | Venta: ${bestProfit.sellPrices.normal}g</p>
            <p>Ganancia: <span class="profit-high">+${profit}g (${roi}% ROI)</span></p>
        </div>
        `;
    }
    
    if (bestDailyProfit) {
        const dailyProfit = ((bestDailyProfit.sellPrices.normal - bestDailyProfit.price) / bestDailyProfit.growthTime).toFixed(1);
        suggestionsHTML += `
        <div class="suggestion-item">
            <h3>⚡ Mayor ganancia diaria</h3>
            <p><strong>${bestDailyProfit.name}</strong></p>
            <p>${bestDailyProfit.growthTime} días de crecimiento</p>
            <p>Ganancia diaria: <span class="profit-medium">${dailyProfit}g/día</span></p>
        </div>
        `;
    }
    
    if (bestRegrow) {
        suggestionsHTML += `
        <div class="suggestion-item">
            <h3>♻️ Mejor cultivo re-crecedor</h3>
            <p><strong>${bestRegrow.name}</strong></p>
            <p>Primera cosecha: ${bestRegrow.growthTime} días</p>
            <p>Re-crece cada: ${bestRegrow.regrowTime} días</p>
        </div>
        `;
    }
    
    // Mostrar sugerencias
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="suggestions">
                <h3><i class="fas fa-lightbulb"></i> Sugerencias para ti</h3>
                <div class="suggestions-grid">${suggestionsHTML}</div>
            </div>
        `;
    }
}