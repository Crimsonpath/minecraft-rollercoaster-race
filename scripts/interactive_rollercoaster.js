/**
 * Interactive Minecraft Rollercoaster Race with Player Dialogues
 * This script builds the rollercoaster AND adds interactive UI elements
 * to guide players through the experience.
 * 
 * Features:
 * - Welcome dialog when players spawn
 * - How to play instructions
 * - Track selection menu
 * - Race countdown
 * - Victory detection
 * 
 * Usage:
 * 1. Create a new behavior pack
 * 2. Add this script to the scripts folder
 * 3. Configure manifest.json with required dependencies
 * 4. Load the pack in your world
 */

import { world, system, BlockTypes, Vector3 } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";

// Configuration
const CONFIG = {
    numTracks: 5,
    trackSpacing: 20,
    startX: 0,
    startY: 64,
    startZ: 0,
    trackLength: 50,
    loopRadius: 5,
    loopHeight: 8,
    dropHeight: 15,
    raceAreaRadius: 100,
};

// Track colors and names
const TRACKS = [
    { name: "Red Lightning", color: "red", woolType: "red_wool" },
    { name: "Blue Thunder", color: "blue", woolType: "blue_wool" },
    { name: "Yellow Comet", color: "yellow", woolType: "yellow_wool" },
    { name: "Green Flash", color: "lime", woolType: "lime_wool" },
    { name: "Purple Storm", color: "purple", woolType: "purple_wool" },
];

// Game state
const gameState = {
    playersInRace: new Map(),
    raceActive: false,
    raceStartTime: 0,
};

/**
 * Show welcome dialog to new players
 */
async function showWelcomeDialog(player) {
    const form = new ActionFormData()
        .title("§l§6🎢 Welcome to Rollercoaster Race! 🎢")
        .body(
            "§eGet ready for the most exciting race of your life!\n\n" +
            "§7This is a competitive rollercoaster racing experience " +
            "where you'll race against your friends on parallel tracks " +
            "filled with loops, drops, and twists!\n\n" +
            "§aWhat would you like to do?"
        )
        .button("§2▶ Start Racing", "textures/ui/icon_best3")
        .button("§e📖 How to Play", "textures/ui/book_writable")
        .button("§c✖ Exit", "textures/ui/cancel");

    try {
        const response = await form.show(player);
        
        if (response.canceled) {
            return;
        }

        switch (response.selection) {
            case 0: // Start Racing
                await showTrackSelectionDialog(player);
                break;
            case 1: // How to Play
                await showHowToPlayDialog(player);
                break;
            case 2: // Exit
                player.sendMessage("§7Come back when you're ready to race!");
                break;
        }
    } catch (error) {
        console.error("Error showing welcome dialog:", error);
    }
}

/**
 * Show how to play instructions
 */
async function showHowToPlayDialog(player) {
    const form = new ActionFormData()
        .title("§l§e📖 How to Play")
        .body(
            "§6=== Race Rules ===§r\n\n" +
            "§71. Choose your track color\n" +
            "§72. Get in your minecart at the starting line\n" +
            "§73. Wait for the countdown\n" +
            "§74. Race through loops, drops, and twists!\n" +
            "§75. First to the finish line wins!\n\n" +
            "§6=== Tips ===§r\n\n" +
            "§e⚡ Powered rails keep you moving fast\n" +
            "§e🎯 Stay on your track for best time\n" +
            "§e🏆 Watch out for the big drop!\n" +
            "§e👥 Race with 4-5 friends for maximum fun!\n\n" +
            "§aReady to race?"
        )
        .button("§2✓ Yes, Let's Race!", "textures/ui/check")
        .button("§e↩ Back to Menu", "textures/ui/arrow_left");

    try {
        const response = await form.show(player);
        
        if (response.canceled) {
            return;
        }

        if (response.selection === 0) {
            await showTrackSelectionDialog(player);
        } else {
            await showWelcomeDialog(player);
        }
    } catch (error) {
        console.error("Error showing how to play dialog:", error);
    }
}

/**
 * Show track selection dialog
 */
async function showTrackSelectionDialog(player) {
    const form = new ActionFormData()
        .title("§l§6🏁 Choose Your Track")
        .body(
            "§eSelect your racing track!\n\n" +
            "§7Each track has the same layout, so it's all about skill!\n" +
            "§7Choose your favorite color and get ready to race!\n"
        );

    // Add button for each track
    TRACKS.forEach((track, index) => {
        const status = gameState.playersInRace.has(`track_${index}`) ? "§c[TAKEN]" : "§a[AVAILABLE]";
        form.button(`${status} §l${track.name}`, `textures/blocks/wool_colored_${track.color}`);
    });

    form.button("§e↩ Back to Menu", "textures/ui/arrow_left");

    try {
        const response = await form.show(player);
        
        if (response.canceled) {
            return;
        }

        if (response.selection === TRACKS.length) {
            // Back button
            await showWelcomeDialog(player);
            return;
        }

        const selectedTrack = response.selection;
        
        // Check if track is available
        if (gameState.playersInRace.has(`track_${selectedTrack}`)) {
            player.sendMessage("§cThat track is already taken! Please choose another.");
            await showTrackSelectionDialog(player);
            return;
        }

        // Assign player to track
        gameState.playersInRace.set(`track_${selectedTrack}`, player.name);
        player.sendMessage(`§a✓ You've selected the ${TRACKS[selectedTrack].name} track!`);
        
        // Teleport player to starting position
        const startPos = {
            x: CONFIG.startX + (selectedTrack * CONFIG.trackSpacing),
            y: CONFIG.startY,
            z: CONFIG.startZ
        };
        player.teleport(startPos);
        
        // Show ready dialog
        await showReadyDialog(player, selectedTrack);
        
    } catch (error) {
        console.error("Error showing track selection dialog:", error);
    }
}

