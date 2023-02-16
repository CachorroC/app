declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_MQTT_URI: string;
      NEXT_PUBLIC_MQTT_CLIENTID: string;
      NEXT_PUBLIC_MQTT_USERNAME: string;
      NEXT_PUBLIC_MQTT_PASSWORD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
