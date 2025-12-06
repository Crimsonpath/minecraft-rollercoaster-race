# 🔧 Pack Installation Troubleshooting Guide

## Problem: Packs Not Showing Up

If you see "No packs available" in Minecraft, follow these steps:

### Solution 1: Delete and Reinstall with Corrected Manifests

I've updated the manifest.json files with proper unique UUIDs. Follow these steps:

#### Step 1: Delete Old Packs
1. Go to your Minecraft folder: `com.mojang`
2. Delete these folders if they exist:
   - `behavior_packs/RollercoasterRace_BP`
   - `resource_packs/RollercoasterRace_RP`

#### Step 2: Copy Fresh Packs
1. From the downloaded ZIP, extract:
   - `behavior_pack` folder
   - `resource_pack` folder

2. **Rename them:**
   - Rename `behavior_pack` → `RollercoasterRace_BP`
   - Rename `resource_pack` → `RollercoasterRace_RP`

3. **Copy to Minecraft:**
   - Copy `RollercoasterRace_BP` to: `com.mojang/behavior_packs/`
   - Copy `RollercoasterRace_RP` to: `com.mojang/resource_packs/`

#### Step 3: Verify Structure

Your folders should look like this:

```
com.mojang/
├── behavior_packs/
│   └── RollercoasterRace_BP/
│       ├── manifest.json
│       └── scripts/
│           └── interactive_rollercoaster.js
│
└── resource_packs/
    └── RollercoasterRace_RP/
        ├── manifest.json
        ├── sounds/
        │   ├── sound_definitions.json
        │   └── rollercoaster/
        │       ├── welcome.ogg
        │       ├── countdown_3.ogg
        │       ├── countdown_2.ogg
        │       ├── countdown_1.ogg
        │       ├── countdown_go.ogg
        │       └── victory.ogg
        └── textures/
            └── blocks/
                ├── track_sign_red.png
                ├── track_sign_blue.png
                ├── track_sign_yellow.png
                ├── track_sign_green.png
                ├── track_sign_purple.png
                ├── victory_banner.png
                └── start_gate.png
```

#### Step 4: Restart Minecraft
1. **Completely close** Minecraft (don't just go to main menu)
2. **Reopen** Minecraft
3. Go to **Create New World**
4. Click **Behavior Packs** - you should now see "Rollercoaster Race"
5. Click **Resource Packs** - you should now see "Rollercoaster Race Resources"

---

### Solution 2: Check manifest.json Files

If packs still don't show, check that manifest.json files are correct:

#### Behavior Pack manifest.json should have:
```json
{
  "format_version": 2,
  "header": {
    "name": "Rollercoaster Race",
    "uuid": "c0509271-2430-4f5e-b07b-3c39b899afd0",
    ...
  }
}
```

#### Resource Pack manifest.json should have:
```json
{
  "format_version": 2,
  "header": {
    "name": "Rollercoaster Race Resources",
    "uuid": "59c7bc6d-1f77-45bc-a597-ee6cf773f2d1",
    ...
  }
}
```

---

### Solution 3: Common Issues

#### Issue: "Invalid pack" error
**Fix:** Make sure manifest.json is valid JSON (no missing commas, brackets)

#### Issue: Packs show but won't activate
**Fix:** Check Minecraft version is 1.20.0 or higher

#### Issue: Scripts don't work
**Fix:** Enable "GameTest Framework" in world settings under Experiments

#### Issue: Sounds don't play
**Fix:** Make sure resource pack is activated AND sound files are .ogg format

---

### Solution 4: Manual Verification

1. Open `manifest.json` in each pack folder
2. Verify the file is not corrupted
3. Check that all file paths are correct
4. Ensure no extra folders (like `minecraft-rollercoaster-race/behavior_pack/` - should just be `behavior_pack/`)

---

### Solution 5: Platform-Specific Paths

#### Windows 10/11:
```
%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\
```

#### Android:
```
/storage/emulated/0/games/com.mojang/
```

#### iOS:
```
On My iPhone/Minecraft/games/com.mojang/
```

---

### Still Not Working?

Try this **alternative method**:

1. Create a new world WITHOUT the packs
2. Enter the world
3. Exit to main menu
4. Click "Edit" on the world
5. Go to Behavior Packs → Add Pack
6. Go to Resource Packs → Add Pack
7. Save and enter the world

---

### Quick Test

After installation, to verify packs are working:

1. Create world with both packs
2. Enable "GameTest Framework"
3. Enter the world
4. Type `/help` in chat
5. If you see a custom message, behavior pack is working!
6. Place a block and check if custom textures appear

---

## Updated Pack Files

I've created corrected versions with proper UUIDs. Download the latest ZIP file which includes:

- ✅ Fixed manifest.json files
- ✅ Unique UUIDs
- ✅ Correct folder structure
- ✅ All assets included

**The packs should now appear in Minecraft!** 🎉
