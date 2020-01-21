import Vue from 'vue'
import { Component, Provide, Vue as VueComponent } from 'vue-property-decorator';
import 'vue-tsx-support/enable-check';
import { testStore } from './store/testStore';

Vue.config.productionTip = false;

@Component
class App extends VueComponent {
  @Provide()
  public rootStore = testStore;
  public render() {
    console.log(this.rootStore.testClass);
    return <div>{this.rootStore.testClass}</div>;
  }
}

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app');
