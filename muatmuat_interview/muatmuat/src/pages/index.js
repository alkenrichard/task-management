import { useCallback, useState } from "react";
import Sidebar from "../layout/sidebar";
import Home from "./home";
import Edit from "./edit";
import New from "./new";

export default function Index() {
  const [page, setPage] = useState("home");
  const [items, setItems] = useState(null);

  const handleChangePage = (page, product) => {
    setPage(page);
  };

  const Page = useCallback(() => {
    if (page === "home") {
      return <Home setPage={handleChangePage} />;
    } else if (page === "edit") {
      return <Edit items={items} />;
    } else if (page === "new") {
      return <New setPage={handleChangePage} />;
    }
  }, [page]);

  return (
    <div className="bg-black w-screen h-screen flex justify-between">
      <Sidebar setPage={setPage} page={page} />

      <div className="h-full flex-1 bg-white rounded-md p-10">
        <Page />
      </div>
    </div>
  );
}
