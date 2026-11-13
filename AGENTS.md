# 编程规范

## 项目概况

本仓库是基于 Next.js pages router、React、TypeScript、Bootstrap 和 MobX 的 PWA 项目，包含页面、API 路由、可复用组件及服务工作线程。新增或修改代码前，先阅读相关实现、配置和调用方，沿用项目现有架构；不要依据其它版本的框架习惯猜测 API。

## 通用原则

- 只实现用户要求的范围，优先修复根因；不顺手加入无关功能或大规模重构。
- 保持改动精简，复用现有组件、模型、工具和框架机制；避免重复配置、不必要的包装层及过度抽象。
- 保护已有暂存和未暂存改动；不覆盖、不撤销与任务无关的工作。
- 代码与目录变化时同步更新直接相关的文档、脚本和调用方。

## 环境与依赖

- 本仓库使用 PNPM。依赖变更通过 PNPM 完成，并同步维护 `pnpm-lock.yaml`；不要混入其它包管理器的锁文件，也不要手工编造锁文件内容。
- 升级依赖前核对目标版本的 API、迁移指南和 peer dependencies；升级后检查所有直接调用点，不能只以安装成功作为兼容依据。
- 运行命令前先核对 `package.json` 中是否定义该脚本。文档、CI、Git hooks 和容器命令必须与真实可用的脚本及运行环境一致。
- 保留插件和配置现有的正确组合方式；使用当前版本文档中的入口，不重复包装、重复导出或显式重写已经满足需求的默认值。

## 组件风格

组件与模型遵循 AOP、单一职责和关注点分离；跨组件或横切行为优先复用既有模型、服务及框架组合机制。

### 只依赖 Props 的组件

仅依赖 props 的组件负责把输入呈现为 UI，不持有内部状态，也不承载复杂业务流程。

```tsx
import { FC } from 'react';

export interface MyComponentProps {
  message: string;
}

export const MyComponent: FC<MyComponentProps> = ({ message }) => (
  <div>{message}</div>
);

MyComponent.displayName = 'MyComponent';
```

### 依赖 State 的组件

内部状态仅用于该组件所需的交互。需要状态、行为或生命周期时使用 MobX 类组件和 Stage 3 装饰器；避免把业务状态与异步流程堆积在 React hooks 中。

```tsx
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';

@observer
export class MyComponent extends Component {
  static displayName = 'MyComponent';

  @observable
  accessor count = 0;

  @action
  increment = () => {
    this.count++;
  };

  render() {
    return <button onClick={this.increment}>{this.count}</button>;
  }
}
```

异步操作在 `await` 后更新 observable 时，应调用独立的 action；不要假设异步函数会继承之前的 action 边界，也不要在已有 action 边界上重复使用 `runInAction()`。

### 依赖 Store 的组件

将复杂业务规则、异步流程、订阅以及多个组件共享的状态封装在内聚的 Store/Model 中。组件负责呈现数据、转发事件并调用模型行为，不以零散工具函数替代模型封装。

```tsx
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';

export class MyModel {
  @observable
  accessor count = 0;

  @action
  increment() {
    this.count++;
  }
}

@observer
export class MyComponent extends Component {
  static displayName = 'MyComponent';

  store = new MyModel();

  handleIncrement = () => this.store.increment();

  render() {
    const { count } = this.store;

    return <button onClick={this.handleIncrement}>{count}</button>;
  }
}
```

### 依赖事件委托、监听数据变更的组件

优先复用 `ObservedComponent`、`@on` 和 `@reaction` 等既有机制。组件事件处理器使用稳定的类实例方法；避免在 JSX 或渲染过程中创建不必要的内联回调和事件包装函数。浏览器副作用在挂载后启动，卸载时释放订阅或 disposer。

