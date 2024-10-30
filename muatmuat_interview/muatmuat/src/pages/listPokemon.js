import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "Pokemon Id", width: 500 },
  { field: "name", headerName: "Pokemon Name", width: 500 },
];

export default function ListPokemon() {
  const fetchList = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );

      const formatted = response.data.results.map((i, index) => {
        return {
          id: index + 1,
          ...i,
        };
      });
      return formatted;
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["List Pokemon"],
    queryFn: fetchList,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
