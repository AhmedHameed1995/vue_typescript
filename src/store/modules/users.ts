import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { User, Profile, UserSubmit, UserForUpdate } from '../models';
import { loginUser, fetchProfile, updateUser, fetchUser, setJWT } from '../api';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true,
})
class UserModule extends VuexModule {
    public user: User | null = null;
    public profile: Profile | null = null;

    @Mutation
    public setUser(user: User) { this.user = user; }

    @Mutation
    public setProfile(profile: Profile) { this.profile = profile; }

    get username() {
        return this.user && this.user.username || null;
    }

    @Action({commit: 'setUser'})
    public async login(userSubmit: UserSubmit) {
        try {
            const user = await loginUser(userSubmit);
            setJWT(user.token);
            return user;
        } catch (e) {
            throw new Error('Invalid username or password');
        }
    }

    @Action({commit: 'setProfile'})
    public async loadProfile(username: string) {
        const profile = await fetchProfile(username);
        return profile;
    }

    @MutationAction
    public async loadUser() {
        const user = await fetchUser();
        return { user };
    }

    @MutationAction
    public async updateSelfProfile(userUpdateFields: UserForUpdate) {
        const user = await updateUser(userUpdateFields);
        return { user };
    }
}
export default getModule(UserModule);
