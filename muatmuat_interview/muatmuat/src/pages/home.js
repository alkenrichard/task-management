import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStore } from "../store/actions";
import { TextField } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productName", headerName: "Product Name", width: 500 },
  { field: "price", headerName: "Price", width: 130, type: "number" },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 90,
  },
];

export default function Home({ setPage }) {
  const dispatch = useDispatch();

  const dataStorage = useSelector((state) => state.product);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const local = localStorage.getItem("product");

      if (local) {
        const formattedData = JSON.parse(local).map((i, index) => {
          const item = { ...i };
          item.id = index + 1;

          return item;
        });

        setData(formattedData);
      } else {
        const insertData = dataStorage.map((i, index) => {
          return { id: index + 1, ...i };
        });

        setData(insertData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSelected = (e) => {
    setSelected(e);
  };

  const handleAction = (action) => {
    if (action === "delete") {
      const updatedData = data.filter((i) => !selected.includes(i.id));
      const newProduct = updatedData.map((i, index) => {
        const item = { ...i };
        item.id = index + 1;

        return item;
      });

      setData(newProduct);
      dispatch(updateStore("DELETE_PRODUCT", newProduct));
      localStorage.setItem("product", JSON.stringify(newProduct));
    } else if (action === "edit") {
      setPage("edit", selected);
    }
  };

  const handleSearch = (value) => {
    let searchProduct = data.filter((d) =>
      d.productName.toLowerCase().includes(value.toLowerCase())
    );

    if (value === "") {
      searchProduct = null;
    }

    setSearch(value);
    setSearchResult(searchProduct);
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      <div className="flex items-center gap-x-5">
        <p className="font-bold text-3xl">Dashboard</p>

        <TextField
          name="search"
          id="search"
          label="Search by Product Name"
          value={search}
          size="small"
          onChange={(e) => handleSearch(e.target.value)}
        />

        <button
          className="rounded-md bg-[#00000010] px-4 py-2 flex justify-center items-center"
          onClick={() => setPage("new")}
        >
          <p className="text-sm">New Product</p>
        </button>

        {selected.length > 0 && (
          <button
            className="rounded-md bg-[#00000010] w-20 py-2 flex justify-center items-center"
            onClick={() => handleAction("delete")}
          >
            <p className="text-sm">Delete</p>
          </button>
        )}

        {selected.length === 1 && (
          <button
            className="rounded-md bg-[#00000010] w-20 py-2 flex justify-center items-center"
            onClick={() => handleAction("edit")}
          >
            <p className="text-sm">Edit</p>
          </button>
        )}
      </div>

      <div className="flex flex-1">
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={searchResult !== null ? searchResult : data}
            columns={columns}
            checkboxSelection
            sx={{ border: 0 }}
            onRowSelectionModelChange={handleSelected}
          />
        </Paper>
      </div>
    </div>
  );
}
