import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";
import { auth,firestore,storage } from "@/services/firebase";
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
};
export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  },
  addToCart: (state,pay) =>{
    state.cart.push(pay)
  },
  addToCart2(state,pay){
    let i = 0
    if (state.cart.length ===0){
      state.cart.push(pay)
    }
    else
    {
      console.log(state.cart.length);
      for( i=0; i<=state.cart.length-1;i++){
        console.log(i);
      if (state.cart[i].item === pay.item){
        state.cart[i].QTE = state.cart[i].QTE + pay.QTE
        break
      }}
      if (i===state.cart.length)
      state.cart.push(pay)}
  },
  zid(state,pay){
    console.log(pay);
    console.log(state.cart);
    const a=state.cart.indexOf(pay.item)
    state.cart[a].QTE =  pay.number
    console.log(a);
  },
  deleteItem(state,pay){
    state.cart= state.cart.filter(item => item!==pay)
  }
};
export const getters = {
  cart (state) {
    return state.cart
  }
}
export const state = () => ({
  user: null,
  cart: []
});