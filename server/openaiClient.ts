/**
 * Minimal OpenAI-compatible chat completion client for ASU AIR.
 *
 * SECURITY:
 * - The API key is read from config and sent only in the Authorization header.
 * - The key, the Authorization header, and full provider request/response
 *   bodies are NEVER logged.
 * - All failures surface as a single fixed error message so provider error
 *   bodies (which could echo secrets) never leak into logs or responses.
 */

import { getConfig } from './config.ts';

export type ChatMessage = {
  role: 'system' | 'user';
  content: string;
};

const REQUEST_TIMEOUT_MS = 45_000;

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
};

export async function chatCompletion(messages: ChatMessage[]): Promise<string> {
  const config = getConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${config.asuAirBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.asuAirApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.asuAirModel,
        messages,
        temperature: 0,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('AI provider request failed');
    }

    const data = (await response.json()) as ChatCompletionResponse;
    const content = data.choices?.[0]?.message?.content;

    if (typeof content !== 'string' || content.length === 0) {
      throw new Error('AI provider request failed');
    }

    return content;
  } catch {
    // Deliberately discard the original error: it may contain provider
    // response bodies or headers. Never log or rethrow it.
    throw new Error('AI provider request failed');
  } finally {
    clearTimeout(timeout);
  }
}
