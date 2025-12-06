# 🎢 Rollercoaster Race - Installation Guide

## Overview

This guide will help you install and set up the interactive Rollercoaster Race experience in Minecraft Bedrock Edition. The pack includes automated building scripts and interactive player dialogues.

## What You'll Get

- **Interactive Welcome System** - Players are greeted with a friendly dialog when they enter the race area
- **How to Play Instructions** - Clear, easy-to-understand game rules
- **Track Selection Menu** - Players can choose from 5 colorful tracks
- **Race Countdown** - Exciting countdown before the race starts
- **Victory Screen** - Celebration dialog when players finish
- **Chat Commands** - Easy commands like `/race`, `/help`, and `/tracks`

## Installation Methods

### Method 1: Behavior Pack (Recommended for Interactive Features)

This method gives you the full interactive experience with dialogues and player guidance.

#### Step 1: Prepare the Behavior Pack

1. Locate the `behavior_pack` folder in this repository
2. The folder structure should look like this:
   ```
   behavior_pack/
   ├── manifest.json
   └── scripts/
       └── interactive_rollercoaster.js
   ```

#### Step 2: Install the Behavior Pack

**For Windows:**
1. Press `Win + R` and type: `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`
2. Copy the entire `behavior_pack` folder into this directory
3. Rename it to something memorable like `RollercoasterRace_BP`

**For Android:**
1. Use a file manager app
2. Navigate to: `Internal Storage/games/com.mojang/behavior_packs/`
3. Copy the `behavior_pack` folder here
4. Rename it to `RollercoasterRace_BP`

**For iOS:**
1. Use the Files app
2. Navigate to: `Minecraft/games/com.mojang/behavior_packs/`
3. Copy the `behavior_pack` folder here
4. Rename it to `RollercoasterRace_BP`

#### Step 3: Enable in Your World

1. Open Minecraft and create a new world or edit an existing one
2. Scroll down to **Behavior Packs**
3. Click **My Packs**
4. Find "Rollercoaster Race" and click the **+** button to activate it
5. Make sure **Enable GameTest Framework** is turned ON in the world settings
6. Make sure **Enable Script Debugging** is turned ON (optional, for development)
7. Create/load the world

#### Step 4: Build the Track

Once in the world, you have two options:

**Option A: Use Commands (Quick)**
1. Enable cheats in your world
2. Open the `rollercoaster_commands.txt` file
3. Copy and paste the commands into a command block or chat
4. The track will build automatically

**Option B: Use the Build Script**
1. Open the Minecraft Editor (if available)
2. Load the `scripts/build_rollercoaster.js` script
3. Run the script to build the track

### Method 2: Commands Only (No Interactive Features)

If you just want the track without the interactive dialogues:

1. Enable cheats in your Minecraft world
2. Open `rollercoaster_commands.txt`
3. Copy the commands
4. Paste them into a command block or directly in chat
5. The rollercoaster will be built instantly

### Method 3: Schematic Import (For Advanced Users)

If you're using WorldEdit, Amulet, or similar tools:

1. Open your world in the schematic tool
2. Import `rollercoaster_schematic.json`
3. Place it at your desired location
4. Save the world

## Testing the Installation

### For Behavior Pack Installation:

1. **Spawn in the world** - You should see a welcome message in chat
2. **Type `/race`** in chat - This should open the welcome dialog
3. **Check for the dialog** - You should see a colorful menu with options
4. **Try the buttons** - Click "How to Play" to see instructions

### For Commands Installation:

1. **Look for the track** - You should see 5 parallel rollercoaster tracks
2. **Check the starting platform** - There should be a stone brick platform
3. **Verify powered rails** - The tracks should have powered rails

## Troubleshooting

### Dialog Not Showing

**Problem:** The welcome dialog doesn't appear when typing `/race`

**Solutions:**
- Make sure the behavior pack is activated in your world
- Verify that "Enable GameTest Framework" is turned ON
- Check that you're using Minecraft Bedrock Edition (not Java Edition)
- Try reloading the world

### Script Errors

**Problem:** You see error messages in chat about scripts

**Solutions:**
- Check that the manifest.json has the correct module versions
- Ensure the script file is in the correct location: `behavior_pack/scripts/`
- Verify that the script file is named exactly `interactive_rollercoaster.js`
- Check the content log (Settings → Creator → Enable Content Log)

### Track Not Building

**Problem:** The rollercoaster doesn't appear

**Solutions:**
- Make sure cheats are enabled
- Verify you have operator permissions
- Check that the commands are being executed in the correct order
- Try building in a flat, empty area first

### Players Can't See Dialogs

**Problem:** Some players don't see the UI dialogs

**Solutions:**
- Make sure all players have the behavior pack enabled
- Check that players aren't in the chat window (dialogs auto-cancel if chat is open)
- Verify players are within the race area (100 blocks from center)
- Try having players relog

## Configuration

You can customize the experience by editing the `CONFIG` object in `interactive_rollercoaster.js`:

```javascript
const CONFIG = {
    numTracks: 5,           // Number of parallel tracks (1-10)
    trackSpacing: 20,       // Distance between tracks in blocks
    startX: 0,              // Starting X coordinate
    startY: 64,             // Starting Y coordinate (height)
    startZ: 0,              // Starting Z coordinate
    trackLength: 50,        // Length of track in blocks
    loopRadius: 5,          // Radius of loop sections
    loopHeight: 8,          // Height of loops
    dropHeight: 15,         // Height of drops
    raceAreaRadius: 100,    // Radius for detecting players in race area
};
```

## Commands Reference

When the behavior pack is installed, players can use these commands:

- **`/race`** - Opens the main menu
- **`/help`** - Shows how to play instructions
- **`/tracks`** - Opens track selection menu

## Multiplayer Setup

For the best multiplayer experience:

1. **Host Player:** Install the behavior pack and build the track
2. **Join Players:** Make sure they have the same behavior pack installed
3. **Sync:** All players should see the same dialogs and menus
4. **Race:** Up to 5 players can race simultaneously (one per track)

## Performance Tips

- **Reduce Render Distance:** Lower render distance for better performance
- **Limit Entities:** Remove unnecessary mobs near the race area
- **Optimize World:** Use a flat world or clear area for best results
- **Close Other Apps:** Free up device memory for smoother gameplay

## Uninstalling

To remove the Rollercoaster Race pack:

1. Open your world settings
2. Go to **Behavior Packs**
3. Find "Rollercoaster Race"
4. Click the **-** button to deactivate
5. Optionally, delete the pack folder from your device

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review the `docs/API_FINDINGS.md` for technical details
3. Check the Minecraft version compatibility (requires 1.20.0+)
4. Make sure you're using Bedrock Edition, not Java Edition

## Next Steps

Once installed, check out:

- **README.md** - Quick start guide
- **GAMEPLAY_GUIDE.md** - Tips and strategies for racing
- **CUSTOMIZATION.md** - How to modify tracks and settings

---

**Enjoy the race!** 🏁🎢
