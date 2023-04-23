import { expandBook } from "./book.js";
import {
    sortByAuthorAsc,
    sortByAuthorDesc,
    sortByPriceAsc,
    sortByPriceDesc,
    sortByTitleAsc,
    sortByTitleDesc,
} from "./filters.js";

const _filters = [
    "Title, Ascending",
    "Title, Descending",
    "Author, Ascending",
    "Author, Descending",
    "Price, Ascending",
    "Price, Descending",
];

const priceRanges = ["10-30€", "30-50€", "50-60€"];

async function fetchBooks() {
    const response = await fetch("/book");
    const data = await response.json();
    return data;
}

let books,
    categories = [],
    authors = [],
    prices = [],
    chosenCategory = "All",
    chosenAuthor = "All",
    chosenPrice = "All",
    chosenFilter = "All",
    cart = [];

async function start() {
    books = await fetchBooks();
    getAllAuthors(books);
    getAllCategories(books);
    addSortersAndFilters();
    displayBooks();
}

function getAllAuthors(books) {
    const authors_ = books.map((book) => book.author);
    authors = [...new Set(authors_)];
    authors.sort();
}

function getAllCategories(books) {
    const categories_ = books.map((book) => book.category);
    categories = [...new Set(categories_)];
    categories.sort();
}

function sortCategory(category) {
    if (category.length) {
        chosenCategory = category;
        displayBooks();
        return;
    }
    chosenCategory = "All";
    displayBooks();
}

function sortAuthor(author) {
    if (author.length) {
        chosenAuthor = author;
        displayBooks();
        return;
    }
    chosenAuthor = "All";
    displayBooks();
}

function sortPrice(priceRange) {
    priceRange = priceRange.replace("€", "");
    const [lower, upper] = priceRange.split("-");
    if (lower && upper) {
        chosenPrice = [lower, upper];
        displayBooks();
        return;
    }
    chosenPrice = "All";
    displayBooks();
}

function sortFilter(filter) {
    if (filter.length) {
        chosenFilter = filter;
        sortBooks();
        displayBooks();
        return;
    }
    chosenFilter = "All";
    displayBooks();
}

function addSortersAndFilters() {
    const filterList = document.getElementById("filter-container");
    const filters = [
        {
            name: "category",
            options: categories,
            callback: (category) => {
                sortCategory(category);
            },
        },
        {
            name: "author",
            options: authors,
            callback: (author) => {
                sortAuthor(author);
            },
        },
        {
            name: "price",
            options: priceRanges,
            callback: (price) => {
                sortPrice(price);
            },
        },
        {
            name: "sort",
            options: _filters,
            callback: (filter) => {
                sortFilter(filter);
            },
        },
    ];

    filters.forEach((filter) => {
        const filterName = filter.name;
        const filterOptions = filter.options;
        const filterCallback = filter.callback;

        const filterDiv = document.createElement("div");
        filterDiv.classList.add("nav-item", "dropdown");
        filterDiv.innerHTML = `
            
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
        aria-expanded="false" style="color: black;">${
            filterName.charAt(0).toUpperCase() + filterName.slice(1)
        }</a>
            <div class="dropdown-menu" id="filter-${filterName}">
                <a class="dropdown-item" href="#">All</a>
            </div>
        `;

        const dropdownMenu = filterDiv.querySelector(`#filter-${filterName}`);
        filterOptions.forEach((option) => {
            const optionElement = document.createElement("a");
            optionElement.classList.add("dropdown-item");
            optionElement.setAttribute("href", "#");
            optionElement.setAttribute("name", option);
            optionElement.innerHTML = option;
            dropdownMenu.appendChild(optionElement);
        });

        filterList.appendChild(filterDiv);

        // Give each dropdown item a click event listener
        const dropdownItems = filterDiv.querySelectorAll(".dropdown-item");
        dropdownItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                filterCallback(e.target.name);
            });
        });
    });
}

