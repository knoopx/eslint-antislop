/**
 * eslint-config-antislop
 *
 * ESLint 10.x preset for preventing AI-generated code slop.
 * All rules are implemented from scratch with zero external dependencies.
 */

import { config as baseConfig } from "./configs/base.js";
import { config as recommendedConfig } from "./configs/recommended.js";
import { config as strictConfig } from "./configs/strict.js";
import { config as typescriptConfig } from "./configs/typescript.js";
import { config as reactConfig } from "./configs/react.js";
import { plugin } from "./lib/plugin.js";

export { baseConfig as base };
export { recommendedConfig as recommended };
export { strictConfig as strict };
export { typescriptConfig as typescript };
export { reactConfig as react };
export { plugin };

// Default export is the recommended config
export default recommendedConfig;
