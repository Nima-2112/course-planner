// ---------- IMPORTS ----------

import axios from "axios";

// ---------- API INSTANCE ----------

const api = axios.create({
  baseURL: "https://fakestoreapi.com",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

// ---------- EXPORT ----------

export default api;
