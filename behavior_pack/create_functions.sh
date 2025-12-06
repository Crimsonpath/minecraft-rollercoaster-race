#!/bin/bash

# Create the functions directory
mkdir -p functions

# Split the commands into smaller function files
echo "Creating function files..."

# Setup function
cat > functions/setup.mcfunction << 'SETUP'
# Setup the world
setworldspawn 0 64 0
fill -100 54 -100 200 164 100 air
say Track area cleared! Building tracks...
SETUP

# Track 1 function
head -68 /home/ubuntu/minecraft-rollercoaster-race/rollercoaster_commands.txt | tail -63 | grep "^setblock" > functions/build_track1.mcfunction
echo "say Track 1 (Red) complete!" >> functions/build_track1.mcfunction

# Track 2 function  
head -135 /home/ubuntu/minecraft-rollercoaster-race/rollercoaster_commands.txt | tail -63 | grep "^setblock" > functions/build_track2.mcfunction
echo "say Track 2 (Blue) complete!" >> functions/build_track2.mcfunction

# Track 3 function
head -202 /home/ubuntu/minecraft-rollercoaster-race/rollercoaster_commands.txt | tail -63 | grep "^setblock" > functions/build_track3.mcfunction
echo "say Track 3 (Yellow) complete!" >> functions/build_track3.mcfunction

# Track 4 function
head -269 /home/ubuntu/minecraft-rollercoaster-race/rollercoaster_commands.txt | tail -63 | grep "^setblock" > functions/build_track4.mcfunction
echo "say Track 4 (Green) complete!" >> functions/build_track4.mcfunction

# Track 5 function
head -336 /home/ubuntu/minecraft-rollercoaster-race/rollercoaster_commands.txt | tail -63 | grep "^setblock" > functions/build_track5.mcfunction
echo "say Track 5 (Purple) complete!" >> functions/build_track5.mcfunction

# Master build function that calls all others
cat > functions/build_all.mcfunction << 'BUILDALL'
# Build all rollercoaster tracks
say Starting rollercoaster construction...
function setup
function build_track1
function build_track2
function build_track3
function build_track4
function build_track5
say All tracks complete! Type /race to start!
BUILDALL

echo "✓ Function files created!"
ls -lh functions/

