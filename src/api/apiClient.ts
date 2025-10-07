import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com"; // منبع فیک

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});



// ساده: interceptor برای لاگ و خطاها
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // می‌تونید لاگ مرکزی بذارید یا خطاها رو استاندارد کنید
    return Promise.reject(err);
  },
);

export const makeCancelToken = () => {
  const source = axios.CancelToken.source();
  return source;
};
