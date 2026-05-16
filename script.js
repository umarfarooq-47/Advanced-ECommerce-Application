// Local In-Memory Database State Ledger
let globalProductsRegistry = [
    {
        id: 101,
        title: "Nordic Minimalist Wireless Pods",
        price: 189,
        category: "tech",
        badge: "Trending",
        badgeColor: "bg-emerald-50 text-emerald-700",
        imgUrl: "🎧",
        desc: "High fidelity dynamic drivers with architectural aesthetic styling, adaptive cancellation mechanics, and premium leather touch surface points."
    },
    {
        id: 102,
        title: "Pristine Craft Leather Sleeve",
        price: 65,
        category: "gear",
        badge: "New Asset",
        badgeColor: "bg-blue-50 text-blue-700",
        imgUrl: "💼",
        desc: "Vegetable tanned handcrafted smartphone and small portfolio document structural sleeve built using full-grain heavy density cowhide leather framework."
    },
    {
        id: 103,
        title: "Mechanical Core Desk Dial Keyboard",
        price: 210,
        category: "tech",
        badge: "Top Rated",
        badgeColor: "bg-purple-50 text-purple-700",
        imgUrl: "⌨️",
        desc: "Hot-swappable tactile response performance linear switch keys coupled with monolithic aluminum control frame dials built for software developers."
    }
];

let globalShoppingSessionCart = [];

// Dynamic Marketplace Grid Layout Rendering Engine
function renderMarketplaceGrid(productsDataList) {
    const gridContainer = document.getElementById('product-catalog-grid');
    gridContainer.innerHTML = "";

    if (productsDataList.length === 0) {
        gridContainer.innerHTML = `<div class="col-span-2 text-center text-xs text-gray-400 py-12">No verification items matching query profile.</div>`;
        return;
    }

    productsDataList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "bg-white border border-gray-100 rounded-2xl p-3 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-all";
        
        productCard.innerHTML = `
            <div>
                <span class="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded-md ${product.badgeColor} z-10">${product.badge}</span>
                <div class="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center text-4xl mb-3 select-none">${product.imgUrl}</div>
                <h3 class="text-xs font-bold text-gray-900 leading-snug line-clamp-2">${product.title}</h3>
                <p class="text-[10px] text-gray-400 mt-1 line-clamp-2">${product.desc}</p>
            </div>
            <div class="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                <span class="text-sm font-extrabold text-gray-900">$${product.price.toFixed(2)}</span>
                <button onclick="addItemToCheckoutSessionCart(${product.id})" class="p-1.5 bg-gray-900 text-white rounded-lg hover:bg-emerald-600 transition-colors text-xs">
                    ＋
                </button>
            </div>
        `;
        gridContainer.appendChild(productCard);
    });
}

// Global Viewport Pipeline Router
function switchSystemViewport(targetViewId) {
    const mainGrid = document.getElementById('product-catalog-grid');
    const filterContainer = document.getElementById('search-filter-wrapper');
    const formView = document.getElementById('vendor-dashboard-view');
    
    const navHome = document.getElementById('nav-btn-home');
    const navSell = document.getElementById('nav-btn-sell');

    if (targetViewId === 'home') {
        mainGrid.classList.remove('hidden');
        filterContainer.classList.remove('hidden');
        formView.classList.add('hidden');
        navHome.className = "flex flex-col items-center text-emerald-600 transition-all";
        navSell.className = "flex flex-col items-center text-gray-400 hover:text-gray-600 transition-all";
        renderMarketplaceGrid(globalProductsRegistry);
    } else if (targetViewId === 'sell') {
        mainGrid.classList.add('hidden');
        filterContainer.classList.add('hidden');
        formView.classList.remove('hidden');
        navHome.className = "flex flex-col items-center text-gray-400 hover:text-gray-600 transition-all";
        navSell.className = "flex flex-col items-center text-emerald-600 transition-all";
    }
}

// Shopping Session Basket Business Logic Elements
function addItemToCheckoutSessionCart(productId) {
    const structuralTarget = globalProductsRegistry.find(p => p.id === productId);
    if (!structuralTarget) return;

    const matchedLineItem = globalShoppingSessionCart.find(item => item.product.id === productId);

    if (matchedLineItem) {
        matchedLineItem.quantity += 1;
    } else {
        globalShoppingSessionCart.push({ product: structuralTarget, quantity: 1 });
    }
    recalculateSystemCartStateLedger();
}

function updateLineItemQuantity(productId, updateDelta) {
    const matchedLineItem = globalShoppingSessionCart.find(item => item.product.id === productId);
    if (!matchedLineItem) return;

    matchedLineItem.quantity += updateDelta;
    if (matchedLineItem.quantity <= 0) {
        globalShoppingSessionCart = globalShoppingSessionCart.filter(item => item.product.id !== productId);
    }
    recalculateSystemCartStateLedger();
}

