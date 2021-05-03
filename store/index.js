import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { auth,firestore } from "@/services/firebase";
import Cookie from "js-cookie";

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;

    const decoded = JWTDecode(accessTokenCookie);

    if (decoded) {
      commit("SET_USER", {
        uid: decoded.user_id,
        email: decoded.email
      });
    }
  },
  async login({ commit }, account) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;

      // Set JWT to the cookie
      Cookie.set("access_token", token);

      // Set the user locally
      commit("SET_USER", { email, uid });
    } catch (error) {
      throw error;
    }
  },
  async add({commit},product){
    await firestore.collection('product').add({
      ref:product.ref,
      nom:product.nom,
      price:product.price,
      sellprice:product.sellprice,
      qte:product.qte
  })
}
};
export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  }
};
export const state = () => ({
  user: null
});