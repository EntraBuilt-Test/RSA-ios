# RSA Construction — iOS App (Capacitor)

This is the iOS counterpart to `RSA.apk`. Same web app, same Capacitor shell,
same backend — just wrapped for iOS instead of Android.

- App ID: `com.rsaconstruction.mobile` (identical to Android)
- App name: `R.S.A Construction`
- Backend: `https://rsa-construction-mobile-view.onrender.com/api` (baked into
  the build, same as the Android app — no local server needed)
- UI bundle: built from `dist_verify/` in the original frontend repo — the
  same source, same CSS, same images/logo as `RSA.apk`. The two main JS
  bundle files carry different content hashes than the ones baked into
  `RSA.apk` (that build is a slightly newer pass over the same source, since
  `dist_verify` postdates the APK build), but styling, layout and behavior
  are the same app. Run `npm run build` from this project's `src/` to
  regenerate `dist/` from source at any time if you want a fresh 1:1 build.

## What's here

- `src/`, `package.json`, `capacitor.config.json` — the same frontend project
  as the Android build, plus Capacitor's iOS platform.
- `ios/App/` — the generated Xcode project (`App.xcodeproj`). Capacitor
  plugins are wired through Swift Package Manager, so no CocoaPods step is
  required.
- `dist/` — the production web build loaded into the native shell.

## Requirements to finish the build

Building and signing an `.ipa` requires Xcode, which only runs on macOS.
This project was fully scaffolded and configured here, but the final
compile/sign step has to happen on a Mac:

1. A Mac with **Xcode 15+** installed.
2. A free or paid **Apple Developer account** (free works for
   testing on your own device for 7 days; paid ($99/yr) is required for
   TestFlight / App Store distribution).
3. Node.js 18+ (only needed if you want to rebuild the web assets).

## Steps on the Mac

```bash
# 1. Unzip this project, then from its root:
npm install

# 2. (Optional) rebuild the web assets — skip this if you just want to
#    build the exact same UI that's already in dist/
npm run build
npx cap sync ios

# 3. Open the Xcode project
open ios/App/App.xcodeproj
```

In Xcode:

1. Select the **App** target → **Signing & Capabilities** → choose your
   Apple Developer team. Xcode will auto-generate a provisioning profile.
2. Pick a simulator or your plugged-in iPhone as the run destination and hit
   **Run** to test.
3. For a real install/App Store build: **Product → Archive**, then use the
   Organizer window to **Distribute App** (Ad Hoc for direct device install,
   App Store Connect for TestFlight/App Store).

## Notes / parity with the Android app

- **Icon**: extracted from the Android APK's launcher icon (192×192, the
  highest resolution available in the APK) and upscaled to the 1024×1024
  iOS requires. It matches visually but a sharper source file would be
  worth dropping into `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
  before an App Store submission.
- **Splash screen**: the Android build uses Capacitor's default splash (no
  custom splash was configured in `capacitor.config.json`), so the iOS
  project uses the same default — nothing to change here for parity.
- **No native plugins**: `capacitor.plugins.json` in the APK was empty, so
  no native plugin bridging was needed on either platform.
