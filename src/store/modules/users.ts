import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { User, Profile, UserSubmit } from '../models';
import { loginUser, fetchProfile } from '../api';

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
}
export default getModule(UserModule);