function sortBooks() {
    switch (chosenFilter) {
        case "Title, Ascending":
            books.sort(sortByTitleAsc);
            break;

        case "Title, Descending":
            books.sort(sortByTitleDesc);
            break;

        case "Author, Ascending":
            books.sort(sortByAuthorAsc);
            break;

        case "Author, Descending":
            books.sort(sortByAuthorDesc);
            break;

        case "Price, Ascending":
            books.sort(sortByPriceAsc);
            break;

        case "Price, Descending":
            books.sort(sortByPriceDesc);
            break;

        case "All":
            books.sort((a, b) => a.id > b.id);
            break;

        default:
            break;
    }
}

function addToCart(bookTitle) {
    if (bookTitle) {
        const book = books.find((book) => book.title === bookTitle);
        const bookInCart = cart.find((book) => book.title === bookTitle);
        if (bookInCart) {
            bookInCart.quantity++;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        displayCart();
    }
}

function displayCart() {
    const cartList = document.getElementById("cart-list");

    const cartListItems = cart.map((book) => cartItem(book)).join("");
    cartList.innerHTML = cartListItems;

    // Give each cart item a click event listener
    const cartItems = document.querySelectorAll("#remove-from-cart");
    cartItems.forEach((item) => {
        item.addEventListener("click", () => {
            removeBookFromCart(item.name);
        });
    });

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="dropdown-item">No items</div>
        `;
    }
}

function removeBookFromCart(bookTitle) {
    if (bookTitle) {
        const bookInCart = cart.find((book) => book.title === bookTitle);
        if (bookInCart) {
            if (bookInCart.quantity > 1) {
                bookInCart.quantity--;
            } else {
                cart = cart.filter((book) => book.title !== bookTitle);
            }
        }
        displayCart();
    }
}

function displayBooks() {
    const bookList = document.getElementById("book-list");
    sortBooks();
    const bookListItems = books
        .filter((book) => {
            if (chosenCategory === "All") {
                return true;
            } else {
                return book.category === chosenCategory;
            }
        })
        .filter((book) => {
            if (chosenAuthor === "All") {
                return true;
            } else {
                return book.author === chosenAuthor;
            }
        })
        .filter((book) => {
            if (chosenPrice === "All") {
                return true;
            } else {
                return (
                    book.price >= chosenPrice[0] && book.price <= chosenPrice[1]
                );
            }
        })
        .map((book) => bookCard(book))
        .join("");

    bookListItems === ""
        ? (bookList.innerHTML = `
            <div class="text-muted mt-5">No books found... Try changing the active filters!</div>
        `)
        : (bookList.innerHTML = bookListItems);

    // Give each card a click event listener
    const cards = document.querySelectorAll("#base-card");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            expandBook(card);
        });
    });

    const categoryButtons = document.querySelectorAll("#category-btn");
    categoryButtons.forEach((categoryBtn) => {
        categoryBtn.addEventListener("click", (e) => {
            sortCategory(e.target.name);
        });
    });

    const shopButtons = document.querySelectorAll("#shop-btn");
    shopButtons.forEach((shopBtn) => {
        shopBtn.addEventListener("click", (e) => {
            addToCart(e.target.name);
        });
    });
}

const bookCard = (book) => `
    <div class="card" id="base-card">
        <did class="card-body" id="no-style">
            <button id="overlay-button">
                <div class="card-title" id="card-title">${book.title}</div>
                <div class="card-subtitle" id="card-subtitle">${book.author}</div>
                <img class="card-img-top" src="" alt="Loading..." id="hidden-image">
                <div class="card-text" id="card-text">${book.description}</div>
            </button>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-secondary" id="category-btn" name="${book.category}">
                    ${book.category}
                </button>
                <button type="button" class="btn btn-outline-primary" id="shop-btn" name="${book.title}">
                    ${book.price} <i class="fas fa-euro-sign"></i>
                </button>
            </div>
            <div id="invisible-info-bubble">
                <i class="fas fa-info-circle fa-g"></i> <span>Double click the card text to collapse it</span>
            </div> 
        </div>
    </div>
`;

const cartItem = (book) => `
    <li>
        <div class="dropdown-item" href="#">
        <a style="margin-right: 1em" id="remove-from-cart" name="${book.title}"> <i class="fas fa-x"></i> </a>
         ${book.title}, ${book.quantity} </a>
    </li>
`;

start();
