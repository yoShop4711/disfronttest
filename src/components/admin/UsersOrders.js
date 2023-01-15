import { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UsersOrders() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(
        `https://newyoshopapi.onrender.com/cart/buyer_orders/${location.state.identifier}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(res.data.orders);
    };

    getOrders();
  }, [token, location.state.identifier]);

  

  return <></>;
}

export default UsersOrders;
