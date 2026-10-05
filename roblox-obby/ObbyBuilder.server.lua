--[[
	ObbyBuilder
	Put this Script in ServerScriptService and press Play.
	It builds a 6-stage obby in Workspace.Obby and runs all of its logic:
	checkpoints, kill bricks, moving / disappearing platforms, a spinner,
	a truss climb and a finish pad that awards Wins.
]]

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local BASE_Y = 20
local COLORS = {
	platform = Color3.fromRGB(85, 170, 255),
	checkpoint = Color3.fromRGB(80, 220, 100),
	kill = Color3.fromRGB(255, 50, 50),
	mover = Color3.fromRGB(255, 170, 0),
	fade = Color3.fromRGB(180, 120, 255),
	finish = Color3.fromRGB(255, 215, 0),
}

local old = workspace:FindFirstChild("Obby")
if old then
	old:Destroy()
end
local obby = Instance.new("Folder")
obby.Name = "Obby"
obby.Parent = workspace

local function makePart(props, className)
	local p = Instance.new(className or "Part")
	p.Anchored = true
	p.TopSurface = Enum.SurfaceType.Smooth
	p.BottomSurface = Enum.SurfaceType.Smooth
	p.Material = Enum.Material.SmoothPlastic
	for key, value in pairs(props) do
		p[key] = value
	end
	if not p.Parent then
		p.Parent = obby
	end
	return p
end

local function characterFromHit(hit)
	local model = hit:FindFirstAncestorOfClass("Model")
	if not model then
		return nil, nil
	end
	local humanoid = model:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return nil, nil
	end
	return humanoid, Players:GetPlayerFromCharacter(model)
end

local function addLabel(part, text)
	local gui = Instance.new("BillboardGui")
	gui.Size = UDim2.fromOffset(200, 50)
	gui.StudsOffset = Vector3.new(0, 4, 0)
	gui.MaxDistance = 80
	local label = Instance.new("TextLabel")
	label.Size = UDim2.fromScale(1, 1)
	label.BackgroundTransparency = 1
	label.Text = text
	label.TextScaled = true
	label.Font = Enum.Font.FredokaOne
	label.TextColor3 = Color3.new(1, 1, 1)
	label.TextStrokeTransparency = 0
	label.Parent = gui
	gui.Parent = part
end

local function makeKill(props)
	props.Color = props.Color or COLORS.kill
	props.Material = props.Material or Enum.Material.Neon
	local part = makePart(props)
	part.Touched:Connect(function(hit)
		local humanoid = characterFromHit(hit)
		if humanoid and humanoid.Health > 0 then
			humanoid.Health = 0
		end
	end)
	return part
end

---------------------------------------------------------------------------
-- Checkpoints / player data
---------------------------------------------------------------------------

local checkpoints = {} -- [stage] = part; stage 0 is the start spawn

local function getStage(player)
	local stats = player:FindFirstChild("leaderstats")
	return stats and stats:FindFirstChild("Stage")
end

local function addCheckpoint(stage, position)
	local pad = makePart({
		Name = "Checkpoint" .. stage,
		Size = Vector3.new(10, 1, 10),
		Position = position,
		Color = COLORS.checkpoint,
		Material = Enum.Material.Neon,
	})
	addLabel(pad, "Stage " .. stage)
	checkpoints[stage] = pad
	pad.Touched:Connect(function(hit)
		local humanoid, player = characterFromHit(hit)
		if not (player and humanoid and humanoid.Health > 0) then
			return
		end
		local value = getStage(player)
		if value and value.Value < stage then
			value.Value = stage
		end
	end)
	return pad
end

---------------------------------------------------------------------------
-- Course
---------------------------------------------------------------------------

local y = BASE_Y
local z = 0

-- Start
local spawn = makePart({
	Name = "Start",
	Size = Vector3.new(14, 1, 14),
	Position = Vector3.new(0, y, z),
	Color = COLORS.checkpoint,
	Neutral = true,
	Duration = 0,
}, "SpawnLocation")
addLabel(spawn, "OBBY START")
checkpoints[0] = spawn
z += 7

-- Stage 1: easy staircase jumps
for i = 1, 6 do
	z += 9
	y += 1
	makePart({
		Name = "Jump" .. i,
		Size = Vector3.new(5, 1, 5),
		Position = Vector3.new(i % 2 == 0 and 3 or -3, y, z),
		Color = COLORS.platform,
	})
end
z += 11
addCheckpoint(1, Vector3.new(0, y, z))
z += 5

-- Stage 2: walkway with lava bars to hop over
local walkLength = 60
makePart({
	Name = "LavaWalk",
	Size = Vector3.new(4, 1, walkLength),
	Position = Vector3.new(0, y, z + walkLength / 2),
	Color = COLORS.platform,
})
for i = 1, 5 do
	makeKill({
		Name = "LavaBar" .. i,
		Size = Vector3.new(4, 1.5, 1),
		Position = Vector3.new(0, y + 1.25, z + i * 10),
	})
end
z += walkLength + 5
addCheckpoint(2, Vector3.new(0, y, z))
z += 5

-- Stage 3: moving platforms
local movers = {}
for i = 1, 4 do
	z += 11
	local part = makePart({
		Name = "Mover" .. i,
		Size = Vector3.new(6, 1, 6),
		Position = Vector3.new(0, y, z),
		Color = COLORS.mover,
	})
	table.insert(movers, {
		part = part,
		origin = part.Position,
		amplitude = 9,
		speed = 1.2 + i * 0.15,
		phase = i * 1.3,
	})
end
z += 12
addCheckpoint(3, Vector3.new(0, y, z))
z += 5

