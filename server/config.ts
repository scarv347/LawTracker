/**
 * LawTrack server configuration.
 *
 * Secrets (ASU_AIR_API_KEY) come from the environment only. They are never
 * logged, never returned in responses, and never sent to the frontend.
 */

// Load server/.env if present. A missing file is fine: the no-evidence path
// must still work with no environment configuration at all.
try {
  process.loadEnvFile('server/.env');
} catch {
  // server/.env not found or unreadable — continue with ambient process env.
}

export type ServerConfig = {
  asuAirApiKey: string;
  asuAirModel: string;
  asuAirBaseUrl: string;
};

const DEFAULT_ASU_AIR_BASE_URL = 'https://openai.rc.asu.edu/v1';

export function getConfig(): ServerConfig {
  return {
    asuAirApiKey: process.env.ASU_AIR_API_KEY ?? '',
    asuAirModel: process.env.ASU_AIR_MODEL ?? '',
    asuAirBaseUrl:
      process.env.ASU_AIR_BASE_URL && process.env.ASU_AIR_BASE_URL.length > 0
        ? process.env.ASU_AIR_BASE_URL
        : DEFAULT_ASU_AIR_BASE_URL,
  };
}

/** True only when both the API key and the model are configured. */
export function aiConfigured(): boolean {
  const config = getConfig();
  return config.asuAirApiKey.length > 0 && config.asuAirModel.length > 0;
}
