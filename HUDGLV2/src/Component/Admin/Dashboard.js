import React, { useState } from "react";
import { MyTables } from "../../Tools/Datable";
export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("");

  const columns = [
    {
      name: "Product",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const data = [
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
    {
      product: "Television",
      customer: "Jonny",
      price: 1200,
    },
  ];

  const filteringData = data.filter((items) => {
    if (searchInput === "") {
      return data;
    } else if (
      items.product.toLowerCase().includes(searchInput.toLowerCase()) ||
      items.customer.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return items;
    }
  });
  return (
    <>
      <div className="row g-3 my-2">
        <div className="col-md-3">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">720</h3>
              <p className="fs-5">Products</p>
            </div>
            <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">4920</h3>
              <p className="fs-5">Sales</p>
            </div>
            <i className="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">3899</h3>
              <p className="fs-5">Delivery</p>
            </div>
            <i className="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 className="fs-2">%25</h3>
              <p className="fs-5">Increase</p>
            </div>
            <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="card py-2">
          <h3 className="fs-4 mb-3">Recent Orders</h3>
          <MyTables
            columns={columns}
            data={filteringData}
            setSearchInput={setSearchInput}
            // filteringData={filteringData}
            showSearch={true}
          />
        </div>
      </div>
    </>
  );
}
