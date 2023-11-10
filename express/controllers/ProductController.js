// Importar el modelo Product
import Product from '../models/Product.js';

// Controlador para obtener todos los productos
const getAllProducts = async (req, res) => {

    // TODO: Obtener todos los productos y filtrar por queryparams si existen 
    try {
        const filterParams = req.query;
        const page = parseInt(filterParams.page) || 1;
        const limit = parseInt(filterParams.limit) || 100;

        const query = {};

        // Aplicar filtros
        if (filterParams.name) {
            query.name = new RegExp(filterParams.name, 'i');
        }

        if (filterParams.price) {
            query.price = parseFloat(filterParams.price)
        }

        if (filterParams.description) {
            query.description = new RegExp(filterParams.description, 'i');
        }

        if (filterParams.category) {
            query.category = new RegExp(filterParams.category, 'i');
        }

        if (filterParams.brand) {
            query.brand = new RegExp(filterParams.brand, 'i');
        }

        if (filterParams.condition) {
            query.condition = new RegExp(filterParams.condition, 'i')
        }

        if (filterParams.stock) {
            query.stock = parseInt(filterParams.stock);
        }


        // Calcular el número total de resultados
        const totalResults = await Product.countDocuments(query);

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalResults / limit);

        // Ejecutar la consulta
        const allProducts = await
            Product
                .find(query)
                .sort('price')
                .skip((page - 1) * limit)
                .limit(limit);

        // Devolver los resultados de la consulta y la información de paginación
        res.json({
            results: allProducts,
            page: page,
            limit: limit,
            totalPages: totalPages,
            totalResults: totalResults
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }

};

// Controlador para obtener un producto por su ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product' });
    }
};

// Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, price, description, category, brand, condition, image, stock } = req.body;

    const newProduct = new Product({
        name,
        price,
        description,
        category,
        brand,
        condition,
        image,
        stock
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

// Controlador para actualizar un producto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, brand, condition, image, stock } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.brand = brand;
        product.condition = condition;
        product.image = image;
        product.stock = stock

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

// Controlador para eliminar un producto
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};

// Define la función para cargar muchos productos random
const loadRandomProducts = async (req, res) => {
    try {
        // Crea una lista de productos random
        const products = [
            {
                name: 'Apple MacBook Pro 13-inch',
                price: 1299.99,
                description: 'Powerful laptop with Retina display',
                category: 'Laptops',
                brand: 'Apple',
                condition: 'New',
                image: 'https://cdn-ipoint.waugi.com.ar/25978-thickbox_default/macbook-pro-13-chip-m2-cpu-8-gpu-10-256gb-ssd-space-gray.jpg',
                stock: 25
            },
            {
                name: 'Samsung 55-inch 4K Smart TV',
                price: 799.99,
                description: 'Ultra HD LED TV with smart features',
                category: 'Televisions',
                brand: 'Samsung',
                condition: 'New',
                image: 'https://samsungar.vtexassets.com/arquivos/ids/190779/Samsung-124326680-ar-crystal-uhd-cu7000-un55cu7000gczb-536471182--Download-Source-.png?v=638284188169600000',
                stock: 10
            },
            {
                name: 'Sony PlayStation 5',
                price: 499.99,
                description: 'Next-gen gaming console with ray tracing',
                category: 'Gaming Consoles',
                brand: 'Sony',
                condition: 'New',
                image: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/467/245/products/playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul201-e59c500d6c0f8272d816131695721102-1024-1024.png',
                stock: 15
            },
            {
                name: 'Bose QuietComfort 35 II Headphones',
                price: 299.99,
                description: 'Wireless noise-canceling headphones',
                category: 'Headphones',
                brand: 'Bose',
                condition: 'New',
                image: 'https://images.fravega.com/f1000/a437464e38816065d2cdf45575b25ab7.png',
                stock: 30
            },
            {
                name: 'Dell XPS 15 Laptop',
                price: 1399.99,
                description: 'High-performance laptop with InfinityEdge display',
                category: 'Laptops',
                brand: 'Dell',
                condition: 'New',
                image: 'https://www.custommacbd.com/cdn/shop/products/xps-17-9720-custom-mac-bd_1200x1200.png?v=1656156454',
                stock: 20
            },
            {
                name: 'LG 65-inch OLED 4K Smart TV',
                price: 1999.99,
                description: 'Premium OLED TV with AI ThinQ',
                category: 'Televisions',
                brand: 'LG',
                condition: 'New',
                image: 'https://media.croma.com/image/upload/v1689335445/Croma%20Assets/Entertainment/Television/Images/274034_0_s8gsue.png',
                stock: 12
            },
            {
                name: 'Canon EOS 5D Mark IV DSLR Camera',
                price: 2499.99,
                description: 'Professional-grade digital camera with 30.4MP sensor',
                category: 'Cameras',
                brand: 'Canon',
                condition: 'New',
                image: 'https://3.img-dpreview.com/files/p/E~C0x0S1802x1351T1200x900~articles/4390091201/HR_5D_MARKIV_EF24-105_3Q_CL-43.png',
                stock: 8
            },
            {
                name: 'Bose SoundLink Revolve+ Bluetooth Speaker',
                price: 249.99,
                description: '360-degree portable speaker with deep, loud, and immersive sound',
                category: 'Speakers',
                brand: 'Bose',
                condition: 'New',
                image: 'https://assets.bosecreative.com/transform/3bb7112e-de2f-4595-9f3d-369e83fa9528/SLRII_BoseBlack_005_RGB',
                stock: 15
            },
            {
                name: 'Samsung Galaxy S21 5G Smartphone',
                price: 799.99,
                description: 'Flagship 5G smartphone with high-resolution camera',
                category: 'Smartphones',
                brand: 'Samsung',
                condition: 'New',
                image: 'https://images.samsung.com/is/image/samsung/p6pim/ar/galaxy-s21/gallery/ar-galaxy-s21-5g-g991-sm-g991bzalaro-368338802',
                stock: 18
            },
            {
                name: 'Sony 65-inch 4K OLED Smart TV',
                price: 2799.99,
                description: 'OLED TV with Acoustic Surface Audio+',
                category: 'Televisions',
                brand: 'Sony',
                condition: 'New',
                image: 'https://store.sony.co.nz/dw/image/v2/ABBC_PRD/on/demandware.static/-/Sites-sony-master-catalog/default/dw7c8a4de9/images/XR65A80K/XR65A80K_01.png',
                stock: 9
            },
            {
                name: 'Apple AirPods Pro',
                price: 249.99,
                description: 'Active noise-cancelling wireless earbuds',
                category: 'Headphones',
                brand: 'Apple',
                condition: 'New',
                image: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP880/sp880-airpods-Pro-2nd-gen.png',
                stock: 22
            }
            // ... agregar más productos aquí
        ];

        // Inserta los productos en la base de datos
        await Product.insertMany(products);
        res.json({
            message: 'products loaded successfully'
        })
        console.log('Products loaded successfully');
    } catch (error) {
        console.error('Error loading products:', error);
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    loadRandomProducts
};
