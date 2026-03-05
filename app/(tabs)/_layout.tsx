import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Tabs } from "expo-router";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as Animatable from 'react-native-animatable';


const tabArr = [
  { title: "Home", route: "newsfeed", "icon": "home" },
  { title: "Dive", route: "dive", "icon": "snorkel" },
  { title: "Shop", route: "shop", "icon": "shop" },
  { title: "Profile", route: "profile", "icon": "user" }
]

const TabIcon = ({ focused, icon, title }: any) => {
  if (icon === "snorkel") {
    return (
      <View >
        <Fontisto name={icon} size={24} style={focused ? styles.tabIconDefault_focused : styles.tabIconDefault} />
      </View>
    )
  } else {
    return (
      <View>
        <AntDesign name={icon} size={24} style={focused ? styles.tabIconDefault_focused : styles.tabIconDefault} />
      </View>
    )
  }


}



const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = props["aria-selected"];
  const viewRef = useRef<Animatable.View | null>(null);
  useEffect(() => {
    if (!viewRef.current) return;

    if (focused) {
      viewRef.current.animate({ 0: { transform: [{ scale: 1 }] }, 1: { transform: [{ scale: 1.3 }] } })
    } else {
      viewRef.current.animate({ 0: { transform: [{ scale: 1.3 }] }, 1: { transform: [{ scale: 1 }] } })
    }

  }, [focused])
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButtonContainer, focused ? styles.selecte_tab : ""]}>
      <Animatable.View
        ref={viewRef}
        duration={500}
      >
        <TabIcon
          icon={item.icon}
          title={item.title}
          focused={props["aria-selected"]}
        />
      </Animatable.View>
    </TouchableOpacity>
  )
}

const _Layout = () => {
  // @ts-ignore
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#fff",
        height: 70,
        paddingBottom: 1,
        position: 'absolute',
        right: 16,
        left: 16,
        bottom: 25,
        borderRadius: 20,
        marginRight: 20,
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      tabBarItemStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },

      tabBarIconStyle: {
        alignSelf: "center",
      },

      tabBarLabelStyle: {
        textAlign: "center",
        fontSize: 12,
      },
    }}>

      {tabArr.map((item, index) => {
        return (
          <Tabs.Screen
            key={item.route}
            name={item.route}
            options={{
              tabBarShowLabel: false,
              title: item.title,
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={item.icon}
                  title={item.title}
                />
              ),
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tabs>
  )
}
export default _Layout

const styles = StyleSheet.create({
  tabIconDefault: {
    color: "rgb(146,146,146,0.4)"
  },
  tabIconDefault_focused: {
    color: Colors.dark.tint
  },
  tabTitle: {
    fontSize: 10,
    color: Colors.dark.tabIconDefault,
  },
  tabButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, selecte_tab: {
    borderBottomColor: Colors.dark.tint
  }
})
