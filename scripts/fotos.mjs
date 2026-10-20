#!/usr/bin/env node
// Turns the official university photos listed in content/fotos/fotos.json
// into the site's black-and-white, responsive WebP set:
//
//   fotos-originales/<archivo>  ->  public/assets/fotos/<id>-<width>.webp
//                                   content/fotos/fotos.generated.json
//
// Originals stay out of git (see .gitignore) — they can weigh 5-15 MB each.
// Only the processed WebPs and the generated manifest are committed, so a
// fresh checkout without the originals keeps every photo already processed
// instead of dropping it from the site. Run with `npm run fotos`.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "content/fotos/fotos.json");
const GENERATED = path.join(ROOT, "content/fotos/fotos.generated.json");
const SRC_DIR = path.join(ROOT, "fotos-originales");
const OUT_DIR = path.join(ROOT, "public/assets/fotos");
const WIDTHS = [640, 1024, 1600, 2400];
const AREAS = ["administracion", "derecho", "ingenieria", "salud", "educacion"];
const UNIVERSITIES = ["uax", "nebrija", "ceu-san-pablo"];
const SLOTS = ["home-hero", "home-cierre", "nosotros"];

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return fallback;
    throw err;
  }
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function validate(entry, index) {
  const where = `fotos.json[${index}]${entry.id ? ` (${entry.id})` : ""}`;
  const problems = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(entry.id ?? "")) problems.push("id debe ser kebab-case: a-z, 0-9 y guiones");
  if (!entry.archivo) problems.push("falta archivo");
  if (!entry.alt || entry.alt.length < 12) problems.push("alt debe describir la foto (mín. 12 caracteres)");
  if (!entry.credito) problems.push("falta credito (p. ej. \"Foto: Universidad Nebrija\")");
  if (entry.universidad && !UNIVERSITIES.includes(entry.universidad))
    problems.push(`universidad debe ser una de: ${UNIVERSITIES.join(", ")}`);
  for (const a of entry.areas ?? []) if (!AREAS.includes(a)) problems.push(`área desconocida: ${a}`);
  for (const s of entry.usos ?? []) if (!SLOTS.includes(s)) problems.push(`uso desconocido: ${s}`);
  if (entry.foco && !(Array.isArray(entry.foco) && entry.foco.length === 2 && entry.foco.every((n) => n >= 0 && n <= 100)))
    problems.push("foco debe ser [x, y] en porcentaje (0-100)");
  if (problems.length) throw new Error(`${where}: ${problems.join("; ")}`);
}

// Spanish manifest keys (it's content, edited alongside content/) -> the
// English shape lib/photos.ts reads.
function meta(entry) {
  return {
    id: entry.id,
    alt: entry.alt,
    credit: entry.credito,
    university: entry.universidad ?? null,
    areas: entry.areas ?? [],
    subject: entry.tema ?? null,
    focal: entry.foco ?? [50, 50],
    slots: entry.usos ?? [],
  };
}

async function processPhoto(entry, src) {
  // .rotate() with no argument (below) applies the EXIF orientation, so
  // portrait phone shots don't come out sideways — orientations 5-8 swap
  // the stored width and height.
  const info = await sharp(src, { failOn: "none" }).metadata();
  const swapped = (info.orientation ?? 1) >= 5;
  const width = swapped ? info.height : info.width;
  const height = swapped ? info.width : info.height;
  const maxWidth = Math.min(width, WIDTHS[WIDTHS.length - 1]);
  const widths = [...new Set([...WIDTHS.filter((w) => w < maxWidth), maxWidth])];

  for (const w of widths) {
    await sharp(src, { failOn: "none" })
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .grayscale()
      // Gentle contrast lift around mid-grey: a flat colour photo turned
      // grey otherwise reads washed out next to the site's ink/red palette.
      .linear(1.12, -128 * 0.12)
      .sharpen({ sigma: 0.6 })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(OUT_DIR, `${entry.id}-${w}.webp`));
  }

  // 24px-wide preview, inlined as the background while the real image
  // loads (no layout shift — the box already has the photo's aspect ratio).
  const blurBuf = await sharp(src, { failOn: "none" })
    .rotate()
    .resize({ width: 24 })
    .grayscale()
    .webp({ quality: 40 })
    .toBuffer();

  return {
    ...meta(entry),
    width: maxWidth,
    height: Math.round((maxWidth * height) / width),
    widths,
    blur: `data:image/webp;base64,${blurBuf.toString("base64")}`,
  };
}

const entries = await readJson(MANIFEST, []);
const previous = new Map((await readJson(GENERATED, [])).map((e) => [e.id, e]));
const seen = new Set();
const generated = [];
await fs.mkdir(OUT_DIR, { recursive: true });

for (const [i, entry] of entries.entries()) {
  validate(entry, i);
  if (seen.has(entry.id)) throw new Error(`id repetido en fotos.json: ${entry.id}`);
  seen.add(entry.id);

  const src = path.join(SRC_DIR, entry.archivo);
  if (await exists(src)) {
    generated.push(await processPhoto(entry, src));
    console.log(`✓ ${entry.id}`);
  } else if (previous.has(entry.id)) {
    // Original not in this checkout: keep the already-processed files, but
    // pick up any metadata edits (alt, áreas, foco...) from the manifest.
    generated.push({ ...previous.get(entry.id), ...meta(entry) });
    console.log(`= ${entry.id} (sin original: se mantiene la versión ya procesada)`);
  } else {
    console.warn(`! ${entry.id}: no existe ${path.relative(ROOT, src)} — se omite`);
  }
}

// Drop WebPs of photos removed from the manifest so they don't linger in
// the deploy.
for (const file of await fs.readdir(OUT_DIR)) {
  const id = file.replace(/-\d+\.webp$/, "");
  if (file.endsWith(".webp") && !seen.has(id)) {
    await fs.unlink(path.join(OUT_DIR, file));
    console.log(`− ${file} (ya no está en fotos.json)`);
  }
}

await fs.writeFile(GENERATED, JSON.stringify(generated, null, 2) + "\n");
console.log(`\n${generated.length} foto(s) en content/fotos/fotos.generated.json`);
