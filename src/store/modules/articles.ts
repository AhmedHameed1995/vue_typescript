import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Article } from '../models';
import * as api from '@/store/api';
type FeedType = 'global' | 'user';

@Module({
    dynamic: true,
    namespaced: true,
    name: 'articles',
    store,
})

class ArticleModule extends VuexModule {
    public feed: Article[] = [];

    @Mutation
    public setFeed(articles: Article[]) {
        this.feed = articles;
    }

    @Action({commit: 'setFeed'})
    public async refreshFeed(feedType: FeedType) {
        const globalFeed = await api.getGlobalFeed();
        return globalFeed.articles;
    }
}
export default getModule(ArticleModule);
