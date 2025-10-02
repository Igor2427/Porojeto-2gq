import Parse from "./parse";

// Registro
export async function signUp(username, password) {
  if (typeof window === "undefined") return { success: false, error: "SSR not supported" };

  try {
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    await user.signUp();
    return { success: true, user };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Login
export async function login(username, password) {
  if (typeof window === "undefined") return { success: false, error: "SSR not supported" };

  try {
    const user = await Parse.User.logIn(username, password);
    return { success: true, user };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Logout
export async function logout() {
  if (typeof window === "undefined") return;
  try {
    await Parse.User.logOut();
  } catch (err) {
    // Ignora erro se a sessão não existir ou já estiver inválida
    if (!err.message.includes("invalid session token")) {
      throw err; // lança outros erros
    }
  }
}


// Usuário atual
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  return Parse.User.current();
}
