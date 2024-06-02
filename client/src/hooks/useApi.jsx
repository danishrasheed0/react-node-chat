import { useState } from "react";
import { get, post, del, put } from "../services/api-service";
import { toast } from "react-toastify";

const UseHttpRequest = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (
    url = "",
    method = "GET",
    payload = {},
    id = null
  ) => {
    let data = null;
    setIsLoading(true);
    try {
      switch (method) {
        case "GET":
          data = await get(url);
          break;
        case "POST":
          data = await post(url, payload);
          break;
        case "PUT":
          data = await put(url, payload, id);
          break;
        case "DEL":
          data = await del(url, id);
          break;
        default:
          data = await get(url);
          break;
      }
      applyData(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return {
    isLoading: isLoading,
    sendRequest: sendRequest,
  };
};
export default UseHttpRequest;
