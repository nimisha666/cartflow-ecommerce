import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input } from "antd";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("cartflow-ecommerce.vercel.app/api/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("cartflow-ecommerce.vercel.app/api/products");
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleUpdateProduct = async () => {
        if (!currentProduct) return;
        try {
            await axios.patch(`cartflow-ecommerce.vercel.app/api/products/update-product/${currentProduct._id}`, currentProduct);
            setIsEditing(false);
            fetchProducts(); // Refresh product list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const response = await fetch("cartflow-ecommerce.vercel.app/api/products/create-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Product added successfully!");
                setIsAdding(false); // Close modal
                setNewProduct({ name: "", price: "", category: "" }); // Reset form
                fetchProducts(); // Refresh product list
            } else {
                console.error("Error adding product:", data.message);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const orderColumns = [
        { title: "Order ID", dataIndex: "_id", key: "_id" },
        { title: "User", dataIndex: ["user", "email"], key: "user" },
        { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
        { title: "Status", dataIndex: "status", key: "status" },
    ];

    return (
        <div className="section__container">
            <h1>Admin Dashboard</h1>

            <h2>Orders</h2>
            <Table dataSource={orders} columns={orderColumns} rowKey="_id" />

            <h2>Products</h2>
            <Button onClick={() => setIsAdding(true)}>Add Product</Button>
            <Table
                dataSource={products}
                rowKey="_id"
                columns={[
                    { title: "Name", dataIndex: "name", key: "name" },
                    { title: "Price", dataIndex: "price", key: "price" },
                    { title: "Category", dataIndex: "category", key: "category" },
                    {
                        title: "Actions",
                        render: (_, record) => (
                            <Button onClick={() => handleEditProduct(record)}>Edit</Button>
                        ),
                    },
                ]}
            />

            {/* Edit Product Modal */}
            <Modal
                open={isEditing} // ✅ Replaced `visible` with `open`
                onCancel={() => setIsEditing(false)}
                onOk={handleUpdateProduct}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            value={currentProduct?.name || ""}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input
                            value={currentProduct?.price || ""}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Category">
                        <Input
                            value={currentProduct?.category || ""}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add Product Modal */}
            <Modal
                open={isAdding} // ✅ Replaced `visible` with `open`
                onCancel={() => setIsAdding(false)}
                onOk={handleAddProduct}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Category">
                        <Input
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
