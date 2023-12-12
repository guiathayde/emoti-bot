import { AppNativeStackNavigatorProps } from '../routes';

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends AppNativeStackNavigatorProps {}
  }
}