function recalculateSystemCartStateLedger() {
    const cartCounterBadge = document.getElementById('cart-counter-badge');
    const cartWrapper = document.getElementById('cart-items-wrapper');
    const totalDisplay = document.getElementById('cart-net-total-display');

    let totalQuantityCount = 0;
    let computedNetValuation = 0;

    cartWrapper.innerHTML = "";

    globalShoppingSessionCart.forEach(item => {
        totalQuantityCount += item.quantity;
        computedNetValuation += (item.product.price * item.quantity);

        const rowNode = document.createElement('div');
        rowNode.className = "flex items-center justify-between p-2.5 bg-gray-50 border border-gray-100 rounded-xl";
        rowNode.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-xl">${item.product.imgUrl}</span>
                <div>
                    <h4 class="text-[11px] font-bold text-gray-900 truncate w-32">${item.product.title}</h4>
                    <span class="text-[10px] text-gray-400 block">$${item.product.price.toFixed(2)} each</span>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateLineItemQuantity(${item.product.id}, -1)" class="w-5 h-5 bg-gray-200 text-gray-700 text-xs rounded flex items-center justify-center font-bold hover:bg-gray-300">-</button>
                <span class="text-xs font-bold text-gray-800">${item.quantity}</span>
                <button onclick="updateLineItemQuantity(${item.product.id}, 1)" class="w-5 h-5 bg-gray-200 text-gray-700 text-xs rounded flex items-center justify-center font-bold hover:bg-gray-300">+</button>
            </div>
        `;
        cartWrapper.appendChild(rowNode);
    });

    cartCounterBadge.innerText = totalQuantityCount;
    totalDisplay.innerText = `$${computedNetValuation.toFixed(2)}`;
    
    if (globalShoppingSessionCart.length === 0) {
        cartWrapper.innerHTML = `<p class="text-center text-[11px] text-gray-400 py-12">Your shopping basket ledger token profile is blank.</p>`;
    }
}

// Interactive Real-time Client Search Matrix Filters
function executeSearchFilter() {
    const queryToken = document.getElementById('market-search-input').value.toLowerCase();
    const filteredDataset = globalProductsRegistry.filter(product => {
        return product.title.toLowerCase().includes(queryToken) || product.desc.toLowerCase().includes(queryToken);
    });
    renderMarketplaceGrid(filteredDataset);
}

function filterMarketplace(categoryToken) {
    const tabButtons = document.querySelectorAll('.cat-tab');
    tabButtons.forEach(btn => {
        btn.classList.remove('bg-gray-900', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-600');
    });

    event.target.classList.remove('bg-gray-100', 'text-gray-600');
    event.target.classList.add('bg-gray-900', 'text-white');

    if (categoryToken === 'all') {
        renderMarketplaceGrid(globalProductsRegistry);
    } else {
        const filtered = globalProductsRegistry.filter(p => p.category === categoryToken);
        renderMarketplaceGrid(filtered);
    }
}

// User-Facing Asset Dynamic Multi-Listing System Submissions
function handleProductListingSubmission(event) {
    event.preventDefault();
    
    const titleVal = document.getElementById('form-item-title').value;
    const priceVal = parseFloat(document.getElementById('form-item-price').value);
    const catVal = document.getElementById('form-item-category').value;
    const descVal = document.getElementById('form-item-desc').value;

    const structuralPayload = {
        id: Date.now(),
        title: titleVal,
        price: priceVal,
        category: catVal,
        badge: "User Node",
        badgeColor: "bg-emerald-100 text-emerald-800 font-extrabold",
        imgUrl: "📦",
        desc: descVal
    };

    globalProductsRegistry.unshift(structuralPayload);
    document.getElementById('new-item-upload-form').reset();
    alert('Secure cryptographic product handshake complete! Upload node prepended onto market feed index.');
    switchSystemViewport('home');
}

// Overlay Toggle Controls UI Animation Modals
function toggleCartDrawer() {
    const drawerNode = document.getElementById('shopping-cart-drawer');
    drawerNode.classList.toggle('hidden');
}

function executePaymentGatewayWorkflow() {
    if (globalShoppingSessionCart.length === 0) {
        alert('Cannot authorize empty basket vectors.');
        return;
    }
    
    let computedNetValuation = 0;
    globalShoppingSessionCart.forEach(item => {
        computedNetValuation += (item.product.price * item.quantity);
    });

    document.getElementById('gateway-total-price-token').innerText = `$${computedNetValuation.toFixed(2)}`;
    document.getElementById('shopping-cart-drawer').classList.add('hidden');
    document.getElementById('checkout-wizard-modal').classList.remove('hidden');
}

function closePaymentModal() {
    document.getElementById('checkout-wizard-modal').classList.add('hidden');
}

function processOrderSuccessState() {
    alert('Transaction Verified! Payment token finalized over Luhn validation matrix pipeline protocols. Cart ledger reset.');
    globalShoppingSessionCart = [];
    recalculateSystemCartStateLedger();
    closePaymentModal();
}

// Runtime Core Synchronization Engine Initializer
window.onload = () => {
    renderMarketplaceGrid(globalProductsRegistry);
};