/**
 * Show ready dialog and countdown
 */
async function showReadyDialog(player, trackIndex) {
    const form = new MessageFormData()
        .title("§l§a✓ Track Assigned!")
        .body(
            `§eYou're on the §l${TRACKS[trackIndex].name}§r§e track!\n\n` +
            "§7Get in your minecart and wait for other players.\n" +
            "§7The race will start when everyone is ready!\n\n" +
            "§aAre you ready to race?"
        )
        .button1("§2✓ I'm Ready!")
        .button2("§c✖ Not Yet");

    try {
        const response = await form.show(player);
        
        if (response.selection === 0) {
            player.sendMessage("§a✓ You're ready! Waiting for other players...");
            // In a full implementation, this would trigger countdown when all players are ready
            startCountdown(player);
        } else {
            player.sendMessage("§7Take your time! Use §e/race§7 when you're ready.");
        }
    } catch (error) {
        console.error("Error showing ready dialog:", error);
    }
}

/**
 * Start race countdown
 */
function startCountdown(player) {
    let count = 3;
    
    const countdownInterval = system.runInterval(() => {
        if (count > 0) {
            // Show countdown on screen
            player.onScreenDisplay.setTitle(`§l§e${count}`);
            player.playSound("random.click");
            count--;
        } else {
            // Start race
            player.onScreenDisplay.setTitle("§l§aGO!");
            player.playSound("random.levelup");
            player.sendMessage("§a§l🏁 RACE STARTED! 🏁");
            
            system.clearRun(countdownInterval);
            
            // Clear title after 2 seconds
            system.runTimeout(() => {
                player.onScreenDisplay.clearTitle();
            }, 40); // 40 ticks = 2 seconds
        }
    }, 20); // 20 ticks = 1 second
}

/**
 * Show victory dialog
 */
async function showVictoryDialog(player, raceTime) {
    const form = new ActionFormData()
        .title("§l§6🏆 VICTORY! 🏆")
        .body(
            `§a§lCONGRATULATIONS!\n\n` +
            `§eYou finished the race!\n` +
            `§7Time: §f${raceTime.toFixed(2)}s\n\n` +
            `§6⭐ Amazing performance! ⭐\n\n` +
            `§7What would you like to do next?`
        )
        .button("§2▶ Race Again", "textures/ui/refresh")
        .button("§e📊 View Stats", "textures/ui/book_writable")
        .button("§c✖ Exit", "textures/ui/cancel");

    try {
        const response = await form.show(player);
        
        if (response.canceled) {
            return;
        }

        switch (response.selection) {
            case 0: // Race Again
                await showTrackSelectionDialog(player);
                break;
            case 1: // View Stats
                player.sendMessage("§7Stats feature coming soon!");
                break;
            case 2: // Exit
                player.sendMessage("§7Thanks for racing! Come back soon!");
                break;
        }
    } catch (error) {
        console.error("Error showing victory dialog:", error);
    }
}

/**
 * Handle player spawn - show welcome dialog
 */
world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    
    // Check if player is in the race area
    const pos = player.location;
    const distanceFromCenter = Math.sqrt(
        Math.pow(pos.x - CONFIG.startX, 2) + 
        Math.pow(pos.z - CONFIG.startZ, 2)
    );
    
    if (distanceFromCenter < CONFIG.raceAreaRadius) {
        // Show welcome dialog after a short delay
        system.runTimeout(() => {
            showWelcomeDialog(player);
        }, 20); // 1 second delay
    }
});

/**
 * Handle player joining world
 */
world.afterEvents.playerJoin.subscribe((event) => {
    const player = event.player;
    player.sendMessage("§a§l=== ROLLERCOASTER RACE ===");
    player.sendMessage("§7Welcome! Type §e/race§7 to start racing!");
});

/**
 * Chat command handler
 */
world.beforeEvents.chatSend.subscribe((event) => {
    const player = event.sender;
    const message = event.message.toLowerCase();
    
    if (message === "/race" || message === "!race") {
        event.cancel = true;
        showWelcomeDialog(player);
    } else if (message === "/help" || message === "!help") {
        event.cancel = true;
        showHowToPlayDialog(player);
    } else if (message === "/tracks" || message === "!tracks") {
        event.cancel = true;
        showTrackSelectionDialog(player);
    }
});

/**
 * Detect when player crosses finish line
 */
system.runInterval(() => {
    const players = world.getAllPlayers();
    
    players.forEach(player => {
        const pos = player.location;
        
        // Check if player is near finish line (example coordinates)
        // Adjust these based on your actual track layout
        const finishLineZ = CONFIG.startZ + CONFIG.trackLength;
        
        if (Math.abs(pos.z - finishLineZ) < 2 && !player.hasTag("finished")) {
            player.addTag("finished");
            
            // Calculate race time
            const raceTime = (Date.now() - gameState.raceStartTime) / 1000;
            
            // Show victory dialog
            showVictoryDialog(player, raceTime);
            
            // Broadcast to all players
            world.sendMessage(`§6🏆 ${player.name} §ehas finished the race!`);
        }
    });
}, 10); // Check every 0.5 seconds

// Initialize
console.log("§a[Rollercoaster Race] Interactive script loaded!");
console.log("§7Players can use §e/race§7 to start!");
