
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const COLORTERM: string;
	export const npm_package_devDependencies__iconify_json_ri: string;
	export const HYPRLAND_CMD: string;
	export const npm_package_main: string;
	export const COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
	export const npm_package_repository_url: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const XDG_BACKEND: string;
	export const NODE: string;
	export const npm_package_devDependencies_tslib: string;
	export const LC_ADDRESS: string;
	export const npm_package_scripts_check_watch: string;
	export const LC_NAME: string;
	export const DOTNET_CLI_TELEMETRY_OPTOUT: string;
	export const npm_package_devDependencies_publint: string;
	export const npm_package_devDependencies_shiki: string;
	export const CREDENTIALS_DIRECTORY: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const GH_TOKEN: string;
	export const LC_MONETARY: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const NO_AT_BRIDGE: string;
	export const XCURSOR_SIZE: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const npm_package_devDependencies_vite: string;
	export const LOGNAME: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_package_exports___svelte: string;
	export const PNPM_HOME: string;
	export const SYSTEMD_EXEC_PID: string;
	export const npm_package_scripts_build: string;
	export const npm_package_author: string;
	export const npm_package_scripts_prepublishOnly: string;
	export const npm_package_devDependencies_prettier: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_package_packageManager: string;
	export const npm_package_bugs_url: string;
	export const MOTD_SHOWN: string;
	export const VSCODE_INJECTION: string;
	export const npm_package_scripts_package: string;
	export const HOME: string;
	export const COREPACK_ROOT: string;
	export const LANG: string;
	export const LC_PAPER: string;
	export const npm_package_devDependencies_typescript: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const npm_package_files_0: string;
	export const npm_package_files_1: string;
	export const npm_package_files_2: string;
	export const npm_package_repository_type: string;
	export const GIT_ASKPASS: string;
	export const INVOCATION_ID: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_unplugin_icons: string;
	export const INIT_CWD: string;
	export const CHROME_DESKTOP: string;
	export const STARSHIP_SESSION_KEY: string;
	export const npm_package_scripts_format: string;
	export const npm_package_scripts_preview: string;
	export const npm_lifecycle_script: string;
	export const npm_package_description: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_package_svelte: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const npm_package_type: string;
	export const USER: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_package_devDependencies_typescript_eslint: string;
	export const npm_package_exports___types: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const npm_package_homepage: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const VISUAL: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const CHROME_EXECUTABLE: string;
	export const npm_package_devDependencies_eslint: string;
	export const LC_TELEPHONE: string;
	export const LC_MESSAGES: string;
	export const LC_MEASUREMENT: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const npm_package_devDependencies_clsx: string;
	export const npm_config_user_agent: string;
	export const npm_package_scripts_lint: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_execpath: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_scripts_test: string;
	export const LC_CTYPE: string;
	export const XDG_RUNTIME_DIR: string;
	export const NODE_PATH: string;
	export const npm_package_module: string;
	export const npm_package_devDependencies__sveltejs_package: string;
	export const LC_TIME: string;
	export const npm_package_keywords_5: string;
	export const npm_package_keywords_4: string;
	export const npm_package_keywords_7: string;
	export const npm_package_keywords_6: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_keywords_1: string;
	export const npm_package_keywords_0: string;
	export const npm_package_keywords_3: string;
	export const npm_package_keywords_2: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const LC_COLLATE: string;
	export const XDG_DATA_DIRS: string;
	export const npm_package_scripts_check: string;
	export const GDK_BACKEND: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const npm_package_devDependencies_globals: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_package_license: string;
	export const MAIL: string;
	export const npm_config_registry: string;
	export const npm_package_devDependencies__svelteness_kit_docs: string;
	export const _JAVA_OPTIONS: string;
	export const npm_node_execpath: string;
	export const LC_NUMERIC: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		COLORTERM: string;
		npm_package_devDependencies__iconify_json_ri: string;
		HYPRLAND_CMD: string;
		npm_package_main: string;
		COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
		npm_package_repository_url: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		XDG_BACKEND: string;
		NODE: string;
		npm_package_devDependencies_tslib: string;
		LC_ADDRESS: string;
		npm_package_scripts_check_watch: string;
		LC_NAME: string;
		DOTNET_CLI_TELEMETRY_OPTOUT: string;
		npm_package_devDependencies_publint: string;
		npm_package_devDependencies_shiki: string;
		CREDENTIALS_DIRECTORY: string;
		MEMORY_PRESSURE_WRITE: string;
		GH_TOKEN: string;
		LC_MONETARY: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		NO_AT_BRIDGE: string;
		XCURSOR_SIZE: string;
		EDITOR: string;
		XDG_SEAT: string;
		PWD: string;
		npm_package_devDependencies_vite: string;
		LOGNAME: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		npm_package_exports___svelte: string;
		PNPM_HOME: string;
		SYSTEMD_EXEC_PID: string;
		npm_package_scripts_build: string;
		npm_package_author: string;
		npm_package_scripts_prepublishOnly: string;
		npm_package_devDependencies_prettier: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_package_packageManager: string;
		npm_package_bugs_url: string;
		MOTD_SHOWN: string;
		VSCODE_INJECTION: string;
		npm_package_scripts_package: string;
		HOME: string;
		COREPACK_ROOT: string;
		LANG: string;
		LC_PAPER: string;
		npm_package_devDependencies_typescript: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		MEMORY_PRESSURE_WATCH: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		npm_package_files_0: string;
		npm_package_files_1: string;
		npm_package_files_2: string;
		npm_package_repository_type: string;
		GIT_ASKPASS: string;
		INVOCATION_ID: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_unplugin_icons: string;
		INIT_CWD: string;
		CHROME_DESKTOP: string;
		STARSHIP_SESSION_KEY: string;
		npm_package_scripts_format: string;
		npm_package_scripts_preview: string;
		npm_lifecycle_script: string;
		npm_package_description: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies_svelte_check: string;
		XDG_SESSION_CLASS: string;
		npm_package_svelte: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		npm_package_type: string;
		USER: string;
		npm_config_frozen_lockfile: string;
		npm_package_devDependencies_typescript_eslint: string;
		npm_package_exports___types: string;
		VSCODE_GIT_IPC_HANDLE: string;
		npm_package_homepage: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		VISUAL: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		MOZ_ENABLE_WAYLAND: string;
		CHROME_EXECUTABLE: string;
		npm_package_devDependencies_eslint: string;
		LC_TELEPHONE: string;
		LC_MESSAGES: string;
		LC_MEASUREMENT: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		npm_package_devDependencies_clsx: string;
		npm_config_user_agent: string;
		npm_package_scripts_lint: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_execpath: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_svelte: string;
		npm_package_scripts_test: string;
		LC_CTYPE: string;
		XDG_RUNTIME_DIR: string;
		NODE_PATH: string;
		npm_package_module: string;
		npm_package_devDependencies__sveltejs_package: string;
		LC_TIME: string;
		npm_package_keywords_5: string;
		npm_package_keywords_4: string;
		npm_package_keywords_7: string;
		npm_package_keywords_6: string;
		npm_package_scripts_dev: string;
		npm_package_keywords_1: string;
		npm_package_keywords_0: string;
		npm_package_keywords_3: string;
		npm_package_keywords_2: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		LC_COLLATE: string;
		XDG_DATA_DIRS: string;
		npm_package_scripts_check: string;
		GDK_BACKEND: string;
		PATH: string;
		npm_config_node_gyp: string;
		npm_package_devDependencies__sveltejs_kit: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		npm_package_devDependencies_globals: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_package_license: string;
		MAIL: string;
		npm_config_registry: string;
		npm_package_devDependencies__svelteness_kit_docs: string;
		_JAVA_OPTIONS: string;
		npm_node_execpath: string;
		LC_NUMERIC: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
