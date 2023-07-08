import fs from 'fs/promises'
import { dirname, join } from './path.js'

export async function fileToJson(currentPath, relativePath) {
  const fileContent = await fs.readFile(join(dirname(currentPath), relativePath), 'utf-8')
  const jsonFile = JSON.parse(fileContent)
  return jsonFile
}

export async function saveFile(currentPath, relativePath, data) {
  const fileData = JSON.stringify(data)
  await fs.writeFile(join(dirname(currentPath), relativePath), fileData, { encoding: 'utf-8' })
}