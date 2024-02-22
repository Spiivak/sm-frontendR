
export interface Entity {
  id: string
}

export interface StorageService {
  query<T extends Entity>(entityType: string, delay?: number): Promise<T[]>;
  get<T extends Entity>(entityType: string, entityId: string): Promise<T>;
  post<T extends Entity>(entityType: string, newEntity: T): Promise<T>;
  put<T extends Entity>(entityType: string, updatedEntity: T): Promise<T>;
  remove(entityType: string, entityId: string): Promise<void>;
}


export const storageService: StorageService = {
  query,
  get,
  post,
  put,
  remove,
}

async function query<T extends Entity>(entityType: string, delay: number = 500): Promise<T[]> {
  const entities: T[] = JSON.parse(localStorage.getItem(entityType) || '[]');
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

async function get<T extends Entity>(entityType: string, entityId: string): Promise<T> {
  return query<T>(entityType).then((entities) => {
    const entity = entities.find((entity) => entity.id === entityId);
    if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`);
    return entity;
  });
}

async function post<T extends Entity>(entityType: string, newEntity: T): Promise<T> {
  newEntity.id = _makeId();
  return query<T>(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

async function put<T extends Entity>(entityType: string, updatedEntity: T): Promise<T> {
  return query<T>(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id);
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`);
    entities[idx] = updatedEntity;
    _save(entityType, entities);
    return updatedEntity;
  });
}

async function remove(entityType: string, entityId: string): Promise<void> {
  return query<Entity>(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId);
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

// Private functions

function _save<T extends Entity>(entityType: string, entities: T[]): void {
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
