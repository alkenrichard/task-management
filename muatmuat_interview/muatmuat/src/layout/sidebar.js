export default function Sidebar({ setPage, page }) {
  const sideList = [
    {
      title: "Dashboard",
      page: "home",
    },
    {
      title: "New Product",
      page: "new",
    },
    {
      title: "Edit Product",
      page: "edit",
    },
  ];

  return (
    <div className="h-full w-1/6 px-2 pt-10">
      <div className="grid gap-y-2">
        {sideList.map((i) => (
          <button
            key={i.title}
            onClick={() => setPage(i.page)}
            className={`w-full hover:bg-[#FFFFFF10] px-2 rounded-md h-8 flex items-center
            ${page === i.page && "bg-[#FFFFFF10]"}
            `}
          >
            <p className="text-white ">{i.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
