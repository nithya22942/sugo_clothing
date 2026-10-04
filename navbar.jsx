function Navbar(){
    return (
<header class="header" id="header">

        <div class="container nav-container">

            <a href="#home" class="logo">
                <span>S</span>UGO
            </a>

            <nav class="navbar" id="navbar">

                <a href="#home" class="nav-link active">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#collection" class="nav-link">Collection</a>
                <a href="#sustainability" class="nav-link">Sustainability</a>
                <a href="#reviews" class="nav-link">Reviews</a>
                <a href="#contact" class="nav-link">Contact</a>

            </nav>

            <div class="nav-actions">

                <button class="icon-btn" id="searchBtn" aria-label="Search">
                    🔍
                </button>

                <button class="cart-btn" id="cartBtn" aria-label="Shopping cart">
                    🛍️
                    <span id="cartCount">0</span>
                </button>

                <button class="menu-btn" id="menuBtn" aria-label="Open menu">
                    ☰
                </button>

            </div>

        </div>

        <!-- Search box -->

        <div class="search-box" id="searchBox">

            <div class="container search-container">

                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search sustainable clothing..."
                >

                <button id="closeSearch">✕</button>

            </div>

        </div>

    </header>
);
} 
export default Navbar;