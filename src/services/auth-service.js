const BASE_URL = "http://localhost:5000";

export const auth = {
  login: async (username, password) => {
    console.log("In login service");
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("Response is ok")
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return true;
    } else {
      console.log("error on login service: ", response);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const response = await fetch(`${BASE_URL}/check-auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("in checkauth service");
    const data = await response.json();
    if (response.ok){
        console.log("authenticated")
        console.log(data)
        return data.authenticated
    }
    else{
        console.log("error : ");
        console.log(data);
        return false
    }
  },
};
