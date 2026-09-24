/**
 * IP address classification used by the SSRF protection of `POST /api/generate`.
 *
 * `isPublicAddress` returns `true` only for globally routable unicast addresses.
 * Anything that cannot be parsed is treated as NOT public.
 */

import { isIP } from 'node:net';

type Range = readonly [base: number, prefix: number];

/** blocked IPv4 ranges (RFC 6890 special purpose + multicast/reserved) */
const BLOCKED_V4: readonly Range[] = [
  [ipv4ToInt(0, 0, 0, 0), 8], // "this" network, unspecified
  [ipv4ToInt(10, 0, 0, 0), 8], // private
  [ipv4ToInt(100, 64, 0, 0), 10], // CGNAT (also Alibaba metadata 100.100.100.200)
  [ipv4ToInt(127, 0, 0, 0), 8], // loopback
  [ipv4ToInt(169, 254, 0, 0), 16], // link-local (cloud metadata 169.254.169.254)
  [ipv4ToInt(172, 16, 0, 0), 12], // private
  [ipv4ToInt(192, 0, 0, 0), 24], // IETF protocol assignments
  [ipv4ToInt(192, 0, 2, 0), 24], // TEST-NET-1
  [ipv4ToInt(192, 31, 196, 0), 24], // AS112
  [ipv4ToInt(192, 52, 193, 0), 24], // AMT
  [ipv4ToInt(192, 88, 99, 0), 24], // 6to4 relay anycast
  [ipv4ToInt(192, 168, 0, 0), 16], // private
  [ipv4ToInt(192, 175, 48, 0), 24], // AS112
  [ipv4ToInt(198, 18, 0, 0), 15], // benchmarking
  [ipv4ToInt(198, 51, 100, 0), 24], // TEST-NET-2
  [ipv4ToInt(203, 0, 113, 0), 24], // TEST-NET-3
  [ipv4ToInt(224, 0, 0, 0), 4], // multicast
  [ipv4ToInt(240, 0, 0, 0), 4], // reserved + broadcast
];

function ipv4ToInt(a: number, b: number, c: number, d: number): number {
  return ((a << 24) | (b << 16) | (c << 8) | d) >>> 0;
}

function inV4Range(value: number, [base, prefix]: Range): boolean {
  if (prefix === 0) return true;
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  return (value & mask) >>> 0 === (base & mask) >>> 0;
}

/** strict dotted-quad parser (`1.2.3.4`, no octal/hex/short forms) */
export function parseIPv4(input: string): number | null {
  const parts = input.split('.');
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^(0|[1-9]\d{0,2})$/.test(part)) return null;
    const n = Number(part);
    if (n > 255) return null;
    value = value * 256 + n;
  }
  return value >>> 0;
}

/** parses an IPv6 address (optionally in brackets / with a zone id) into 8 16-bit groups */
export function parseIPv6(input: string): number[] | null {
  let text = input;
  if (text.startsWith('[') && text.endsWith(']')) text = text.slice(1, -1);
  const zone = text.indexOf('%');
  if (zone !== -1) text = text.slice(0, zone);
  if (isIP(text) !== 6) return null;

  // embedded IPv4 tail (`::ffff:127.0.0.1`) -> two hex groups
  const lastColon = text.lastIndexOf(':');
  const last = text.slice(lastColon + 1);
  if (last.includes('.')) {
    const v4 = parseIPv4(last);
    if (v4 === null) return null;
    text = `${text.slice(0, lastColon + 1)}${(v4 >>> 16).toString(16)}:${(v4 & 0xffff).toString(16)}`;
  }

  const [head, rest] = text.includes('::') ? text.split('::') : [text, undefined];
  const toGroups = (s: string | undefined) =>
    s ? s.split(':').map((g) => (/^[0-9a-f]{1,4}$/i.test(g) ? Number.parseInt(g, 16) : NaN)) : [];
  const headGroups = toGroups(head);
  let groups: number[];
  if (rest === undefined) {
    groups = headGroups;
  } else {
    const restGroups = toGroups(rest);
    const fill = 8 - headGroups.length - restGroups.length;
    if (fill < 1) return null;
    groups = [...headGroups, ...Array.from({ length: fill }, () => 0), ...restGroups];
  }
  if (groups.length !== 8 || groups.some((g) => Number.isNaN(g))) return null;
  return groups;
}

