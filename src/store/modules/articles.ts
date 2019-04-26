import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '@/store';

interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image?: null;
}

@Module({
    namespaced: true,
    name: 'users',
    store,
})
class UserModule extends VuexModule {

}
export default getModule(UserModule);
