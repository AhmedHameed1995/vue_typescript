import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Article } from '../models';
import * as api from '@/store/api';

@Module({
    dynamic: true,
    namespaced: true,
    name: 'articles',
    store,
})
class ArticleModule extends VuexModule {
    public globalFeed: Article[] = [];
    public userFeed: Article[] = [];

    @Mutation
    public setGlobalFeed(articles: Article[]) {
        this.globalFeed = articles;
    }

    @Action({commit: 'setGlobalFeed'})
    public async refreshGlobalFeed() {
        const globalFeed = await api.getGlobalFeed();
        return globalFeed.articles;
    }
}
export default getModule(ArticleModule);