-- Stage 4: disappearing platforms
for i = 1, 7 do
	z += 8
	local part = makePart({
		Name = "Fade" .. i,
		Size = Vector3.new(5, 1, 5),
		Position = Vector3.new(0, y, z),
		Color = COLORS.fade,
		Material = Enum.Material.Glass,
		Transparency = 0.2,
	})
	local busy = false
	part.Touched:Connect(function(hit)
		if busy or not characterFromHit(hit) then
			return
		end
		busy = true
		local fadeOut = TweenService:Create(part, TweenInfo.new(0.6), { Transparency = 1 })
		fadeOut:Play()
		fadeOut.Completed:Wait()
		part.CanCollide = false
		task.wait(2)
		part.CanCollide = true
		part.Transparency = 0.2
		busy = false
	end)
end
z += 10
addCheckpoint(4, Vector3.new(0, y, z))
z += 5

-- Stage 5: spinning lava bar on a round platform
local radius = 16
z += radius
local disc = makePart({
	Name = "SpinnerDisc",
	Shape = Enum.PartType.Cylinder,
	Size = Vector3.new(1, radius * 2, radius * 2),
	CFrame = CFrame.new(0, y, z) * CFrame.Angles(0, 0, math.rad(90)),
	Color = COLORS.platform,
})
makePart({
	Name = "SpinnerPillar",
	Size = Vector3.new(2, 4, 2),
	Position = Vector3.new(0, y + 2.5, z),
	Color = Color3.fromRGB(60, 60, 60),
})
local spinnerCenter = Vector3.new(0, y + 1.5, z)
local spinner = makeKill({
	Name = "SpinnerBar",
	Size = Vector3.new(radius * 2 - 4, 1, 1),
	Position = spinnerCenter,
})
z += radius + 6
addCheckpoint(5, Vector3.new(0, y, z))
z += 5

-- Stage 6: truss climb, then a final gap
local trussHeight = 24
makePart({
	Name = "TrussBase",
	Size = Vector3.new(8, 1, 8),
	Position = Vector3.new(0, y, z + 4),
	Color = COLORS.platform,
})
makePart({
	Name = "Truss",
	Size = Vector3.new(2, trussHeight, 2),
	Position = Vector3.new(0, y + trussHeight / 2 + 0.5, z + 9),
	Color = Color3.fromRGB(120, 120, 120),
}, "TrussPart")
y += trussHeight
z += 11
makePart({
	Name = "TrussTop",
	Size = Vector3.new(8, 1, 8),
	Position = Vector3.new(0, y, z + 4),
	Color = COLORS.platform,
})
z += 8
for i = 1, 3 do
	z += 8
	makePart({
		Name = "SkyJump" .. i,
		Size = Vector3.new(3, 1, 3),
		Position = Vector3.new(i == 2 and 3 or -3, y, z),
		Color = COLORS.platform,
	})
end
z += 11

-- Finish
local finalStage = 5
local finish = makePart({
	Name = "Finish",
	Size = Vector3.new(14, 1, 14),
	Position = Vector3.new(0, y, z),
	Color = COLORS.finish,
	Material = Enum.Material.Neon,
})
addLabel(finish, "FINISH!")

-- Lava sea under the whole course catches anyone who falls
makeKill({
	Name = "LavaSea",
	Size = Vector3.new(300, 1, z + 100),
	Position = Vector3.new(0, BASE_Y - 12, z / 2),
	Transparency = 0.3,
	CanCollide = false,
})

---------------------------------------------------------------------------
-- Animation
---------------------------------------------------------------------------

RunService.Heartbeat:Connect(function()
	local t = os.clock()
	for _, m in ipairs(movers) do
		local offset = math.sin(t * m.speed + m.phase) * m.amplitude
		local velocity = math.cos(t * m.speed + m.phase) * m.amplitude * m.speed
		m.part.CFrame = CFrame.new(m.origin + Vector3.new(offset, 0, 0))
		-- Velocity on an anchored part carries players standing on it.
		m.part.AssemblyLinearVelocity = Vector3.new(velocity, 0, 0)
	end
	spinner.CFrame = CFrame.new(spinnerCenter) * CFrame.Angles(0, t * 1.6, 0)
end)

---------------------------------------------------------------------------
-- Players
---------------------------------------------------------------------------

local finishing = {}

finish.Touched:Connect(function(hit)
	local humanoid, player = characterFromHit(hit)
	if not (player and humanoid and humanoid.Health > 0) or finishing[player] then
		return
	end
	local stage = getStage(player)
	if not stage or stage.Value < finalStage then
		return
	end
	finishing[player] = true
	local wins = player.leaderstats:FindFirstChild("Wins")
	wins.Value += 1
	task.wait(3)
	if player.Parent then
		stage.Value = 0
		player:LoadCharacter()
	end
	finishing[player] = nil
end)

local function onPlayerAdded(player)
	local stats = Instance.new("Folder")
	stats.Name = "leaderstats"
	local stage = Instance.new("IntValue")
	stage.Name = "Stage"
	stage.Parent = stats
	local wins = Instance.new("IntValue")
	wins.Name = "Wins"
	wins.Parent = stats
	stats.Parent = player

	player.CharacterAdded:Connect(function(character)
		character:WaitForChild("HumanoidRootPart")
		task.wait() -- let the default spawn finish first
		local checkpoint = checkpoints[stage.Value] or checkpoints[0]
		character:PivotTo(checkpoint.CFrame + Vector3.new(0, 4, 0))
	end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
for _, player in ipairs(Players:GetPlayers()) do
	onPlayerAdded(player)
end
Players.PlayerRemoving:Connect(function(player)
	finishing[player] = nil
end)
