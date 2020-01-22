import Vue from 'vue'
import { Component, Provide, Vue as VueComponent } from 'vue-property-decorator';
import 'vue-tsx-support/enable-check';
import { testStore } from './store/testStore';
import { AsyncValue } from '../src/asyncValue';

Vue.config.productionTip = false;

@Component
class App extends VueComponent {
  @Provide()
  public rootStore = testStore;
  @AsyncValue({
    func: new Promise(resolve => setTimeout(() => resolve('test'), 2000)),
    default:'st',
  })
  public testClass2!: string;

  public testData = 666;
  public created() {
    // setInterval(() => this.testData = - this.testData, 2000)
  }
  public render() {
    console.log(typeof [123] === 'function');
    console.log(this.rootStore.testClass);
    return <div>{this.testClass2}{this.rootStore.testClass}{this.rootStore.testClass2(this.testData + '')}</div>;
  }
}

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app');
