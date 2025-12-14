import path from "path";
import { fileURLToPath } from "url";

export function getDirname(importMeta) {
  return path.dirname(fileURLToPath(importMeta.url));
}

export function resolveFrom(fromDir, ...segments) {
  return path.resolve(fromDir, ...segments);
}

export default {
  getDirname,
  resolveFrom,
};