```tsx
import { observer } from 'mobx-react';
import { ObservedComponent, on, reaction } from 'mobx-react-helper';
import { MouseEvent } from 'react';

export interface MyComponentProps {
  someKey: string;
}

@observer
export class MyComponent extends ObservedComponent<MyComponentProps> {
  static displayName = 'MyComponent';

  componentDidMount() {
    super.componentDidMount();
    this.init();
  }

  @reaction(({ observedProps: { someKey } }) => someKey)
  init() {
    console.log('someKey changed', this.observedProps.someKey);
  }

  @on('click', 'td')
  handleClick(
    event: MouseEvent<HTMLTableCellElement>,
    target: HTMLTableCellElement,
  ) {
    console.log('TD clicked', event, target);
  }

  render() {
    const { someKey } = this.props;

    return (
      <table data-some-key={someKey}>
        <thead>
          <tr>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
```

### 组件复用与语义

优先复用 Idea React、MobX RESTful table 和本项目已有组件。只有在确有必要时才直接使用原生元素或 Bootstrap 原始类；替换元素或组件时保留其语义、可访问性、属性、事件和原有行为。

## TypeScript 与代码风格

- 保持类型安全：优先使用准确类型、类型守卫及已有类型组合；避免 `any`、不必要的类型断言和通过放宽类型掩盖问题。
- 复用已有 props、模型和库类型，不重复定义同义结构；表达式和变量应清晰说明意图。
- JSX 使用语义正确且可访问的元素；无子节点时使用自闭合标签。组件属性和回调应保留原有类型与行为。
- 遵循仓库的 ESLint 和 Prettier 配置。导入、格式和可自动检查的规则交由现有工具处理。
- 优先保证语义清楚和易读；不要把未经自动化验证的主观排序或琐碎偏好扩大成强制规则，避免造成不必要的 review 往返。
- 不重复声明框架或工具的默认值；配置项只在确实需要覆盖默认行为时显式设置。

## 错误、配置与部署

- 不吞掉异常，不用宽泛的 `catch`、静默回退或成功形态的默认值隐藏失败。只有在需要恢复、释放资源或补充上下文时才捕获；应记录或向上抛出错误。
- Polyfill 等启动前依赖应在其使用方之前加载；调整入口或配置时确认不会引入加载顺序回归。
- 修改 GitHub actions 时核实触发分支与仓库默认分支一致，并区分 PR 验证和生产部署所需的环境及参数。
- 修改 Dockerfile 时检查最终镜像中实际存在的启动命令、文件和运行时依赖，不假设构建阶段工具会保留到运行阶段。
- 编辑配置和忽略规则时先查找已有条目，避免重复项；只保留有实际作用的覆盖配置。
- GitHub issue 表单使用 GitHub 当前支持的 YAML 表单格式。问题字段应能收集复现步骤、环境和相关链接，避免重复提问；遵循工具默认值，只有需要改变行为时才显式设置验证选项。

## 验证

按改动范围运行适当的检查，并确认检查覆盖了实际修改：

```sh
pnpm test
pnpm build
```

- `pnpm test` 执行 Lint-Staged 和 TypeScript 检查；未暂存文件不会因此自动完成 ESLint 检查。代码改动应针对受影响文件运行 `npx eslint <文件...>` 和 `npx prettier --check <文件...>`。
- 仅在需要格式化时对目标文件运行 `npx prettier --write <文件...>`；不要为局部改动运行会改写全仓库的命令。
- 根据变更类型运行相关检查：构建配置、路由、SSR 或部署改动应运行构建；交互或响应式 UI 改动应在浏览器检查关键流程和视口。
- 若构建成功但静态生成或导出被跳过，不能据退出码断言页面可用；核对预期路由和产物。
- 如检查因环境、网络或外部服务失败，准确记录失败命令及原因，并注释 Git hook 后确保代码提交不被阻塞。
- 不为琐碎访问器或语言机制添加无意义测试；新增测试应覆盖本次引入或修复的实际行为。

## 常用命令

以下命令来自当前项目脚本；脚本变更后应同步更新本节：

```sh
pnpm dev
pnpm test
pnpm build
pnpm start
pnpm lint-all
```

`pnpm lint-all` 会对全仓库运行 ESLint 自动修复；局部开发优先使用针对文件的 ESLint 命令，避免改写无关文件。
