import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { User, Profile, UserSubmit } from '../models';
import { loginUser } from '../api';

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

    @Action({commit: 'setUser'})
    public async login(userSubmit: UserSubmit) {
        const user = await loginUser(userSubmit);
        return user;
    }
}
export default getModule(UserModule);
