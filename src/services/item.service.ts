import { storageService } from "./async.storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'ItemsDB'

export const itemService = {
  query,
  save,
  remove,
  getById,
  updateItems,
  getEmptyItem,
}
_createItems()


export interface Item {
  title: string,
  _id?: string
}



async function query() {
    return storageService.query(STORAGE_KEY)
    // return httpService.get(PRODUCT_URL)
}

async function getById(itemId: string){
  // return httpService.get(PRODUCT_URL + itemId)
    return storageService.get(STORAGE_KEY, itemId)
}

function remove(itemId: string) {
  return storageService.remove(STORAGE_KEY, itemId)
  // return httpService.delete(PRODUCT_URL + itemId)
}

async function save(item: Item): Promise<Item> {
  try {
    if (item._id) {
      return storageService.put(STORAGE_KEY, item)
      // await httpService.put(PRODUCT_URL, item)
    } else {
      return storageService.post(STORAGE_KEY, item)
      // await httpService.post(PRODUCT_URL, item)
    }
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while saving the item')
  }
}

function updateItems(items: Item[]) {
  return Promise.all(items.map(item => storageService.post(STORAGE_KEY, item)))
  // return httpService.put(PRODUCT_URL + 'items/', items)
}

function getEmptyItem(): Item {
  return {
    _id: '',
    title: '',
  };
}

async function _createItems() {
  let items = utilService.loadFromStorage(STORAGE_KEY);

  if (!items || !items.length) {
      items = [
        _createItem({
          title: 'Hello World',
        })
      ]

      utilService.saveToStorage(STORAGE_KEY, items)
  }
}

function _createItem({title}: { title: string}) {
  return {
    title,
  }
}
