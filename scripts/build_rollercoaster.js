/**
 * Minecraft Rollercoaster Race - Automated Builder
 * This script automatically builds a 5-track rollercoaster in the Minecraft Editor
 * 
 * Usage:
 * 1. Open Minecraft Editor
 * 2. Open Script Editor
 * 3. Paste this script
 * 4. Run the script
 */

import { world, BlockTypes, Vector3 } from "@minecraft/server";

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
};

// Track colors (wool types)
const TRACK_COLORS = [
    BlockTypes.get("wool"),      // White
    BlockTypes.get("blue_wool"),
    BlockTypes.get("yellow_wool"),
    BlockTypes.get("lime_wool"),
    BlockTypes.get("purple_wool"),
];

// Block types
const BLOCKS = {
    poweredRail: BlockTypes.get("powered_rail"),
    rail: BlockTypes.get("rail"),
    redstone: BlockTypes.get("redstone_block"),
    stone: BlockTypes.get("stone"),
    stoneBricks: BlockTypes.get("stone_bricks"),
    oak: BlockTypes.get("oak_wood"),
    fence: BlockTypes.get("oak_fence"),
    glass: BlockTypes.get("glass"),
    glowstone: BlockTypes.get("glowstone"),
    air: BlockTypes.get("air"),
};

/**
 * Build a straight section of track
 */
function buildStraightTrack(world, startPos, length, direction, blockType) {
    let currentPos = startPos;
    
    for (let i = 0; i < length; i++) {
        // Place rail
        world.setBlockType(currentPos, BLOCKS.poweredRail);
        
        // Place power block below
        world.setBlockType(
            new Vector3(currentPos.x, currentPos.y - 1, currentPos.z),
            BLOCKS.redstone
        );
        
        // Move to next position
        currentPos = new Vector3(
            currentPos.x + direction.x,
            currentPos.y + direction.y,
            currentPos.z + direction.z
        );
    }
}

/**
 * Build a loop section
 */
function buildLoop(world, startPos, radius, height) {
    const steps = 36; // 10 degree increments
    let currentPos = startPos;
    
    for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const x = Math.round(radius * Math.cos(angle));
        const y = Math.round(height * Math.sin(angle));
        
        const loopPos = new Vector3(
            startPos.x + x,
            startPos.y + y,
            startPos.z
        );
        
        // Place rail
        world.setBlockType(loopPos, BLOCKS.poweredRail);
        
        // Place power block below
        world.setBlockType(
            new Vector3(loopPos.x, loopPos.y - 1, loopPos.z),
            BLOCKS.redstone
        );
    }
}

/**
 * Build a vertical drop
 */
function buildDrop(world, startPos, height) {
    let currentPos = startPos;
    
    for (let i = 0; i < height; i++) {
        // Place rail
        world.setBlockType(currentPos, BLOCKS.poweredRail);
        
        // Place power block below
        world.setBlockType(
            new Vector3(currentPos.x, currentPos.y - 1, currentPos.z),
            BLOCKS.redstone
        );
        
        // Move down
        currentPos = new Vector3(currentPos.x, currentPos.y - 1, currentPos.z);
    }
}

/**
 * Build a single track
 */
function buildTrack(world, trackId, startPos) {
    console.log(`Building track ${trackId + 1}...`);
    
    let currentPos = startPos;
    
    // Straight section up
    buildStraightTrack(world, currentPos, 10, new Vector3(0, 1, 0), BLOCKS.poweredRail);
    currentPos = new Vector3(currentPos.x, currentPos.y + 10, currentPos.z);
    
    // Loop
    buildLoop(world, currentPos, CONFIG.loopRadius, CONFIG.loopHeight);
    currentPos = new Vector3(currentPos.x, currentPos.y - CONFIG.loopHeight, currentPos.z);
    
    // Drop
    buildDrop(world, currentPos, CONFIG.dropHeight);
    currentPos = new Vector3(currentPos.x, currentPos.y - CONFIG.dropHeight, currentPos.z);
    
    // Finish line
    buildStraightTrack(world, currentPos, 5, new Vector3(1, 0, 0), BLOCKS.poweredRail);
}

/**
 * Build decorative platform
 */
function buildPlatform(world) {
    console.log("Building platform...");
    
    const platformY = CONFIG.startY - 1;
    
    for (let x = -10; x < CONFIG.numTracks * CONFIG.trackSpacing + 10; x++) {
        for (let z = -10; z < 10; z++) {
            world.setBlockType(
                new Vector3(CONFIG.startX + x, platformY, CONFIG.startZ + z),
                BLOCKS.stoneBricks
            );
        }
    }
}

/**
 * Build decorative walls
 */
function buildWalls(world) {
    console.log("Building walls...");
    
    const wallY = CONFIG.startY;
    const maxX = CONFIG.numTracks * CONFIG.trackSpacing + 10;
    
    // Front wall
    for (let x = -10; x < maxX; x++) {
        world.setBlockType(
            new Vector3(CONFIG.startX + x, wallY, CONFIG.startZ - 10),
            BLOCKS.fence
        );
    }
    
    // Back wall
    for (let x = -10; x < maxX; x++) {
        world.setBlockType(
            new Vector3(CONFIG.startX + x, wallY, CONFIG.startZ + 30),
            BLOCKS.fence
        );
    }
}

/**
 * Add lighting
 */
function addLighting(world) {
    console.log("Adding lighting...");
    
    const maxX = CONFIG.numTracks * CONFIG.trackSpacing + 10;
    
    for (let x = 0; x < maxX; x += 10) {
        for (let z = -5; z < 25; z += 10) {
            world.setBlockType(
                new Vector3(CONFIG.startX + x, CONFIG.startY + 20, CONFIG.startZ + z),
                BLOCKS.glowstone
            );
        }
    }
}

/**
 * Main build function
 */
function buildRollercoaster() {
    console.log("🎢 Starting Minecraft Rollercoaster Race Build...");
    console.log(`Building ${CONFIG.numTracks} tracks...`);
    
    try {
        // Build platform
        buildPlatform(world);
        
        // Build walls
        buildWalls(world);
        
        // Build each track
        for (let i = 0; i < CONFIG.numTracks; i++) {
            const trackStartX = CONFIG.startX + (i * CONFIG.trackSpacing);
            const trackStartPos = new Vector3(trackStartX, CONFIG.startY, CONFIG.startZ);
            buildTrack(world, i, trackStartPos);
        }
        
        // Add lighting
        addLighting(world);
        
        console.log("✅ Rollercoaster build complete!");
        console.log(`Total tracks: ${CONFIG.numTracks}`);
        console.log("Ready to race! 🏁");
        
    } catch (error) {
        console.error("❌ Error building rollercoaster:", error);
    }
}

// Run the build
buildRollercoaster();
