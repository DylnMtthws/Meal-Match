import Colors from "@/constants/Colors";
import { useSignIn } from "@clerk/clerk-react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import { useOAuth } from "@clerk/clerk-expo";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignup] = useState(false);
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const { signIn } = useSignIn();

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        signIn.setActive({ session: result.createdSessionId });
        setEmail("");
        setPassword("");
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error("Sign in error", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#000"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#000"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
        onChangeText={setPassword}
        value={password}
      />

      {signUp ? (
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          style={[defaultStyles.inputField, { marginBottom: 30 }]}
        />
      ) : null}

      {signUp ? null : (
        <TouchableOpacity
          style={[defaultStyles.btn, { marginBottom: 30 }]}
          onPress={handleLogin}
        >
          <Text style={defaultStyles.btnText}>Log in</Text>
        </TouchableOpacity>
      )}
      {signUp ? (
        <>
          <TouchableOpacity
            style={[defaultStyles.btn, { marginBottom: 30 }]}
            onPress={() => setSignup(!signUp)}
          >
            <Text style={defaultStyles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => setSignup(!signUp)}
          >
            <Text style={styles.btnOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => setSignup(true)}
        >
          <Text style={styles.btnOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            name="md-logo-apple"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="md-logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="md-logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },

  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "sat-sb",
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "sat-sb",
  },
});
