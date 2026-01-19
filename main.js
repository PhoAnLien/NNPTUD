function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

const products = [
    new Product(1, "iPhone 15 Pro", 30000000, 10, "Phone", true),
    new Product(2, "Samsung S24", 25000000, 5, "Phone", true),
    new Product(3, "Ốp lưng iPhone", 150000, 50, "Accessories", true),
    new Product(4, "Sạc dự phòng", 500000, 0, "Accessories", false),
    new Product(5, "Tai nghe Airpods", 4000000, 15, "Accessories", true),
    new Product(6, "Xiaomi Note 13", 5000000, 20, "Phone", true)
];

console.log("Danh sách sản phẩm ban đầu");
console.log(products);

const nameAndPrice = products.map(product => {
    return { name: product.name, price: product.price };
});
console.log("\nCâu 3: Mảng Name và Price");
console.log(nameAndPrice);

const availableStock = products.filter(product => product.quantity > 0);
console.log("\nCâu 4: Sản phẩm còn hàng");
console.log(availableStock);

const hasExpensiveProduct = products.some(product => product.price > 30000000);
console.log("\nCâu 5: Có sản phẩm trên 30 triệu không?");
console.log(hasExpensiveProduct); 

const accessories = products.filter(p => p.category === "Accessories");
const allAccessoriesAvailable = accessories.every(p => p.isAvailable === true);

console.log("\nCâu 6: Tất cả phụ kiện đang bán đúng không?");
console.log(allAccessoriesAvailable);

const totalValue = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
}, 0);
console.log("\nCâu 7: Tổng giá trị kho");
console.log(totalValue.toLocaleString() + " VND");

console.log("\nCâu 8: Duyệt mảng bằng for...of");
for (const product of products) {
    console.log(`${product.name} - ${product.category} - ${product.isAvailable ? "Đang bán" : "Ngừng bán"}`);
}

console.log("\nCâu 9: Duyệt thuộc tính sản phẩm đầu tiên bằng for...in");
const firstProduct = products[0]; 
for (const key in firstProduct) {
    console.log(`Tên thuộc tính: ${key} | Giá trị: ${firstProduct[key]}`);
}

const sellingProducts = products
    .filter(p => p.isAvailable === true && p.quantity > 0)
    .map(p => p.name);

console.log("\nCâu 10: Tên sp đang bán và còn hàng");
console.log(sellingProducts);