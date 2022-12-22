import { ComponentProps, ComponentType, FunctionComponent } from 'react';

export type AnyComponent = ComponentType<any> | (() => JSX.Element) | ((...args: any[]) => JSX.Element);

interface ModuleWithDefaultExport<TComponent extends AnyComponent> {
  default: TComponent;
}

type DefaultImportFactory<TComponent extends AnyComponent> = () => Promise<ModuleWithDefaultExport<TComponent>>;

type TComponentProps<TComponent extends AnyComponent> = TComponent extends () => JSX.Element
  ? Record<any, any>
  : TComponent extends (...args: any[]) => JSX.Element
  ? Parameters<TComponent>
  : TComponent extends FunctionComponent<any>
  ? Parameters<TComponent>[0]
  : ComponentProps<TComponent>;

export type Props<TComponent extends AnyComponent> = {
  /** #### Vì bản build này build ra các dynamic import giống y hệt nhau nên không thể cache lại được -> Dùng trường này để tạo uniq */
  CHUNK_ID: string;
  /** #### dynamic import component */
  component: DefaultImportFactory<TComponent>;
  /** #### Dev mode */
  devMode?: boolean;
} & TComponentProps<TComponent>;
