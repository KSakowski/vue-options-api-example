import { State, UserModel } from "@/interfaces";

const initialState = (): UserModel => {
    return {
        id: null,
        created_at: '',
        updated_at: '',
        first_name: '',
        last_name: '',
        email: '',
        roles: [],
        type: '',
        company_name: '',
        tax_no: '',
        pesel: '',
        address_street: '',
        address_zip_code: '',
        address_city: '',
        address_country: '',
    }
};

export const AuthModule = {
    namespaced: true,
    state: (): State => ({
        profile: initialState()
    }),
    mutations: {
        updateProfile (state: State, payload: UserModel): void {
            state.profile = payload;
        },
        resetProfile(state: State): void {
            state.profile = initialState();
        }
    },
    getters: {
        getProfile: (state: State): UserModel => {
            return state.profile;
        }
    }
}
