let db
const request = indexedDB.open('budgetTracker', 1)

request.onupgradeneeded = ({ target }) => {
  db = target.result
  db.createObjectStore('pending', { autoIncrement: true })
}

request.onsuccess = ({ target }) => {
  db = target.result

  if (navigator.onLine) {
    checkDatabase()
  }
}

request.onerror = event => {
  console.log(event.target.errorCode)
}

const saveRecord = record => {
  const transaction = db.transaction(['pending'], 'readwrite')
  const store = transaction.objectStore('pending')
  store.add(record)
}

const checkDatabase = () => {
  const transaction = db.transaction(['pending'], 'readwrite')
  const store = transaction.objectStore('pending')
  const getAll = store.getAll()
}

window.addEventListener('online', checkDatabase)