function isPublicV4(value: number): boolean {
  return !BLOCKED_V4.some((range) => inV4Range(value, range));
}

function prefixMatches(groups: number[], prefix: number[], bits: number): boolean {
  let remaining = bits;
  for (let i = 0; remaining > 0; i++) {
    const take = Math.min(16, remaining);
    const mask = (0xffff << (16 - take)) & 0xffff;
    if ((groups[i] & mask) !== ((prefix[i] ?? 0) & mask)) return false;
    remaining -= take;
  }
  return true;
}

function isPublicV6(g: number[]): boolean {
  const embeddedV4 = (hi: number, lo: number) => ((g[hi] << 16) | g[lo]) >>> 0;

  // ::/96 - unspecified, loopback, deprecated IPv4-compatible addresses
  if (prefixMatches(g, [0, 0, 0, 0, 0, 0], 96)) return false;
  // ::ffff:0:0/96 - IPv4-mapped
  if (prefixMatches(g, [0, 0, 0, 0, 0, 0xffff], 96)) return isPublicV4(embeddedV4(6, 7));
  // ::ffff:0:0:0/96 - IPv4-translated (SIIT)
  if (prefixMatches(g, [0, 0, 0, 0, 0xffff, 0], 96)) return false;
  // 64:ff9b::/96 - NAT64 well-known prefix, follows the embedded IPv4
  if (prefixMatches(g, [0x64, 0xff9b, 0, 0, 0, 0], 96)) return isPublicV4(embeddedV4(6, 7));
  // 64:ff9b:1::/48 - local-use NAT64
  if (prefixMatches(g, [0x64, 0xff9b, 1], 48)) return false;
  // 100::/64 - discard-only
  if (prefixMatches(g, [0x100], 64)) return false;
  // 2001::/23 - IETF protocol assignments (incl. Teredo 2001::/32)
  if (prefixMatches(g, [0x2001, 0], 23)) return false;
  // 2001:db8::/32 - documentation
  if (prefixMatches(g, [0x2001, 0xdb8], 32)) return false;
  // 2002::/16 - 6to4, follows the embedded IPv4
  if (prefixMatches(g, [0x2002], 16)) return isPublicV4(embeddedV4(1, 2));
  // 3fff::/20 - documentation
  if (prefixMatches(g, [0x3fff], 20)) return false;
  // 5f00::/16 - SRv6 SIDs
  if (prefixMatches(g, [0x5f00], 16)) return false;
  // fc00::/7 - unique local (incl. AWS metadata fd00:ec2::254)
  if (prefixMatches(g, [0xfc00], 7)) return false;
  // fe80::/10 - link-local, fec0::/10 - deprecated site-local
  if (prefixMatches(g, [0xfe80], 10) || prefixMatches(g, [0xfec0], 10)) return false;
  // ff00::/8 - multicast
  if (prefixMatches(g, [0xff00], 8)) return false;
  // only 2000::/3 is global unicast
  return prefixMatches(g, [0x2000], 3);
}

/** `true` when the IP literal is a globally routable unicast address */
export function isPublicAddress(address: string): boolean {
  const v4 = parseIPv4(address);
  if (v4 !== null) return isPublicV4(v4);
  const v6 = parseIPv6(address);
  if (v6 !== null) return isPublicV6(v6);
  return false;
}

/** host names that must never be fetched, whatever they resolve to */
export function isBlockedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.+$/, '');
  return (
    host === '' ||
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host.endsWith('.home.arpa') ||
    host === 'metadata' ||
    host.endsWith('.in-addr.arpa') ||
    host.endsWith('.ip6.arpa')
  );
}
