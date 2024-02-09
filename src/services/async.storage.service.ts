import { Item } from "./item.service"

export interface Entity {
  _id: string
}

export interface StorageService {
  query(entityType: string, delay?: number): Promise<Item[]>
  get(entityType: string, entityId: string): Promise<Item>
  post(entityType: string, newEntity: Item): Promise<Item>
  put(entityType: string, updatedEntity: Item): Promise<Item>
  remove(entityType: string, entityId: string): Promise<void>
}

export const storageService: StorageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType: string, delay: number = 500): Promise<Item[]> {
  const entities: Item[] = JSON.parse(localStorage.getItem(entityType) || '[]')
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

function get(entityType: string, entityId: string): Promise<Item> {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity._id === entityId)
    if (!entity) {
      throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    }
    return entity
  })
}

function post(entityType: string, newEntity: Item): Promise<Item> {
  newEntity = {...newEntity}
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function put(entityType: string, updatedEntity: Item): Promise<Item> {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0) {
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    }
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType: string, entityId: string): Promise<void> {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0) {
      throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    }
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

// Private functions

function _save(entityType: string, entities: Item[]): void {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5): string {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
