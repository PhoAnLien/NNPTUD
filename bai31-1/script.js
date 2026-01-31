let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 10;

async function getAllProducts() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        allProducts = await response.json();
        filteredProducts = [...allProducts]; 
        renderUI();
    } catch (error) {
        console.error("Lỗi API:", error);
    }
}

function renderUI() {
    const tableBody = document.getElementById('tableBody');
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + parseInt(itemsPerPage);
    const dataToDisplay = filteredProducts.slice(start, end);

    tableBody.innerHTML = dataToDisplay.map(item => `
        <tr>
            <td>${item.id}</td>
            <td><img src="${item.images[0]}" onerror="this.src='https://placehold.co/60'"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
        </tr>
    `).join('');

    renderPagination();
}
document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    filteredProducts = allProducts.filter(p => 
        p.title.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderUI();
});
document.getElementById('sortSelect').addEventListener('change', (e) => {
    const type = e.target.value;
    if (type === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
    else if (type === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
    else if (type === 'name-asc') filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    else if (type === 'name-desc') filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    
    renderUI();
});
function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationDiv = document.getElementById('pagination');
    let html = '';

    for (let i = 1; i <= totalPages; i++) {
        if (i <= 10) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
    }
    paginationDiv.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    renderUI();
}

document.getElementById('perPageSelect').addEventListener('change', (e) => {
    itemsPerPage = e.target.value;
    currentPage = 1;
    renderUI();
});
getAllProducts();