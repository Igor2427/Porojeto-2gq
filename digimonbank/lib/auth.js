import Parse from "./parse";

// Cadastro de usuário
export async function signUp(username, password) {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  try {
    await user.signUp();
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Login
export async function login(username, password) {
  try {
    const user = await Parse.User.logIn(username, password);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Logout
export async function logout() {
  await Parse.User.logOut();
}

// Pegar usuário atual
export function getCurrentUser() {
  return Parse.User.current();
}
