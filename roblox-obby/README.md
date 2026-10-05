# Roblox Obby

A complete 6-stage obby built entirely from one server script.

## How to use

1. Open Roblox Studio and create a new **Baseplate** place.
2. In the Explorer, right-click **ServerScriptService** → **Insert Object** → **Script**.
3. Paste in the contents of `ObbyBuilder.server.lua`.
4. Press **Play**. The course is generated in `Workspace.Obby`.

## Stages

| Stage | Obstacle |
|-------|----------|
| 1 | Zig-zag staircase jumps |
| 2 | Narrow walkway with lava bars to hop over |
| 3 | Platforms that slide side to side (they carry you) |
| 4 | Glass platforms that vanish 0.6s after you step on them |
| 5 | Round platform with a spinning lava bar |
| 6 | Truss climb followed by small sky jumps |
| Finish | Gold pad: +1 Win, then you're sent back to the start |

A lava sea under the course kills anyone who falls. Touching a green checkpoint
saves your stage, and you respawn there when you die. `Stage` and `Wins` show
on the leaderboard.

## Tweaking

- Colors live in the `COLORS` table at the top of the script.
- `BASE_Y` sets how high the course floats.
- Mover speed/amplitude and the spinner speed (`t * 1.6`) control difficulty.
- Stats reset when a player leaves; add a DataStore if you want them to persist.
