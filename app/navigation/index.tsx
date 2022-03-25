// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from '../home';
// import {HOME, LOGIN} from './routes';

// import {HomeRoutes} from './interface';
// import {StatusBar} from 'react-native';
// import LoginScreen from '../login';

// // const getBackButton = props => ({
// //   name: ICONS.BACK,
// //   primaryColor: getTheme().white,
// //   size: 24,
// //   onPress: () => props.navigation.goBack(),
// // });

// // we need to add real types
// export const getAppBar = (props: any) => (
//   <>
//     <StatusBar animated barStyle="light-content" />
//     {/* <AppBar
//       label=""
//       iconLeft={props.navigation.canGoBack() ? getBackButton(props) : undefined}
//       {...props.options}
//     /> */}
//   </>
// );

// const HomeScreens = (AppStack: any) => (
//   <AppStack.Group>
//     <AppStack.Screen name={HOME} component={Home} />
//   </AppStack.Group>
// );

// const Stack = createNativeStackNavigator<HomeRoutes>();

// const Screens = () => {
//   return (
//     <Stack.Navigator initialRouteName={LOGIN}>
//       <Stack.Screen
//         name={HOME}
//         component={Home}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name={LOGIN}
//         component={LoginScreen}
//         options={{headerShown: false}}
//       />
//       {/* <Stack.Group
//         screenOptions={{
//           header: getAppBar,
//         }}>
//         {OnboardingScreens(Stack)}
//         {MoniFlowScreens(Stack)}
//         {HomeScreens(Stack)}
//         {SendMoneyScreens(Stack)}
//         <Stack.Screen
//           name={BOTTOM_NAV_SCREEN}
//           component={BottomTabScreens}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={CONFIGURE_PIN}
//           component={ConfigurePinStack}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={CONFIGURE_TEMPORAL_PIN}
//           component={ConfigureTemporalPinStack}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={RECOVER_PIN}
//           component={RecoverPinStack}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={RECHARGE_STACK}
//           component={RechargeStack}
//           options={{headerShown: false}}
//         />
//       </Stack.Group> */}
//     </Stack.Navigator>
//   );
// };

// export {Screens};
import React from 'react';
import {AuthProvider} from '../context/AuthContext';
// import {NavigationProps} from '../../navigators/app-navigator';
import Router from './Router';
export default function Providers() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
