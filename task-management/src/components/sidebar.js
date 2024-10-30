import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sideBarList } from "../data/sideBarList";

function Sidebar(props) {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const sideBarRef = useRef(true);

  const handleManageSideBar = () => {
    sideBarRef.current = !sideBarRef.current;
    setSideBarOpen(sideBarRef.current);
  };

  return (
    <motion.aside
      className={`
        ${
          sideBarOpen
            ? "w-full h-screen md:w-56"
            : "w-20 h-14 md:w-20 md:h-screen"
        }
        fixed flex flex-col bg-gradient-to-br from-[#f2fbff] to-[#fbf2ff] p-3 overflow-x-hidden scrollbar scrollbar-none justify-between gap-y-5 rounded-lg overflow-y-auto
      `}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      layout
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <motion.img
            src="./logo.png"
            alt="logo"
            className={"h-7 aspect-square"}
            layout="position"
          />
          <AnimatePresence>
            {sideBarOpen && (
              <motion.h3
                className="font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                layout="position"
              >
                weihu
              </motion.h3>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleManageSideBar}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          layout="position"
        >
          <i className="fi fi-rr-sidebar-flip" />
        </motion.button>
      </div>

      <motion.div
        className="flex flex-col gap-y-7"
        onHoverStart={() => !sideBarRef.current && setSideBarOpen(true)}
        onHoverEnd={() => !sideBarRef.current && setSideBarOpen(false)}
      >
        {Object.keys(sideBarList).map((item) => (
          <div key={item} className="flex flex-col gap-y-2">
            {item !== "top" && item !== "bottom" && (
              <motion.h3
                className={`font-semibold text-xs opacity-60`}
                layout="position"
              >
                {item.toUpperCase()}
              </motion.h3>
            )}

            <div className="flex flex-col gap-y-2">
              {sideBarList[item].map((list) => (
                <motion.button
                  key={list.id}
                  initial={{ backgroundColor: "transparent" }}
                  className="flex items-center gap-x-3 p-2 rounded-lg"
                  whileHover={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 },
                  }}
                  layout="position"
                >
                  <i className={`${list.icon} text-sm`} />
                  <AnimatePresence>
                    {sideBarOpen && (
                      <motion.h3
                        className="text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        layout="position"
                      >
                        {list.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.button
        className="bg-white flex h-14 items-center p-2 rounded-lg shadow-sm justify-between"
        layout="position"
      >
        <motion.div className="flex items-center gap-x-3" layout="position">
          <motion.i class="fi fi-br-circle-user" layout="position" />

          <AnimatePresence initial>
            {sideBarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                layout
              >
                <motion.p className="text-sm font-semibold overflow-hidden whitespace-nowrap">
                  Alken Richard Ho
                </motion.p>
                <motion.p className="text-[9px] font-medium">
                  alkenrichard1@gmail.com
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <i class="fi fi-br-angle-small-right" />
      </motion.button>
    </motion.aside>
  );
}

export default Sidebar;
