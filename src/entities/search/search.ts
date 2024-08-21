import { api } from "@/shared";
import { GetUser } from "@/shared";
import { Commit } from "vuex";

export const NAMESPACE = 'search';
const IS_NAMESPACED = true;

interface SearchState {
    users: GetUser[];
    isDetailsLoading: boolean;
    selectedUser: GetUser | null;
    errorMessage: string | null;
}


export const module = {
    namespaced: IS_NAMESPACED,
    state: (): SearchState => ({
        users: [],
        isDetailsLoading: false,
        selectedUser: null,
        errorMessage: null,
    }),
    getters: {
        getSearchResult: (state: SearchState): GetUser[] => state.users,
        getSelectedUser: (state: SearchState): GetUser | null => state.selectedUser,
        getErrorMessage: (state: SearchState): string | null => state.errorMessage,
    },
    mutations: {
        SET_RESULT_SEARCH(state: SearchState, users: GetUser[]) {
            console.log(users);
            state.users = users;
        },
        SET_DETAILS_LOADING(state: SearchState, isLoading: boolean) {
            state.isDetailsLoading = isLoading;
        },
        SET_SELECTED_USER(state: SearchState, user: GetUser | null) {
            state.selectedUser = user;
        },
        SET_ERROR(state: SearchState, message: string | null) {
            state.errorMessage = message;
        },
        CLEAR_ERROR(state: SearchState) {
            state.errorMessage = null;
        },
    },
    actions: {
        async getSearchPeople({ commit }: { commit: Commit }, searchText: string): Promise<void> {
            if (!searchText.trim()) {
                commit('SET_SELECTED_USER', null);
                commit('SET_RESULT_SEARCH', []);
                return;
            }

            commit('SET_DETAILS_LOADING', true);
            try {
                const names = searchText.split(',').map(name => name.trim());
                const params = new URLSearchParams();

                names.forEach(name => {
                    if (!isNaN(Number(name))) {
                        params.append('id', name);
                    } else {
                        params.append('username', name);
                    }
                });

                const response = await api.userControllerGetUser(params.toString());
                commit('SET_RESULT_SEARCH', response);
            } catch (error) {
                console.error("Ошибка при получении результатов поиска:", error);
                commit('SET_ERROR', 'Ошибка при получении результатов поиска.');
            } finally {
                commit('SET_DETAILS_LOADING', false);
            }
        },
        selectUser({ commit }: { commit: Commit }, user: GetUser | null): void {
            commit('SET_SELECTED_USER', user);
        },
        async getUserById({ commit }: { commit: Commit }, id: string): Promise<void> {
            try {
                const response = await api.userControllerGetUserById(id);
                commit('SET_SELECTED_USER', response[0]);
            } catch (error) {
                console.error("Ошибка при получении пользователя:", error);
                commit('SET_ERROR', `Ошибка при получении пользователя.`);
            }
        },
    },
};

const withPrefix = (name: string): string => IS_NAMESPACED ? `${NAMESPACE}/${name}` : name;

export const actions = {
    getSearchPeople: withPrefix('getSearchPeople'),
    selectUser: withPrefix('selectUser'),
    getUserById: withPrefix('getUserById'),
};

export const getters = {
    getSearchResult: withPrefix('getSearchResult'),
    getSelectedUser: withPrefix('getSelectedUser'),
};
