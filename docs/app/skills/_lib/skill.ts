import 'server-only';

import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { findRepoFile } from '@/components/repo-files';

export const SKILL_NAME = 'swagger-typescript-api-es';
/** folder of the skill, relative to the repository root */
export const SKILL_DIR = `skills/${SKILL_NAME}`;

export interface SkillFile {
  /** path relative to the skill folder, with `/` separators */
  path: string;
  lines: number;
  bytes: number;
  /** first markdown heading, if any */
  heading: string | null;
}

export interface SkillInfo {
  name: string;
  description: string;
  version: string | null;
  files: SkillFile[];
  /** SKILL.md without its front matter */
  body: string;
}

function parseFrontMatter(text: string): { data: Record<string, string>; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const field = /^\s*([\w-]+):\s*(.*)$/.exec(line);
    if (field && field[2]) data[field[1]] = field[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return { data, body: text.slice(match[0].length) };
}

function walk(dir: string, base = ''): string[] {
  const entries = readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true }).sort((a, b) => {
    // files of a folder first (SKILL.md on top), then sub folders
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const relative = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...walk(path.join(/*turbopackIgnore: true*/ dir, entry.name), relative));
    else if (entry.isFile()) files.push(relative);
  }
  return files;
}

/** Reads the skill folder at build time, so the page always lists its current files. */
export function loadSkill(): SkillInfo | null {
  const skillFile = findRepoFile(`${SKILL_DIR}/SKILL.md`, `name: ${SKILL_NAME}`);
  if (!skillFile) return null;
  const dir = path.dirname(skillFile);
  const { data, body } = parseFrontMatter(readFileSync(/*turbopackIgnore: true*/ skillFile, 'utf8').replace(/\r\n/g, '\n'));

  const files = walk(dir).map((relative): SkillFile => {
    const absolute = path.join(/*turbopackIgnore: true*/ dir, relative);
    const text = readFileSync(/*turbopackIgnore: true*/ absolute, 'utf8');
    const heading = /^#{1,3} (.+)$/m.exec(relative === 'SKILL.md' ? body : text)?.[1]?.trim() ?? null;
    return {
      path: relative,
      lines: text.split('\n').length - (text.endsWith('\n') ? 1 : 0),
      bytes: statSync(/*turbopackIgnore: true*/ absolute).size,
      heading,
    };
  });

  return {
    name: data.name ?? SKILL_NAME,
    description: data.description ?? '',
    version: data.version ?? null,
    files,
    body,
  };
}
