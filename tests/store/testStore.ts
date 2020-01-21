import { AsyncValue } from '../../src/asyncValue';

export class TestStore {
  @AsyncValue({
    func: new Promise(resolve => setTimeout(() => resolve('123'), 1000)),
    default: '3',
  })
  public testClass!: Readonly<string>;
  @AsyncValue({
    func: (p: string) => new Promise(resolve => setTimeout(() => resolve(p + '123'), 1000)),
    default: '3',
  })
  public testClass2!: (v?: string) => string;

  public get test2() {
    return '321';
  }

}

export const testStore = new TestStore();
