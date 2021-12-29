import { ref } from 'vue';
import API from '../api';

export const loggedIn = ref(false);
export const token = ref('');
export const user = ref(null);

export default function useAuth() {
  const login = async (email, password) => {
    const { token: apiToken, user: apiUser } = await API.login(email, password);
    loggedIn.value = true;
    token.value = apiToken;
    user.value = apiUser;
    user.value.isAdmin = user.value.id === 1;
  };
  const register = async (email, password, password_confirmation) => {
    await API.register(email, password, password_confirmation);
  };
  const logout = () => {
    user.value = null;
    loggedIn.value = false;
    token.value = '';
  };

  return {
    loggedIn,
    token,
    register,
    login,
    logout,
    user,
  };
}
