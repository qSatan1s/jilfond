import { createStore } from "vuex";


import {searchModel } from "@/entities";
export default createStore({
    modules: {
        [searchModel.NAMESPACE]: searchModel.module,
    }
});
