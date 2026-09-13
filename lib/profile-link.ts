/**
 * Turns whatever a creator pastes into the API's profile key: "@handle" or a numeric id.
 * Accepts web.phriend.app/@name, phriend.app/@name, /u/name, /phriends/123, /post/123, "@name", "name" or "123".
 * Returns null for anything else, including links to other sites.
 */
export function profileKey(input: string): string | null {
  const s = input.trim();
  if (!s || s.length > 300) return null;

  const host = s.match(/^(?:https?:\/\/)?([^/\s@]+\.[^/\s]+?)(?:[/?#]|$)/i)?.[1]?.toLowerCase();
  if (host && host !== "phriend.app" && !host.endsWith(".phriend.app")) return null;

  const handle = s.match(/(?:^|\/)(?:@|u\/)([a-z][a-z0-9]{2,29})(?:[/?#]|$)/i)?.[1] ?? (host ? null : s.match(/^([a-z][a-z0-9]{2,29})$/i)?.[1]);
  if (handle) return `@${handle.toLowerCase()}`;

  const id = s.match(/(?:^|\/)(?:phriends|post)\/(\d{1,12})(?:[/?#]|$)/)?.[1] ?? (host ? null : s.match(/^(\d{1,12})$/)?.[1]);
  return id && Number(id) > 0 ? id : null;
}
