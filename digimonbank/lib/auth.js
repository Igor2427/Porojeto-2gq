import Parse from "./parse";

// Login
export async function login(username, password) {
  try {
    const user = await Parse.User.logIn(username, password);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Cadastro
export async function signUp(username, password) {
  try {
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    await user.signUp();
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Logout
export async function logout() {
  if (typeof window !== "undefined") {
    await Parse.User.logOut();
  }
}

// Pegar usuário atual (somente client!)
export function getCurrentUser() {
  if (typeof window !== "undefined") {
    return Parse.User.current() || null;
  }
  return null;
}
