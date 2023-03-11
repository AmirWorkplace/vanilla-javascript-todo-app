const databaseAPI = "http://localhost:9000/databaseName"
const xhr = new XMLHttpRequest()
const method = "GET"
const allAPI = []

xhr.open(method, databaseAPI, true)

xhr.onload = () => {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText)

    response.map((data) => allAPI.push(data))
  } else {
    console.log(`Error loading database.json. Status code: ${xhr.status}`)
  }
}

xhr.onerror = (error) => {
  console.log(error)
}

xhr.send()

setTimeout(() => console.log(allAPI), 200)

function pushDatabaseAPI() {
  const linkContainer = (link) => {
    const linkBox = document.createElement("div")
    linkBox.classList.add("link_box")

    const element = `
        <div class="link">
          <i class="fa-solid fa-link"></i>
          <a href="http://localhost:9000/${link}" target="_blank" rel="noopener noreferrer">${link}</a>
        </div>
      `

    linkBox.innerHTML = element

    return linkBox
  }

  const container = document.createElement("div")
  container.classList.add("container")
  document.body.appendChild(container)

  allAPI.map((api) => {
    container.appendChild(linkContainer(api))
  })
}

setTimeout(() => pushDatabaseAPI(), 200)
