import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

import { updateStore } from "../store/actions";

export default function New({ setPage }) {
  const dispatch = useDispatch();

  const [newData, setNewData] = useState({
    productName: undefined,
    price: undefined,
    stock: undefined,
  });
  const [error, setError] = useState({
    name: {
      active: false,
      message: "",
    },
    price: {
      active: false,
      message: "",
    },
    stock: {
      active: false,
      message: "",
    },
  });
  const [input, setInput] = useState({ loading: false, success: false });

  const { productName, price, stock } = newData;
  const { name: nameError, price: priceError, stock: stockError } = error;
  const { loading } = input;

  const handleChangeNewData = (field, value) => {
    let updatedData = value;

    if (field === "price" || field === "stock") {
      if (value < 0) {
        return;
      }
    }

    setNewData({ ...newData, [field]: updatedData });
  };

  const validate = () => {
    let errorResult = false;
    let errorForm = { ...error };

    if (!productName) {
      errorResult = true;
      errorForm.name = {
        active: true,
        message: "Please enter product name",
      };
    } else {
      errorForm.name = {
        active: false,
        message: "",
      };
    }

    if (!price) {
      errorResult = true;
      errorForm.price = {
        active: true,
        message: "Please enter product price",
      };
    } else {
      errorForm.price = {
        active: false,
        message: "",
      };
    }

    if (!stock) {
      errorResult = true;

      errorForm.stock = {
        active: true,
        message: "Please enter product stock",
      };
    } else {
      errorForm.stock = {
        active: false,
        message: "",
      };
    }

    setError({ ...error, ...errorForm });
    return errorResult;
  };

  function handleSubmit() {
    setInput({ ...input, loading: true });
    const result = validate();

    if (!result) {
      dispatch(updateStore("INSERT_PRODUCT", newData));

      setPage("home");
    }

    setInput({ ...input, loading: false });
  }

  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      <div className="flex items-center gap-x-5">
        <p className="font-bold text-3xl">New Product</p>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-1 flex-col gap-y-5">
          <TextField
            error={nameError.active}
            helperText={
              nameError.active ? nameError.message : "Please enter product name"
            }
            name="productName"
            id="product name"
            label="Name"
            value={productName}
            variant="standard"
            onChange={(e) => handleChangeNewData(e.target.name, e.target.value)}
          />

          <TextField
            error={priceError.active}
            id="price"
            helperText={
              priceError.active
                ? priceError.message
                : "Please enter product price"
            }
            value={price}
            label="Price"
            name="price"
            type="number"
            variant="standard"
            onChange={(e) => handleChangeNewData(e.target.name, e.target.value)}
          />

          <TextField
            error={stockError.active}
            id="stock"
            helperText={
              stockError.active
                ? stockError.message
                : "Please enter product stock"
            }
            value={stock}
            label="Stock"
            name="stock"
            type="number"
            variant="standard"
            onChange={(e) => handleChangeNewData(e.target.name, e.target.value)}
          />

          <button
            className="bg-black h-10 text-white font-bold rounded-md"
            onClick={() => !loading && handleSubmit()}
          >
            {loading ? "Loading ..." : "Submit"}
          </button>
        </div>

        <div className="flex flex-1"></div>
      </div>
    </div>
  );
}
