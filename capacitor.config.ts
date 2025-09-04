import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.adamhalls.gardencenter',
  appName: "Adam Hall's Garden Center",
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#4CAF50",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#4CAF50'
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#4CAF50"
    },
    Camera: {
      androidScaleType: "CENTER_CROP"
    },
    Geolocation: {
      permissions: ["location"]
    }
  },
  ios: {
    contentInset: "always",
    limitsNavigationsToAppBoundaries: true,
    backgroundColor: "#ffffff",
    scheme: "adamhallsgardencenter"
  },
  android: {
    backgroundColor: "#ffffff",
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;
