if (typeof window !== 'undefined') {
	require('./tools/MapSetPolyfill');
}

module.exports = {
	Ajax: require('./src/goo/util/Ajax'),
	ArrayUtil: require('./src/goo/util/ArrayUtil'),
	ArrayUtils: require('./src/goo/util/ArrayUtils'),
	AtlasNode: require('./src/goo/util/combine/AtlasNode'),
	AudioContext: require('./src/goo/sound/AudioContext'),
	BoundingBox: require('./src/goo/renderer/bounds/BoundingBox'),
	BoundingPicker: require('./src/goo/renderer/bounds/BoundingPicker'),
	BoundingSphere: require('./src/goo/renderer/bounds/BoundingSphere'),
	BoundingTree: require('./src/goo/picking/BoundingTree'),
	BoundingUpdateSystem: require('./src/goo/entities/systems/BoundingUpdateSystem'),
	BoundingVolume: require('./src/goo/renderer/bounds/BoundingVolume'),
	Box: require('./src/goo/shapes/Box'),
	BufferData: require('./src/goo/renderer/BufferData'),
	BufferUtils: require('./src/goo/renderer/BufferUtils'),
	Bus: require('./src/goo/entities/Bus'),
	Camera: require('./src/goo/renderer/Camera'),
	CameraComponent: require('./src/goo/entities/components/CameraComponent'),
	CameraComponentHandler: require('./src/goo/loaders/handlers/CameraComponentHandler'),
	CameraSystem: require('./src/goo/entities/systems/CameraSystem'),
	CanvasUtils: require('./src/goo/util/CanvasUtils'),
	Capabilities: require('./src/goo/renderer/Capabilities'),
	Component: require('./src/goo/entities/components/Component'),
	ComponentHandler: require('./src/goo/loaders/handlers/ComponentHandler'),
	Composer: require('./src/goo/renderer/pass/Composer'),
	Cone: require('./src/goo/shapes/Cone'),
	ConfigHandler: require('./src/goo/loaders/handlers/ConfigHandler'),
	ContextLost: require('./src/goo/renderer/Renderer+ContextLost'),
	CrunchLoader: require('./src/goo/loaders/crunch/CrunchLoader'),
	CssTransformComponent: require('./src/goo/entities/components/CssTransformComponent'),
	CssTransformSystem: require('./src/goo/entities/systems/CssTransformSystem'),
	Cylinder: require('./src/goo/shapes/Cylinder'),
	DdsLoader: require('./src/goo/loaders/dds/DdsLoader'),
	DdsUtils: require('./src/goo/loaders/dds/DdsUtils'),
	DirectionalLight: require('./src/goo/renderer/light/DirectionalLight'),
	Disk: require('./src/goo/shapes/Disk'),
	Dom3dComponent: require('./src/goo/entities/components/Dom3dComponent'),
	Dom3dComponentHandler: require('./src/goo/loaders/handlers/Dom3dComponentHandler'),
	Dom3dSystem: require('./src/goo/entities/systems/Dom3dSystem'),
	DynamicLoader: require('./src/goo/loaders/DynamicLoader'),
	Easing: require('./src/goo/util/Easing'),
	Entity: require('./src/goo/entities/Entity'),
	EntityCombiner: require('./src/goo/util/combine/EntityCombiner'),
	EntityHandler: require('./src/goo/loaders/handlers/EntityHandler'),
	EntityManager: require('./src/goo/entities/managers/EntityManager'),
	EntitySelection: require('./src/goo/entities/EntitySelection'),
	EntityUtils: require('./src/goo/entities/EntityUtils'),
	EnvironmentHandler: require('./src/goo/loaders/handlers/EnvironmentHandler'),
	EventTarget: require('./src/goo/util/EventTarget'),
	FullscreenPass: require('./src/goo/renderer/pass/FullscreenPass'),
	FullscreenUtil: require('./src/goo/renderer/pass/FullscreenUtil'),
	FullscreenUtils: require('./src/goo/renderer/pass/FullscreenUtils'),
	GameUtils: require('./src/goo/util/GameUtils'),
	GooRunner: require('./src/goo/entities/GooRunner'),
	Grid: require('./src/goo/shapes/Grid'),
	GridRenderSystem: require('./src/goo/entities/systems/GridRenderSystem'),
	HtmlComponent: require('./src/goo/entities/components/HtmlComponent'),
	HtmlComponentHandler: require('./src/goo/loaders/handlers/HtmlComponentHandler'),
	HtmlSystem: require('./src/goo/entities/systems/HtmlSystem'),
	JsonHandler: require('./src/goo/loaders/handlers/JsonHandler'),
	Light: require('./src/goo/renderer/light/Light'),
	LightComponent: require('./src/goo/entities/components/LightComponent'),
	LightComponentHandler: require('./src/goo/loaders/handlers/LightComponentHandler'),
	LightingSystem: require('./src/goo/entities/systems/LightingSystem'),
	Logo: require('./src/goo/util/Logo'),
	Manager: require('./src/goo/entities/managers/Manager'),
	Material: require('./src/goo/renderer/Material'),
	MaterialHandler: require('./src/goo/loaders/handlers/MaterialHandler'),
	MathUtils: require('./src/goo/math/MathUtils'),
	Matrix2: require('./src/goo/math/Matrix2'),
	Matrix2x2: require('./src/goo/math/Matrix2x2'),
	Matrix3: require('./src/goo/math/Matrix3'),
	Matrix3x3: require('./src/goo/math/Matrix3x3'),
	Matrix4: require('./src/goo/math/Matrix4'),
	Matrix4x4: require('./src/goo/math/Matrix4x4'),
	Matrix: require('./src/goo/math/Matrix'),
	MeshBuilder: require('./src/goo/util/MeshBuilder'),
	MeshData: require('./src/goo/renderer/MeshData'),
	MeshDataComponent: require('./src/goo/entities/components/MeshDataComponent'),
	MeshDataComponentHandler: require('./src/goo/loaders/handlers/MeshDataComponentHandler'),
	MeshDataHandler: require('./src/goo/loaders/handlers/MeshDataHandler'),
	MeshRendererComponent: require('./src/goo/entities/components/MeshRendererComponent'),
	MeshRendererComponentHandler: require('./src/goo/loaders/handlers/MeshRendererComponentHandler'),
	MovementComponent: require('./src/goo/entities/components/MovementComponent'),
	MovementSystem: require('./src/goo/entities/systems/MovementSystem'),
	Noise: require('./src/goo/noise/Noise'),
	ObjectUtil: require('./src/goo/util/ObjectUtil'),
	ObjectUtils: require('./src/goo/util/ObjectUtils'),
	OrbitCamControlScript: require('./src/goo/scripts/OrbitCamControlScript'),
	OscillatorSound: require('./src/goo/sound/OscillatorSound'),
	Particle: require('./src/goo/particles/Particle'),
	ParticleComponent: require('./src/goo/entities/components/ParticleComponent'),
	ParticleEmitter: require('./src/goo/particles/ParticleEmitter'),
	ParticleInfluence: require('./src/goo/particles/ParticleInfluence'),
	ParticleLib: require('./src/goo/particles/ParticleLib'),
	ParticlesSystem: require('./src/goo/entities/systems/ParticlesSystem'),
	ParticleSystemUtils: require('./src/goo/util/ParticleSystemUtils'),
	ParticleUtils: require('./src/goo/particles/ParticleUtils'),
	Pass: require('./src/goo/renderer/pass/Pass'),
	PickingSystem: require('./src/goo/entities/systems/PickingSystem'),
	PipRenderSystem: require('./src/goo/entities/systems/PipRenderSystem'),
	Plane: require('./src/goo/math/Plane'),
	PointLight: require('./src/goo/renderer/light/PointLight'),
	PortalComponent: require('./src/goo/entities/components/PortalComponent'),
	PortalSystem: require('./src/goo/entities/systems/PortalSystem'),
	PrimitivePickLogic: require('./src/goo/picking/PrimitivePickLogic'),
	ProjectHandler: require('./src/goo/loaders/handlers/ProjectHandler'),
	PromiseUtil: require('./src/goo/util/PromiseUtil'),
	PromiseUtils: require('./src/goo/util/PromiseUtils'),
	Quad: require('./src/goo/shapes/Quad'),
	Quaternion: require('./src/goo/math/Quaternion'),
	Ray: require('./src/goo/math/Ray'),
	Rc4Random: require('./src/goo/util/Rc4Random'),
	Rectangle: require('./src/goo/util/combine/Rectangle'),
	Renderer: require('./src/goo/renderer/Renderer'),
	RendererRecord: require('./src/goo/renderer/RendererRecord'),
	RendererUtils: require('./src/goo/renderer/RendererUtils'),
	RenderInfo: require('./src/goo/renderer/RenderInfo'),
	RenderPass: require('./src/goo/renderer/pass/RenderPass'),
	RenderQueue: require('./src/goo/renderer/RenderQueue'),
	RenderStats: require('./src/goo/renderer/RenderStats'),
	RenderSystem: require('./src/goo/entities/systems/RenderSystem'),
	RenderTarget: require('./src/goo/renderer/pass/RenderTarget'),
	rsvp: require('./src/goo/util/rsvp'),
	SceneHandler: require('./src/goo/loaders/handlers/SceneHandler'),
	ScriptComponent: require('./src/goo/entities/components/ScriptComponent'),
	Scripts: require('./src/goo/scripts/Scripts'),
	ScriptSystem: require('./src/goo/entities/systems/ScriptSystem'),
	ScriptUtils: require('./src/goo/scripts/ScriptUtils'),
	Selection: require('./src/goo/entities/Selection'),
	Shader: require('./src/goo/renderer/Shader'),
	ShaderBuilder: require('./src/goo/renderer/shaders/ShaderBuilder'),
	ShaderCall: require('./src/goo/renderer/ShaderCall'),
	ShaderFragment: require('./src/goo/renderer/shaders/ShaderFragment'),
	ShaderHandler: require('./src/goo/loaders/handlers/ShaderHandler'),
	ShaderLib: require('./src/goo/renderer/shaders/ShaderLib'),
	ShadowHandler: require('./src/goo/renderer/shadow/ShadowHandler'),
	ShapeCreatorMemoized: require('./src/goo/util/ShapeCreatorMemoized'),
	SimpleBox: require('./src/goo/shapes/SimpleBox'),
	SimplePartitioner: require('./src/goo/renderer/SimplePartitioner'),
	Skybox: require('./src/goo/util/Skybox'),
	SkyboxHandler: require('./src/goo/loaders/handlers/SkyboxHandler'),
	Snow: require('./src/goo/util/Snow'),
	Sound: require('./src/goo/sound/Sound'),
	SoundComponent: require('./src/goo/entities/components/SoundComponent'),
	SoundComponentHandler: require('./src/goo/loaders/handlers/SoundComponentHandler'),
	SoundCreator: require('./src/goo/util/SoundCreator'),
	SoundHandler: require('./src/goo/loaders/handlers/SoundHandler'),
	SoundSystem: require('./src/goo/entities/systems/SoundSystem'),
	Sphere: require('./src/goo/shapes/Sphere'),
	Spline: require('./src/goo/math/splines/Spline'),
	SplineWalker: require('./src/goo/math/splines/SplineWalker'),
	SpotLight: require('./src/goo/renderer/light/SpotLight'),
	Stats: require('./src/goo/util/Stats'),
	StringUtil: require('./src/goo/util/StringUtil'),
	StringUtils: require('./src/goo/util/StringUtils'),
	System: require('./src/goo/entities/systems/System'),
	SystemBus: require('./src/goo/entities/SystemBus'),
	TangentGenerator: require('./src/goo/util/TangentGenerator'),
	TaskScheduler: require('./src/goo/renderer/TaskScheduler'),
	TextComponent: require('./src/goo/entities/components/TextComponent'),
	TextSystem: require('./src/goo/entities/systems/TextSystem'),
	Texture: require('./src/goo/renderer/Texture'),
	TextureCreator: require('./src/goo/renderer/TextureCreator'),
	TextureGrid: require('./src/goo/shapes/TextureGrid'),
	TextureHandler: require('./src/goo/loaders/handlers/TextureHandler'),
	TgaLoader: require('./src/goo/loaders/tga/TgaLoader'),
	Torus: require('./src/goo/shapes/Torus'),
	Transform: require('./src/goo/math/Transform'),
	TransformComponent: require('./src/goo/entities/components/TransformComponent'),
	TransformComponentHandler: require('./src/goo/loaders/handlers/TransformComponentHandler'),
	TransformSystem: require('./src/goo/entities/systems/TransformSystem'),
	ValueNoise: require('./src/goo/noise/ValueNoise'),
	Vector2: require('./src/goo/math/Vector2'),
	Vector3: require('./src/goo/math/Vector3'),
	Vector4: require('./src/goo/math/Vector4'),
	Vector: require('./src/goo/math/Vector'),
	World: require('./src/goo/entities/World')
};

if (typeof(window) !== 'undefined') {
	window.goo = module.exports;
}