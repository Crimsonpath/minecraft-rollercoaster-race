# Minecraft Scripting API Findings

## Key Modules for Player Interaction

### @minecraft/server-ui Module

The `@minecraft/server-ui` module provides three main types of dialog forms:

1. **ActionFormData** - Buttons with captions and images for presenting options
2. **MessageFormData** - Simple two-button Yes/No or OK/Cancel dialogs
3. **ModalFormData** - Flexible questionnaire-style forms with multiple input types

### ActionFormData Class

Perfect for creating interactive menus and instructions for players.

**Key Methods:**
- `title(text)` - Sets the dialog title
- `body(text)` - Sets the body text (instructions)
- `button(text, iconPath?)` - Adds buttons with optional icons
- `header(text)` - Adds headers to organize content
- `label(text)` - Adds text labels
- `divider()` - Adds visual separators
- `show(player)` - Displays the form to a player (returns Promise)

**Example Usage:**
```javascript
import { ActionFormData } from "@minecraft/server-ui";

const form = new ActionFormData()
  .title("Welcome to Rollercoaster Race!")
  .body("Choose your action:")
  .button("Start Race", "textures/ui/icon_start")
  .button("How to Play")
  .button("Exit");

form.show(player).then((response) => {
  if (!response.canceled) {
    // Handle button selection
    console.log("Selected button:", response.selection);
  }
});
```

### MessageFormData Class

Good for simple confirmations and Yes/No questions.

**Key Methods:**
- `title(text)` - Sets dialog title
- `body(text)` - Sets message text
- `button1(text)` - First button (usually "Yes" or "OK")
- `button2(text)` - Second button (usually "No" or "Cancel")
- `show(player)` - Displays the form

### Player Events

From @minecraft/server module:
- `world.afterEvents.playerSpawn` - Triggered when player spawns
- `world.afterEvents.playerInteractWithBlock` - When player interacts with blocks
- `world.afterEvents.playerInteractWithEntity` - When player interacts with entities

### Chat and Title Display

**Chat Messages:**
```javascript
player.sendMessage("Welcome to the race!");
```

**Title Display:**
```javascript
player.onScreenDisplay.setTitle("Race Started!");
player.onScreenDisplay.updateSubtitle("Good luck!");
```

## Implementation Strategy for Rollercoaster

1. **Welcome Dialog** - Show when player enters the area
2. **Instructions Dialog** - Explain how to play
3. **Track Selection** - Let players choose their track color
4. **Race Start Confirmation** - Countdown and start
5. **In-Game Messages** - Display tips and progress
6. **Victory Screen** - Show winner and stats

## Manifest Requirements

To use the UI module, add to manifest.json:
```json
{
  "dependencies": [
    {
      "module_name": "@minecraft/server-ui",
      "version": "2.0.0"
    },
    {
      "module_name": "@minecraft/server",
      "version": "1.8.0"
    }
  ]
}
```

## Notes

- All UI operations are asynchronous (use Promises)
- Forms automatically cancel if chat window is open
- Can add custom icons from resource packs
- Player must be valid entity when showing forms
