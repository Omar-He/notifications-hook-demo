import { getAllPokemon } from "@utils/requests";
import React, { useState, useEffect, useRef } from "react";
import useNotifications from "@hooks/useNotifications";

const NotificationsPopup = ({ open }) => {
  // const [pokemon, setPokemon] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [counter, setCounter] = useState(0);
  const { loading, notifications, hasMore } = useNotifications(
    pageNumber,
    refresh
  );

  const observer = useRef();
  const lastElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 10);
        setRefresh((oldRefresh) => !oldRefresh);
      }
    });
    if (node && observer.current.observe) observer.current.observe(node);
  };

  // const getPokemonInfo = async () => {
  //   const res = await getAllPokemon();
  //   setPokemon(res?.results);
  // };
  // useEffect(() => {
  //   getPokemonInfo();
  // }, []);
  useEffect(() => {
    const getNotifications = async () => {
      const res = await getAllPokemon(10, 1);
      setCounter(res.count);
    };

    getNotifications();
    const intervalId = setInterval(getNotifications, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const showDetails = () => {};
  return (
    <div
      className={`${open ? "visible opacity-100" : "invisible opacity-0"} 
    absolute top-[40px] right-2 w-[350px] bg-gray-400 dark:bg-gray-600 dark:text-white
    transition-all duration-200 ease-linear shadow-lg max-h-[600px] z-40`}
    >
      {loading && (
        <span className="absolute top-0 py-3 px-5 bg-blue-200 w-full">
          Loading
        </span>
      )}
      <div className="max-h-[600px] overflow-auto">
        {notifications.map((i, index) => (
          <div
            className="py-8 px-5 border-b-2 hover:bg-purple-300 cursor-pointer over"
            key={index}
            onClick={showDetails}
            ref={notifications.length === index + 1 ? lastElementRef : null}
          >
            <span className="block font-bold text-lg">{i.name}</span>
            <span className="block text-ellipsis overflow-hidden flex-wrap">
              {i.url}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPopup;
