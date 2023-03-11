const dataList = [
  { id: 1, name: "Liam Olivia", age: 15 },
  { id: 2, name: "Noah Emma", age: 20 },
  { id: 3, name: "Oliver Charlotte", age: 25 },
  { id: 4, name: "Elijah Amelia", age: 30 },
  { id: 5, name: "James	Ava", age: 35 },
  { id: 6, name: "William	Sophia", age: 40 },
  { id: 7, name: "Benjamin Isabella", age: 45 },
  { id: 8, name: "Lucas	Mia", age: 50 },
  { id: 9, name: "Henry	Evelyn", age: 55 },
  { id: 10, name: "Theodore	Harper", age: 9 },

  {
    id: 11,
    name: "SYED AMIR ALI",
    age: 19,
    tags: ["Student", "Coder", "Learner", "Religious"],
  },
]

const generateId = (allData) => {
  const maxId = allData.reduce((maxid, data) => Math.max(maxid, data.id), -1)
  return allData?.length > 0 ? maxId + 1 : 1
}

function updatedData(arrayOfData = [], id, newData) {
  const findData = arrayOfData.find((item) => item.id === id)
  if (findData) {
    const filterData = arrayOfData.filter((data) => data.id !== id)
    const updatedData = {
      ...findData,
      features: newData,
      name: findData.name + " Edited",
    }
    const getUpdatedData = [...filterData, updatedData]
    return getUpdatedData.sort((a, b) => a.id - b.id)
  } else {
    return [
      ...arrayOfData,
      {
        id: generateId(arrayOfData),
        name: "NEW NAME",
        age: 40,
        features: "New Added",
      },
    ]
  }
}

/*
 * console.log(updatedData(dataList, 05, "UPDATED0"))
 * console.log(updatedData(dataList, 15, "UPDATED1"))
 * console.log(updatedData(dataList, 03, "UPDATED2"))
 */

function findIncludeElement(id) {
  const findData = dataList.findLast((data) => data.id === id)
  if (findData) {
    return dataList.includes(findData)
  } else return false
}

function updateDataByIncludes(arrayOfData = [], id, newData) {
  if (findIncludeElement(id)) {
    return arrayOfData.map((data) => {
      if (data.id === id) {
        return { ...data, name: data.name + " Edited", features: newData }
      } else {
        return data
      }
    })
  } else {
    return [
      ...arrayOfData,
      {
        id: generateId(arrayOfData),
        name: "NEW NAME",
        age: 40,
        features: "New Added",
      },
    ]
  }
}
/*
 * console.log(updateDataByIncludes(dataList, 5, "UPDATED"))
 * console.log(updateDataByIncludes(dataList, 15, "UPDATED"))
 */

function dataIndexOf(arrayOfData = [], id) {
  const findData = arrayOfData.findLast((data) => data.id === id)
  return arrayOfData.indexOf(findData)
}

// * console.log(dataIndexOf(dataList, 5))

function sliceOperation(arrayOfData = [], id) {
  const findData = arrayOfData.find((data) => data.id === id)
  const findDataId = arrayOfData.indexOf(findData)
  return arrayOfData.splice(findDataId - 1, findDataId)
}

// * console.log(sliceOperation(dataList, 5))

let newList = [
  "apon",
  "sabbir",
  "hridoy",
  "momin",
  "hasan",
  "arif",
  "shouvo",
  "abir",
  "sabbir",
  "amir",
]

/* 

 # Start Todos 
 
 */

const yourName = document.querySelector(".name")
const submitBtn = document.querySelector(".submit-btn")
const submitForm = document.querySelector(".submit-form")

const initialState = ["syed amir ali"]

function renderLists(todos = []) {
  const renderElement = `
      <div class="renderElement">
        ${todos
          .map((todoText, index) => {
            return `
              <div class='element email' id="id_${index + 1}">
                <div class="el_content">
                  <strong>${index + 1} | </strong>
                  <p>${todoText}</p>
                </div>
                <div class="btn-container">
                  <button class="btn-add"
                    onclick="todoEdit(${index})"
                  >EDIT</button>
                  <button class="btn-remove"
                    onclick="todoRemove(${index})"
                  >REMOVE</button>
                </div>
              </div>
              `
          })
          .join("")}
      </div>
  `
  const rnederTodos = document.getElementById("rnederTodos")

  rnederTodos.innerHTML = renderElement
}

renderLists((state = initialState))

function todoEdit(index) {
  let getName = state[index]
  yourName.value = getName
  submitBtn.setAttribute("index", index)
  submitBtn.textContent = "update"
}

function todoRemove(index) {
  state.splice(index, 1)
  renderLists(state)
}

submitForm.addEventListener("submit", function (event) {
  event.preventDefault()
  if (submitBtn.textContent === "update") {
    const updateTodoIndex = parseInt(submitBtn.getAttribute("index"))
    state[updateTodoIndex] = yourName.value
    renderLists(state)
    submitBtn.textContent = "subscribe"
    yourName.value = ""
    console.log(updateTodoIndex)
  } else if (yourName.value !== "") {
    state.push(yourName.value)
    renderLists(state)
  }
})
