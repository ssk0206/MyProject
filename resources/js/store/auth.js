const state = {
    user: null
}

//ステートを元に演算した結果が欲しい場合
const getters = {
    //二重否定で確実にbooleanを返すようにしている
    check: state => !! state.user,
    username: state => state.user ? state.user.name : ''
}
//userステートの値を更新するsetUser
const mutations = {
    setUser (state, user) {
        state.user = user
    }
}

const actions = {
    /**
     * 会員登録APIを呼び出すregisterアクション
     * 返却されたデータをsetUserに渡してuserステート更新
     * 
     * アクションの第一引数は決まっている
     * contextにはミューテーションを呼び出すためのcommitメソッドなどが入っている
     */
    async register (context, data) {
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    async login (context, data) {
        const response = await axios.post('/api/login', data)
        context.commit('setUser', response.data)
    },
    async logout (context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    async currentUser (context) {
        const response = await axios.get('/api/user')
        //ログインしていないときは初期値のnull
        const user = response.data || null
        context.commit('setUser', user)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

/**
 * 「アクション→コミットでミューテーション呼び出し→ステート更新」というパターンはよく使う
 */