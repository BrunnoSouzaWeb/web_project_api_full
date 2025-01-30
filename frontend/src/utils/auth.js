const BASE_URL = "http://localhost:3000";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("um dos campos foi preenchido incorretamente");
      }
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const authorize = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("um ou mais campos não foram fornecidos");
      } else if (response.status === 401) {
        throw new Error("o usuário com o e-mail especificado não encontrado");
      }
    }

    const { token } = await response.json();

    return { token, email };
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Token não fornecido ou fornecido em formato errado");
      } else if (response.status === 401) {
        throw new Error("O token fornecido é inválido");
      }
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Token verification error:", error);
    throw error;
  }
};
