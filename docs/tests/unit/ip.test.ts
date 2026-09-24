import { describe, expect, it } from 'vitest';

import { isBlockedHostname, isPublicAddress, parseIPv4, parseIPv6 } from '@/lib/server/ip';

describe('parseIPv4', () => {
  it('parses dotted quads only', () => {
    expect(parseIPv4('127.0.0.1')).toBe(0x7f000001);
    expect(parseIPv4('255.255.255.255')).toBe(0xffffffff);
    for (const bad of [
      '0x7f.0.0.1',
      '0177.0.0.1',
      '127.1',
      '2130706433',
      '256.0.0.1',
      '1.2.3.4.5',
      '',
      'a.b.c.d',
    ]) {
      expect(parseIPv4(bad), bad).toBeNull();
    }
  });
});

describe('parseIPv6', () => {
  it('expands compressed forms and embedded IPv4', () => {
    expect(parseIPv6('::1')).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
    expect(parseIPv6('::')).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(parseIPv6('[2001:db8::1]')).toEqual([0x2001, 0xdb8, 0, 0, 0, 0, 0, 1]);
    expect(parseIPv6('::ffff:127.0.0.1')).toEqual([0, 0, 0, 0, 0, 0xffff, 0x7f00, 1]);
    expect(parseIPv6('fe80::1%eth0')).toEqual([0xfe80, 0, 0, 0, 0, 0, 0, 1]);
    expect(parseIPv6('1:2:3:4:5:6:7:8')).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(parseIPv6('1::')).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
    expect(parseIPv6('127.0.0.1')).toBeNull();
    expect(parseIPv6('1:::2')).toBeNull();
    expect(parseIPv6('example.com')).toBeNull();
  });
});

describe('isPublicAddress', () => {
  const blocked = [
    // IPv4
    '0.0.0.0',
    '0.1.2.3',
    '10.0.0.1',
    '10.255.255.255',
    '100.64.0.1',
    '100.100.100.200',
    '100.127.255.255',
    '127.0.0.1',
    '127.255.255.254',
    '169.254.169.254',
    '169.254.0.1',
    '172.16.0.1',
    '172.31.255.255',
    '192.0.0.170',
    '192.0.2.1',
    '192.88.99.1',
    '192.168.1.1',
    '198.18.0.1',
    '198.19.255.255',
    '198.51.100.7',
    '203.0.113.9',
    '224.0.0.1',
    '239.255.255.250',
    '240.0.0.1',
    '255.255.255.255',
    // IPv6
    '::',
    '::1',
    '[::1]',
    '0:0:0:0:0:0:0:1',
    '::127.0.0.1',
    '::ffff:127.0.0.1',
    '::ffff:7f00:1',
    '[::ffff:7f00:1]',
    '::ffff:10.0.0.1',
    '::ffff:169.254.169.254',
    '::ffff:0:127.0.0.1',
    '64:ff9b::127.0.0.1',
    '64:ff9b::a9fe:a9fe',
    '64:ff9b:1::1',
    '100::1',
    '2001::1',
    '2001:0:4136:e378:8000:63bf:3fff:fdd2',
    '2001:db8::1',
    '2002:7f00:1::',
    '2002:a00:1::1',
    '3fff::1',
    'fc00::1',
    'fd00:ec2::254',
    'fe80::1',
    'fe80::1%eth0',
    'febf::1',
    'fec0::1',
    'ff02::1',
    'ff05::2',
    // not IPs at all
    'localhost',
    'example.com',
    '',
    '2130706433',
    '0x7f.1',
  ];
  it.each(blocked)('blocks %s', (address) => {
    expect(isPublicAddress(address)).toBe(false);
  });

  const allowed = [
    '1.1.1.1',
    '8.8.8.8',
    '93.184.216.34',
    '172.15.255.255',
    '172.32.0.1',
    '100.63.255.255',
    '100.128.0.1',
    '169.253.0.1',
    '192.169.0.1',
    '223.255.255.254',
    '2606:4700:4700::1111',
    '2001:4860:4860::8888',
    '[2a00:1450:4001:82a::200e]',
    '::ffff:8.8.8.8',
    '::ffff:808:808',
    '64:ff9b::8.8.8.8',
    '2002:808:808::1',
  ];
  it.each(allowed)('allows %s', (address) => {
    expect(isPublicAddress(address)).toBe(true);
  });
});

describe('isBlockedHostname', () => {
  it.each([
    'localhost',
    'LOCALHOST',
    'localhost.',
    'a.localhost',
    'printer.local',
    'metadata.google.internal',
    'router.home.arpa',
    '1.0.0.127.in-addr.arpa',
  ])('blocks %s', (host) => expect(isBlockedHostname(host)).toBe(true));
  it.each(['example.com', 'petstore.swagger.io', 'localhost.example.com'])('allows %s', (host) =>
    expect(isBlockedHostname(host)).toBe(false)
  );
});
