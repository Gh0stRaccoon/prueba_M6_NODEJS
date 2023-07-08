import path from "path";
import { fileURLToPath } from "url";

export const dirname = (importMetaUrl) => {
  return path.dirname(fileURLToPath(importMetaUrl))
}

export const join = (...args) => path.join(...args)